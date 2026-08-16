import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

const routesSource = await readFile(new URL('./routes.ts', import.meta.url), 'utf8');

describe('form landing routes', () => {
  it('registers Arabic and English /form as a non-indexable pair', () => {
    assert.match(routesSource, /id:\s*'form'/);
    assert.match(routesSource, /ar:\s*'\/form'/);
    assert.match(routesSource, /en:\s*'\/en\/form'/);
    assert.match(
      routesSource,
      /id:\s*'form'[\s\S]*?indexable:\s*false[\s\S]*?inSitemap:\s*false/,
    );
  });
});
