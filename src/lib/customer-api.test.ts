import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  createMemoryRateLimiter,
  parseCustomerLeadBody,
} from './customer-api.ts';

const services = [
  { title: 'زراعة الأسنان', department: 'أسنان' },
  { title: 'علاج حب الشباب', department: 'جلدية' },
] as const;

describe('parseCustomerLeadBody', () => {
  it('accepts a valid lead and derives department from the matched service', () => {
    const result = parseCustomerLeadBody({
      name: 'عبدالله محمد',
      phone: '0551234567',
      department: 'spoofed',
      service: 'زراعة الأسنان',
      locale: 'en',
      consent: true,
    }, { page: '/en/book', services });

    assert.equal(result.ok, true);
    if (!result.ok || result.kind !== 'lead') throw new Error('expected lead');
    assert.equal(result.lead.department, 'أسنان');
    assert.equal(result.lead.service, 'زراعة الأسنان');
    assert.equal(result.lead.locale, 'en');
    assert.equal(result.lead.page, '/en/book');
  });

  it('rejects unknown services even when department is present', () => {
    const result = parseCustomerLeadBody({
      name: 'Abdullah',
      phone: '0551234567',
      department: 'أسنان',
      service: 'Unknown Service',
      locale: 'ar',
      consent: true,
    }, { services });

    assert.deepEqual(result, { ok: false, status: 422 });
  });

  it('treats honeypot submissions as successful no-ops', () => {
    const result = parseCustomerLeadBody({
      name: 'bot',
      phone: '0551234567',
      service: 'زراعة الأسنان',
      consent: true,
      website: 'https://spam.example',
    }, { services });

    assert.deepEqual(result, { ok: true, kind: 'honeypot' });
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
