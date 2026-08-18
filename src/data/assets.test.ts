import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const publicAssets = join(root, 'public', 'assets');
const srcImages = join(root, 'src', 'assets', 'images');

function walkFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(full));
    else files.push(full);
  }
  return files;
}

function rasterFiles(dir: string): string[] {
  return walkFiles(dir).filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file));
}

describe('public raster assets', () => {
  it('has no exact duplicate raster payloads', () => {
    const files = rasterFiles(publicAssets);
    const byHash = new Map<string, string[]>();
    for (const file of files) {
      const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
      const list = byHash.get(hash) ?? [];
      list.push(relative(publicAssets, file).replaceAll('\\', '/'));
      byHash.set(hash, list);
    }
    const duplicates = [...byHash.values()].filter((group) => group.length > 1);
    assert.deepEqual(duplicates, [], `duplicate rasters: ${JSON.stringify(duplicates)}`);
  });

  it('keeps social card dimensions and size budget', () => {
    const social = join(publicAssets, 'social-card.png');
    const size = statSync(social).size;
    assert.ok(size > 10_000, 'social card should exist');
    assert.ok(size <= 1_600_000, `social card too large: ${size}`);
  });

  it('keeps structured-data logo raster under a sane budget', () => {
    const logo = join(publicAssets, 'logo.png');
    const size = statSync(logo).size;
    assert.ok(size > 1_000);
    assert.ok(size <= 400_000, `logo.png too large: ${size}`);
  });
});

describe('src image pipeline assets', () => {
  it('stores canonical rasters under src/assets/images', () => {
    const required = [
      'landing-hero.jpg',
      'landing-clinic-gallery.jpg',
      'doctor-dentistry.png',
      'doctor-wissam.png',
      'doctor-hala.jpg',
      'devices/beyond-whitening.jpg',
      'devices/curas-qswitched.jpg',
      'devices/nuera-tight.jpg',
      'devices/candela-gentlemax-pro.jpg',
      'devices/lumenis-splendor-x.jpg',
      'devices/preime-dermafacial.jpg',
      'devices/aqua-peel-tera.jpg',
      'devices/fractional-co2-laser.jpg',
      'devices/dental-unit-blue.jpg',
      'devices/dental-unit-led.jpg',
      'devices/dental-examination-unit.jpg',
      'devices/woodpecker-ptb.png',
    ];
    for (const file of required) {
      assert.ok(statSync(join(srcImages, file)).isFile(), `missing ${file}`);
    }
  });
});
