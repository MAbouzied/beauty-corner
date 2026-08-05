import { createBlogSlug } from '../../modules/blog/lib/slug.ts';

export const ADMIN_TITLE_MIN = 8;
export const ADMIN_TITLE_MAX = 120;
export const ADMIN_EXCERPT_MIN = 40;
export const ADMIN_EXCERPT_MAX = 220;

/** Existing posts keep their established URL unless the editor changes it explicitly. */
export function shouldKeepExistingBlogSlug(slug: string): boolean {
  return slug.trim().length > 0;
}

/** Deterministic Sanity document id for a category label. */
export function adminCategoryDocumentId(label: string): string {
  const slug = createBlogSlug(label.trim() || 'عام') || 'general';
  return `blog-category-${slug}`;
}

/** Deterministic Sanity document id for an author name. */
export function adminAuthorDocumentId(name: string): string {
  const slug = createBlogSlug(name.trim() || 'فريق بيوتي كورنر') || 'default';
  return `blog-author-${slug}`;
}

/**
 * Preserve the original publication timestamp after first publish.
 * Draft documents intentionally keep publishedAt after unpublish/edit so a later
 * republish restores the same SEO date instead of jumping to "now".
 */
export function resolveAdminPublishedAt(
  publish: boolean,
  existingPublishedAt: string | null | undefined,
  timestamp: string,
): string | undefined {
  if (existingPublishedAt) return existingPublishedAt;
  return publish ? timestamp : undefined;
}

export function assertAdminPublishCopy(input: { title: string; excerpt: string }): void {
  const title = input.title.trim();
  const excerpt = input.excerpt.trim();
  const titleLength = Array.from(title).length;
  const excerptLength = Array.from(excerpt).length;

  if (!title || titleLength < ADMIN_TITLE_MIN || titleLength > ADMIN_TITLE_MAX) {
    throw new Error(`عنوان المقال يجب أن يكون بين ${ADMIN_TITLE_MIN} و ${ADMIN_TITLE_MAX} حرفاً.`);
  }
  if (!excerpt || excerptLength < ADMIN_EXCERPT_MIN || excerptLength > ADMIN_EXCERPT_MAX) {
    throw new Error(`مقدمة المقال يجب أن تكون بين ${ADMIN_EXCERPT_MIN} و ${ADMIN_EXCERPT_MAX} حرفاً.`);
  }
}
