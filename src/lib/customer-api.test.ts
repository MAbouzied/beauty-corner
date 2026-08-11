import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { bookingDepartments } from '../data/booking-departments.ts';
import {
  assertCustomerRequestAllowed,
  createMemoryRateLimiter,
  enforceCustomerRateLimit,
  parseCustomerLeadBody,
} from './customer-api.ts';

describe('parseCustomerLeadBody', () => {
  it('accepts a valid lead with a known booking department', () => {
    const result = parseCustomerLeadBody({
      name: 'عبدالله محمد',
      phone: '0551234567',
      department: 'قسم الفيلر',
      service: 'ignored',
      locale: 'en',
      consent: true,
    }, { page: '/en/book', departments: bookingDepartments });

    assert.equal(result.ok, true);
    if (!result.ok || result.kind !== 'lead') throw new Error('expected lead');
    assert.equal(result.lead.department, 'قسم الفيلر');
    assert.equal(result.lead.service, 'قسم الفيلر');
    assert.equal(result.lead.locale, 'en');
    assert.equal(result.lead.page, '/en/book');
  });

  it('rejects unknown departments', () => {
    const result = parseCustomerLeadBody({
      name: 'Abdullah',
      phone: '0551234567',
      department: 'أسنان',
      locale: 'ar',
      consent: true,
    }, { departments: bookingDepartments });

    assert.deepEqual(result, { ok: false, status: 422 });
  });

  it('treats honeypot submissions as successful no-ops', () => {
    const result = parseCustomerLeadBody({
      name: 'bot',
      phone: '0551234567',
      department: 'قسم الليزر',
      consent: true,
      website: 'https://spam.example',
    }, { departments: bookingDepartments });

    assert.deepEqual(result, { ok: true, kind: 'honeypot' });
  });
});

describe('assertCustomerRequestAllowed', () => {
  it('requires exact Origin and blocks cross-site Fetch Metadata', () => {
    const url = new URL('https://beautycorner.sa/api/customers');
    const ok = new Request(url, {
      headers: {
        Origin: 'https://beautycorner.sa',
        'Sec-Fetch-Site': 'same-origin',
      },
    });
    assert.equal(assertCustomerRequestAllowed(ok, url), true);

    const cross = new Request(url, {
      headers: {
        Origin: 'https://beautycorner.sa',
        'Sec-Fetch-Site': 'cross-site',
      },
    });
    assert.equal(assertCustomerRequestAllowed(cross, url), false);

    const missing = new Request(url, {
      headers: { 'Sec-Fetch-Site': 'same-origin' },
    });
    assert.equal(assertCustomerRequestAllowed(missing, url), false);
  });
});

describe('enforceCustomerRateLimit', () => {
  it('fails closed when the binding is missing in production mode', async () => {
    assert.equal(
      await enforceCustomerRateLimit(null, 'customers:1', { failClosed: true }),
      'unavailable',
    );
  });

  it('honors Cloudflare-style limiter results', async () => {
    const limiter = {
      async limit() {
        return { success: false };
      },
    };
    assert.equal(
      await enforceCustomerRateLimit(limiter, 'customers:1', { failClosed: true }),
      'limited',
    );
  });

  it('fails closed when the limiter throws in production mode', async () => {
    const limiter = {
      async limit() {
        throw new Error('binding unavailable');
      },
    };
    assert.equal(
      await enforceCustomerRateLimit(limiter, 'customers:1', { failClosed: true }),
      'unavailable',
    );
  });
});

describe('createMemoryRateLimiter', () => {
  it('allows traffic under the limit and blocks once exceeded', () => {
    const limiter = createMemoryRateLimiter(2, 60_000);
    assert.equal(limiter.allow('ip-a', 1_000), true);
    assert.equal(limiter.allow('ip-a', 1_100), true);
    assert.equal(limiter.allow('ip-a', 1_200), false);
    assert.equal(limiter.allow('ip-b', 1_200), true);
  });

  it('resets after the window elapses', () => {
    const limiter = createMemoryRateLimiter(1, 1_000);
    assert.equal(limiter.allow('ip-a', 1_000), true);
    assert.equal(limiter.allow('ip-a', 1_500), false);
    assert.equal(limiter.allow('ip-a', 2_001), true);
  });
});
