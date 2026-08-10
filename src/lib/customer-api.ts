import type { CustomerLead } from './customer-leads';
import { isAllowedCustomerOrigin } from './security/origin.ts';
import {
  readLimitedRequestBody,
  RequestBodyTooLargeError,
} from './security/request-body.ts';

export const CUSTOMER_BODY_MAX_BYTES = 8_192;
export const CUSTOMER_RATE_LIMIT = 10;
export const CUSTOMER_RATE_WINDOW_MS = 60_000;

export type ParsedCustomerLead = {
  name: string;
  phone: string;
  department: string;
  service: string;
  locale: 'ar' | 'en';
  page: string;
};

export type CustomerLeadParseResult =
  | { ok: true; kind: 'honeypot' }
  | { ok: true; kind: 'lead'; lead: ParsedCustomerLead }
  | { ok: false; status: number };

export type CustomerRateLimiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export function parseCustomerLeadBody(
  body: Partial<CustomerLead>,
  options: {
    page?: string;
    departments: readonly string[];
  },
): CustomerLeadParseResult {
  const page = options.page ?? '';

  if (clean(body.website, 200)) {
    return { ok: true, kind: 'honeypot' };
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20);
  const submittedDepartment = clean(body.department, 120);
  const department = options.departments.find((item) => item === submittedDepartment) ?? '';
  const locale = body.locale === 'en' ? 'en' : 'ar';

  if (name.length < 3 || !/^05\d{8}$/.test(phone) || !department || body.consent !== true) {
    return { ok: false, status: 422 };
  }

  return {
    ok: true,
    kind: 'lead',
    lead: {
      name,
      phone,
      department,
      // Booking forms are department-only; keep the column for sheet compatibility.
      service: department,
      locale,
      page,
    },
  };
}

export function assertCustomerRequestAllowed(request: Request, requestUrl: URL): boolean {
  return isAllowedCustomerOrigin(
    request.headers.get('Origin'),
    requestUrl.origin,
    request.headers.get('Sec-Fetch-Site'),
  );
}

export async function readCustomerRequestBody(
  request: Request,
): Promise<{ ok: true; raw: string } | { ok: false; status: 413 }> {
  try {
    const raw = await readLimitedRequestBody(request, CUSTOMER_BODY_MAX_BYTES);
    return { ok: true, raw };
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) return { ok: false, status: 413 };
    throw error;
  }
}

export async function enforceCustomerRateLimit(
  limiter: CustomerRateLimiter | null | undefined,
  key: string,
  options: { failClosed: boolean },
): Promise<'allow' | 'limited' | 'unavailable'> {
  if (!limiter) {
    return options.failClosed ? 'unavailable' : 'allow';
  }
  const result = await limiter.limit({ key });
  return result.success ? 'allow' : 'limited';
}

/** Best-effort per-isolate limiter retained for local/unit tests only. */
export function createMemoryRateLimiter(
  limit = CUSTOMER_RATE_LIMIT,
  windowMs = CUSTOMER_RATE_WINDOW_MS,
): CustomerRateLimiter & { allow(key: string, now?: number): boolean } {
  const hits = new Map<string, number[]>();

  const evaluate = (key: string, now: number): boolean => {
    const cutoff = now - windowMs;
    const recent = (hits.get(key) ?? []).filter((timestamp) => timestamp > cutoff);
    if (recent.length === 0) {
      hits.delete(key);
    }
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    return true;
  };

  return {
    allow(key: string, now = Date.now()): boolean {
      return evaluate(key, now);
    },
    async limit({ key }): Promise<{ success: boolean }> {
      return { success: evaluate(key, Date.now()) };
    },
  };
}

export function parseCustomerLeadFromUrlEncoded(
  params: URLSearchParams,
  options: { page?: string; departments: readonly string[] },
): CustomerLeadParseResult {
  return parseCustomerLeadBody(
    {
      name: params.get('name') ?? '',
      phone: params.get('phone') ?? '',
      department: params.get('department') ?? '',
      service: params.get('service') ?? '',
      locale: params.get('locale') === 'en' ? 'en' : 'ar',
      consent: params.get('consent') === 'on' || params.get('consent') === 'true',
      website: params.get('website') ?? '',
    },
    options,
  );
}
