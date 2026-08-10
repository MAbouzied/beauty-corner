import type { BlogPost } from '../model/blog-types.ts';

export interface BlogRepository {
  getPublishedPosts(): Promise<BlogPost[]>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getRelatedPosts(post: BlogPost, limit?: number): Promise<BlogPost[]>;
}

export type BlogProvider = 'mock' | 'sanity';
