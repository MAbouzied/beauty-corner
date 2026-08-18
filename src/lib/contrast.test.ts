import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contrastRatio, meetsWcagAa } from './contrast.ts';

describe('WCAG contrast tokens', () => {
  it('brand green text meets AA on white', () => {
    assert.ok(meetsWcagAa('#1f6b1c', '#ffffff'));
    assert.ok(contrastRatio('#1f6b1c', '#ffffff') >= 4.5);
  });

  it('white text meets AA on brand green buttons', () => {
    assert.ok(meetsWcagAa('#ffffff', '#247022'));
    assert.ok(meetsWcagAa('#ffffff', '#1f6b1c'));
  });

  it('success text meets AA on white', () => {
    assert.ok(meetsWcagAa('#1f6b1c', '#ffffff'));
  });

  it('placeholder meets AA on white', () => {
    assert.ok(meetsWcagAa('#717680', '#ffffff'));
  });

  it('logo leaf green is decorative on white', () => {
    assert.equal(meetsWcagAa('#3fa63b', '#ffffff'), false);
  });
});
