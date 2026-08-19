import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import { clinicGeo, clinicMapUrl } from './seo.ts';

describe('clinic map facts', () => {
  it('points to the Beauty Corner Google Maps listing', () => {
    assert.equal(clinicMapUrl, 'https://maps.app.goo.gl/ALNUFTzXzqctrbpM6');
    assert.equal(clinicGeo.latitude, 28.3967825);
    assert.equal(clinicGeo.longitude, 45.9833191);
  });

  it('uses a location button on the home contact section instead of an embed', async () => {
    const source = await readFile(
      new URL('../components/landing/LandingSections.astro', import.meta.url),
      'utf8',
    );

    assert.doesNotMatch(source, /<iframe/);
    assert.doesNotMatch(source, /output=embed/);
    assert.match(source, /clinicMapUrl/);
    assert.match(source, /ButtonLink/);
    assert.match(source, /location\.svg/);
  });
});
