import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isValidGtmId, resolveGtmId } from './gtm.ts';

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
