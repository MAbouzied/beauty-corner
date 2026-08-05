import type { APIRoute } from 'astro';
import { clinicServices } from '../../data/services';
import {
  CUSTOMER_BODY_MAX_BYTES,
  customerRateLimiter,
  parseCustomerLeadBody,
} from '../../lib/customer-api';
import type { CustomerLead } from '../../lib/customer-leads';
import {
  appendBookingAndCustomer,
  GoogleSheetsConfigurationError,
  isGoogleSheetsConfigured,
} from '../../lib/google-sheets';

export const prerender = false;

const json = (body: Record<string, unknown>, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const POST = (async ({ request }) => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('Origin');
  const rateKey = request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
    || 'unknown';

  if (origin && origin !== requestUrl.origin) return json({ ok: false }, 403);
  if (!customerRateLimiter.allow(`customers:${rateKey}`)) return json({ ok: false }, 429);
  if (!request.headers.get('Content-Type')?.includes('application/json')) return json({ ok: false }, 415);

  const raw = await request.text();
  if (raw.length > CUSTOMER_BODY_MAX_BYTES) return json({ ok: false }, 413);

  let body: Partial<CustomerLead>;
  try {
    body = JSON.parse(raw) as Partial<CustomerLead>;
  } catch {
    return json({ ok: false }, 400);
  }

  let page = '';
  const referer = request.headers.get('Referer');
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.origin === requestUrl.origin) page = refererUrl.pathname;
    } catch {
      page = '';
    }
  }

  const parsed = parseCustomerLeadBody(body, { page, services: clinicServices });
  if (!parsed.ok) return json({ ok: false }, parsed.status);
  if (parsed.kind === 'honeypot') return json({ ok: true }, 200);

  const registeredAt = new Date().toISOString();
  const { lead } = parsed;

  if (!isGoogleSheetsConfigured()) {
    console.error('Google Sheets is not configured; refusing to discard customer lead data.');
    return json({ ok: false }, 503);
  }

  try {
    await appendBookingAndCustomer(
      [registeredAt, lead.name, lead.phone, lead.department, lead.service, lead.page, lead.locale],
      [registeredAt, lead.name, lead.phone],
    );
    return json({ ok: true }, 201);
  } catch (error) {
    console.error('Unable to append booking and customer to Google Sheets.', error);
    return json({ ok: false }, error instanceof GoogleSheetsConfigurationError ? 503 : 502);
  }
}) satisfies APIRoute;
