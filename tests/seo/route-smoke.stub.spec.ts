import { test, expect } from '@playwright/test';
import { createFakeRateLimiter, createFakeSheetsBinding } from '../fixtures/fake-bindings';
import { getPublishedMockPosts } from '../fixtures/mock-blog';

/**
 * Placeholder SEO / route smoke coverage.
 * Phase 3 adds live 503/404/robots assertions against a preview build.
 */
test.describe('Route smoke stubs (Phase 1 scaffolding)', () => {
  test('fake Sheets binding accepts a booking row', async () => {
    const sheets = createFakeSheetsBinding();
    const result = await sheets.append({
      name: 'Test',
      phone: '0500000000',
      source: 'book',
    });
    expect(result.ok).toBe(true);
    expect(result.rowCount).toBe(1);
    expect(sheets.rows).toHaveLength(1);
  });

  test('fake rate limiter fails closed after the quota', async () => {
    const limiter = createFakeRateLimiter(2);
    expect((await limiter.limit()).success).toBe(true);
    expect((await limiter.limit()).success).toBe(true);
    expect((await limiter.limit()).success).toBe(false);
  });

  test('published mock posts are ready for sitemap/listing stubs', () => {
    const posts = getPublishedMockPosts();
    expect(posts.map((post) => post.slug)).toEqual(['mock-published-post']);
  });
});
