import type { APIRoute } from 'astro';
import { bookingDepartments } from '../../data/booking-departments';
import {
  buildBookingWhatsAppMessage,
  buildWhatsAppUrl,
  clinicContact,
  clinicLineFromDepartment,
} from '../../data/contact';
import {
  assertCustomerRequestAllowed,
  enforceCustomerRateLimit,
  parseCustomerLeadBody,
  parseCustomerLeadFromUrlEncoded,
  readCustomerRequestBody,
  type CustomerRateLimiter,
  type ParsedCustomerLead,
} from '../../lib/customer-api';
import type { CustomerLead } from '../../lib/customer-leads';
import {
  appendBookingAndCustomer,
  GoogleSheetsConfigurationError,
  isGoogleSheetsConfigured,
} from '../../lib/google-sheets';

export const prerender = false;

type CustomerEnv = {
  CUSTOMER_RATE_LIMITER?: CustomerRateLimiter;
};

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

function wantsJson(request: Request, contentType: string): boolean {
  const accept = request.headers.get('Accept') ?? '';
  return contentType.includes('application/json') || accept.includes('application/json');
}

function formConfirmationHtml(options: {
  locale: 'ar' | 'en';
  whatsappUrl: string;
  saved: boolean;
}): string {
  const isEn = options.locale === 'en';
  const title = isEn ? 'Booking request received' : 'تم استلام طلب الحجز';
  const body = options.saved
    ? isEn
      ? 'Your details were saved. Continue on WhatsApp to send the request.'
      : 'تم حفظ بياناتك. تابع عبر واتساب لإرسال الطلب.'
    : isEn
      ? 'We could not save the online record right now. Please continue on WhatsApp so the clinic still receives your request.'
      : 'تعذر حفظ السجل الإلكتروني حالياً. يرجى المتابعة عبر واتساب حتى يصل طلبك للعيادة.';
  const cta = isEn ? 'Open WhatsApp' : 'فتح واتساب';
  return `<!doctype html><html lang="${isEn ? 'en' : 'ar'}" dir="${isEn ? 'ltr' : 'rtl'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body><main><h1>${title}</h1><p>${body}</p><p><a href="${options.whatsappUrl}" rel="noopener noreferrer" target="_blank">${cta}</a></p></main></body></html>`;
}

function resolvePage(request: Request, requestUrl: URL): string {
  const referer = request.headers.get('Referer');
  if (!referer) return '';
  try {
    const refererUrl = new URL(referer);
    if (refererUrl.origin === requestUrl.origin) return refererUrl.pathname;
  } catch {
    return '';
  }
  return '';
}

async function getCustomerRateLimiter(): Promise<CustomerRateLimiter | null> {
  try {
    const mod = await import('cloudflare:workers');
    const env = (mod as { env?: CustomerEnv }).env;
    return env?.CUSTOMER_RATE_LIMITER ?? null;
  } catch {
    return null;
  }
}

async function persistLead(lead: ParsedCustomerLead): Promise<'saved' | 'failed' | 'unconfigured'> {
  if (!isGoogleSheetsConfigured()) {
    console.error('Google Sheets is not configured; refusing to discard customer lead data.');
    return 'unconfigured';
  }
  const registeredAt = new Date().toISOString();
  try {
    await appendBookingAndCustomer(
      [registeredAt, lead.name, lead.phone, lead.department, lead.service, lead.page, lead.locale],
      [registeredAt, lead.name, lead.phone],
    );
    return 'saved';
  } catch (error) {
    console.error('Unable to append booking and customer to Google Sheets.', error);
    if (error instanceof GoogleSheetsConfigurationError) return 'unconfigured';
    return 'failed';
  }
}

export const POST = (async ({ request }) => {
  const requestUrl = new URL(request.url);
  if (!assertCustomerRequestAllowed(request, requestUrl)) return json({ ok: false }, 403);

  const rateKey =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';
  const limiter = await getCustomerRateLimiter();
  const rate = await enforceCustomerRateLimit(limiter, `customers:${rateKey}`, {
    failClosed: import.meta.env.PROD,
  });
  if (rate === 'limited') return json({ ok: false }, 429);
  if (rate === 'unavailable') return json({ ok: false }, 503);

  const contentType = request.headers.get('Content-Type') ?? '';
  const isJson = contentType.includes('application/json');
  const isForm =
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data');
  if (!isJson && !isForm) return json({ ok: false }, 415);

  const bodyResult = await readCustomerRequestBody(request);
  if (!bodyResult.ok) return json({ ok: false }, bodyResult.status);

  const page = resolvePage(request, requestUrl);
  let parsed;
  if (isJson) {
    let body: Partial<CustomerLead>;
    try {
      body = JSON.parse(bodyResult.raw) as Partial<CustomerLead>;
    } catch {
      return json({ ok: false }, 400);
    }
    parsed = parseCustomerLeadBody(body, { page, departments: bookingDepartments });
  } else {
    parsed = parseCustomerLeadFromUrlEncoded(new URLSearchParams(bodyResult.raw), {
      page,
      departments: bookingDepartments,
    });
  }

  if (!parsed.ok) return json({ ok: false }, parsed.status);
  if (parsed.kind === 'honeypot') {
    if (wantsJson(request, contentType)) return json({ ok: true }, 200);
    return new Response('<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>OK</title></head><body><p>OK</p></body></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const { lead } = parsed;
  const message = buildBookingWhatsAppMessage({
    name: lead.name,
    phone: lead.phone,
    department: lead.department,
    branch: clinicContact.branch,
  });
  const whatsappUrl = buildWhatsAppUrl(message, clinicLineFromDepartment(lead.department));
  const persist = await persistLead(lead);
  const saved = persist === 'saved';

  if (wantsJson(request, contentType)) {
    if (persist === 'unconfigured') return json({ ok: false, saved: false, whatsappUrl }, 503);
    if (persist === 'failed') return json({ ok: false, saved: false, whatsappUrl }, 502);
    return json({ ok: true, saved: true, whatsappUrl }, 201);
  }

  return new Response(
    formConfirmationHtml({ locale: lead.locale, whatsappUrl, saved }),
    {
      status: saved ? 201 : 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}) satisfies APIRoute;
