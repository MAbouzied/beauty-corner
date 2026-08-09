import type { CustomerLead } from './customer-leads';

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

/** Best-effort per-isolate limiter; resets on Worker cold starts. */
export function createMemoryRateLimiter(
  limit = CUSTOMER_RATE_LIMIT,
  windowMs = CUSTOMER_RATE_WINDOW_MS,
) {
  const hits = new Map<string, number[]>();

  return {
    allow(key: string, now = Date.now()): boolean {
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
    },
  };
}

export const customerRateLimiter = createMemoryRateLimiter();
