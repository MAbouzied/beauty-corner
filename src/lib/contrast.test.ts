import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contrastRatio, meetsWcagAa } from './contrast.ts';

describe('WCAG contrast tokens', () => {
  it('gold text meets AA on white', () => {
    assert.ok(meetsWcagAa('#9a6a18', '#ffffff'));
    assert.ok(contrastRatio('#9a6a18', '#ffffff') >= 4.5);
  });

  it('success text meets AA on white', () => {
    assert.ok(meetsWcagAa('#0b6f20', '#ffffff'));
  });

  it('placeholder meets AA on white', () => {
    assert.ok(meetsWcagAa('#717680', '#ffffff'));
  });

  it('decorative gold fails body-text AA on white', () => {
    assert.equal(meetsWcagAa('#e6c45a', '#ffffff'), false);
  });
});
