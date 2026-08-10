import { createSanityClient } from '../sanity/client.ts';
import { mapSanityPostToBlogPost, mapSanityPosts } from '../sanity/map-sanity-post.ts';
import {
  publishedPostBySlugQuery,
  publishedPostsQuery,
  relatedPostsQuery,
} from '../sanity/queries.ts';
import type { SanityBlogPostDoc } from '../sanity/types.ts';
import { isValidBlogSlug, normalizeBlogSlug } from '../lib/slug.ts';
import type { BlogPost } from '../model/blog-types.ts';
import type { BlogRepository } from './blog-repository.ts';

export interface SanityBlogConfig {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
  token?: string;
}

export function createSanityBlogRepository(config: SanityBlogConfig = {}): BlogRepository {
  const client = createSanityClient(config);
  const imageConfig = {
    projectId: config.projectId!,
    dataset: config.dataset!,
  };

  return {
    async getPublishedPosts() {
      const docs = await client.fetch<SanityBlogPostDoc[]>(publishedPostsQuery);
      return mapSanityPosts(docs ?? [], imageConfig, undefined, { summary: true });
    },
    async getPostBySlug(slug: string) {
      const canonicalSlug = normalizeBlogSlug(slug);
      if (!isValidBlogSlug(canonicalSlug)) return null;
      const doc = await client.fetch<SanityBlogPostDoc | null>(publishedPostBySlugQuery, {
        slug: canonicalSlug,
      });
      if (!doc) return null;
      return mapSanityPostToBlogPost(doc, imageConfig);
    },
    async getRelatedPosts(post: BlogPost, limit = 3) {
      const docs = await client.fetch<SanityBlogPostDoc[]>(relatedPostsQuery, {
        slug: post.slug,
        categoryId: post.category.id,
        limit,
      });
      return mapSanityPosts(docs ?? [], imageConfig, undefined, { summary: true });
    },
  };
}
