import { filterPublishedPosts, selectRelatedPosts } from '../lib/blog-selectors.ts';
import { isValidBlogSlug, normalizeBlogSlug } from '../lib/slug.ts';
import type { BlogPost } from '../model/blog-types.ts';
import type { BlogRepository } from './blog-repository.ts';
import { getMockAdminPublishedPostsSync } from '../../../lib/admin/blog-admin.ts';

/** Synchronous access for route registration / sitemap during build. */
export function getMockPublishedPostsSync(now = new Date()): BlogPost[] {
  return filterPublishedPosts(getMockAdminPublishedPostsSync(), now);
}

export function createMockBlogRepository(): BlogRepository {
  return {
    async getPublishedPosts() {
      return getMockPublishedPostsSync();
    },
    async getPostBySlug(slug: string) {
      const canonicalSlug = normalizeBlogSlug(slug);
      if (!isValidBlogSlug(canonicalSlug)) return null;
      const published = getMockPublishedPostsSync();
      return published.find((post) => post.slug === canonicalSlug) ?? null;
    },
    async getRelatedPosts(post, limit = 3) {
      return selectRelatedPosts(getMockPublishedPostsSync(), post, limit);
    },
  };
}
