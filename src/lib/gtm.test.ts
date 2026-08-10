import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isValidGtmId, resolveGtmId, sanitizeGtmPayload } from './gtm.ts';

describe('resolveGtmId', () => {
  it('accepts a real container id', () => {
    assert.equal(resolveGtmId('GTM-ABC1234'), 'GTM-ABC1234');
  });

  it('rejects placeholders and empty values', () => {
    assert.equal(resolveGtmId('GTM-XXXXXXX'), '');
    assert.equal(resolveGtmId(''), '');
    assert.equal(resolveGtmId(undefined), '');
    assert.equal(isValidGtmId('GTM-XXXXXXX'), false);
  });
});

describe('sanitizeGtmPayload', () => {
  it('strips department, service, and personal fields', () => {
    assert.deepEqual(
      sanitizeGtmPayload({
        form_id: 'booking',
        method: 'whatsapp',
        department: 'قسم الليزر',
        service: 'قسم الليزر',
        name: 'Ali',
        phone: '0551234567',
      }),
      {
        form_id: 'booking',
        method: 'whatsapp',
      },
    );
  });
});
