import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ADMIN_EXCERPT_MAX,
  ADMIN_EXCERPT_MIN,
  ADMIN_TITLE_MAX,
  ADMIN_TITLE_MIN,
  adminAuthorDocumentId,
  adminCategoryDocumentId,
  assertAdminPublishCopy,
  resolveAdminPublishedAt,
  shouldKeepExistingBlogSlug,
} from './blog-admin-helpers.ts';

describe('editor slug defaults', () => {
  it('keeps an existing slug manual and auto-generates only for new drafts', () => {
    assert.equal(shouldKeepExistingBlogSlug('existing-article'), true);
    assert.equal(shouldKeepExistingBlogSlug('  existing-article  '), true);
    assert.equal(shouldKeepExistingBlogSlug(''), false);
    assert.equal(shouldKeepExistingBlogSlug('   '), false);
  });
});

describe('admin taxonomy document ids', () => {
  it('creates deterministic per-value ids so shared defaults are not overwritten', () => {
    assert.equal(adminCategoryDocumentId('عام'), 'blog-category-عام');
    assert.equal(adminCategoryDocumentId('تجميل'), 'blog-category-تجميل');
    assert.notEqual(adminCategoryDocumentId('تجميل'), adminCategoryDocumentId('أسنان'));

    assert.equal(adminAuthorDocumentId('فريق بيوتي كورنر'), 'blog-author-فريق-بيوتي-كورنر');
    assert.notEqual(adminAuthorDocumentId('د. أحمد'), adminAuthorDocumentId('فريق بيوتي كورنر'));
  });
});

describe('resolveAdminPublishedAt', () => {
  it('sets publishedAt only on first publish and preserves it afterward', () => {
    assert.equal(resolveAdminPublishedAt(true, null, '2026-01-01T00:00:00.000Z'), '2026-01-01T00:00:00.000Z');
    assert.equal(
      resolveAdminPublishedAt(true, '2025-06-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
      '2025-06-01T00:00:00.000Z',
    );
    assert.equal(
      resolveAdminPublishedAt(false, '2025-06-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z'),
      '2025-06-01T00:00:00.000Z',
    );
    assert.equal(resolveAdminPublishedAt(false, null, '2026-01-01T00:00:00.000Z'), undefined);
  });
});

describe('assertAdminPublishCopy', () => {
  it('accepts titles and excerpts within Studio limits', () => {
    assert.doesNotThrow(() => assertAdminPublishCopy({
      title: 'أ'.repeat(ADMIN_TITLE_MIN),
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MIN),
    }));
    assert.doesNotThrow(() => assertAdminPublishCopy({
      title: 'أ'.repeat(ADMIN_TITLE_MAX),
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MAX),
    }));
  });

  it('rejects titles and excerpts outside Studio limits', () => {
    assert.throws(() => assertAdminPublishCopy({
      title: 'قصير',
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MIN),
    }));
    assert.throws(() => assertAdminPublishCopy({
      title: 'أ'.repeat(ADMIN_TITLE_MAX + 1),
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MIN),
    }));
    assert.throws(() => assertAdminPublishCopy({
      title: 'أ'.repeat(ADMIN_TITLE_MIN),
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MIN - 1),
    }));
    assert.throws(() => assertAdminPublishCopy({
      title: 'أ'.repeat(ADMIN_TITLE_MIN),
      excerpt: 'ب'.repeat(ADMIN_EXCERPT_MAX + 1),
    }));
  });
});
