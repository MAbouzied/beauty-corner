import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  blogPostProjection,
  blogPostSummaryProjection,
  publishedPostBySlugQuery,
  publishedPostsQuery,
  relatedPostsQuery,
} from './queries.ts';

describe('Sanity blog projections', () => {
  it('keeps body fields out of the summary projection', () => {
    assert.doesNotMatch(blogPostSummaryProjection, /\bbody\b/);
    assert.doesNotMatch(blogPostSummaryProjection, /bodyJson/);
    assert.doesNotMatch(blogPostSummaryProjection, /bodyHtml/);
    assert.match(blogPostProjection, /bodyJson/);
    assert.match(blogPostProjection, /bodyHtml/);
  });

  it('uses summary projection for listings and related posts', () => {
    assert.match(publishedPostsQuery, /blogPost/);
    assert.doesNotMatch(publishedPostsQuery, /bodyJson/);
    assert.match(relatedPostsQuery, /\$categoryId/);
    assert.doesNotMatch(relatedPostsQuery, /bodyHtml/);
    assert.match(publishedPostBySlugQuery, /bodyJson/);
  });
});
