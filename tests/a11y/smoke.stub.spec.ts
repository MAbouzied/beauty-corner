import { test, expect } from '@playwright/test';

/**
 * Phase 1: keep the a11y project green without a live server.
 * Phase 4 wires @axe-core/playwright against preview URLs.
 */
test.describe('A11y stubs (Phase 1 scaffolding)', () => {
  test('axe-core dependency contract is reserved for Phase 4', async () => {
    const axe = await import('@axe-core/playwright');
    expect(typeof axe.AxeBuilder).toBe('function');
  });
});
