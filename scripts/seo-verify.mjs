import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const DIST_ROOT = join(ROOT, 'dist');
const DIST = existsSync(join(DIST_ROOT, 'client')) ? join(DIST_ROOT, 'client') : DIST_ROOT;

function walkHtmlFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (entry === '_astro' || entry === 'assets') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkHtmlFiles(full, files);
    else if (extname(full) === '.html') files.push(full);
  }
  return files;
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
}

function extract(html, regex) {
  const matches = [];
  let match;
  const re = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : `${regex.flags}g`);
  while ((match = re.exec(html)) !== null) matches.push(match[1]?.trim() ?? match[0]);
  return matches;
}

function fileToRoute(file) {
  const rel = file.slice(DIST.length).replaceAll('\\', '/');
  if (rel === '/404.html' || rel.endsWith('/404.html')) return null;
  if (rel === '/index.html') return '/';
  if (rel.endsWith('/index.html')) return rel.slice(0, -'/index.html'.length) || '/';
  return rel.replace(/\.html$/, '');
}

function hasEnKey(contentEn, id) {
  return (
    contentEn.includes(`'${id}':`) ||
    contentEn.includes(`"${id}":`) ||
    new RegExp(`(?:^|\\n)\\s*${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*\\{`).test(contentEn)
  );
}

function main() {
  const errors = [];
  const warnings = [];

  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  const servicesSrc = readFileSync(join(ROOT, 'src/data/services.ts'), 'utf8');
  const doctorsSrc = readFileSync(join(ROOT, 'src/data/doctors.ts'), 'utf8');
  const contentEn = readFileSync(join(ROOT, 'src/lib/i18n/content-en.ts'), 'utf8');
  const serviceIds = [...servicesSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
  const doctorIds = [...doctorsSrc.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
  for (const id of serviceIds) {
    if (!hasEnKey(contentEn, id)) errors.push(`Missing EN translation for service: ${id}`);
  }
  for (const id of doctorIds) {
    if (!hasEnKey(contentEn, id)) errors.push(`Missing EN translation for doctor: ${id}`);
  }

  const htmlFiles = walkHtmlFiles(DIST);
  const titles = new Map();
  const descriptions = new Map();
  const routes = [];

  for (const file of htmlFiles) {
    const route = fileToRoute(file);
    if (route === null) continue;
    routes.push(route);
    const html = readFileSync(file, 'utf8');
    const body = stripTags(html);

    const title = extract(html, /<title>([^<]*)<\/title>/i)[0];
    const description =
      extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)[0] ||
      extract(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)[0];
    const canonical =
      extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)[0] ||
      extract(html, /<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i)[0];
    const robots = extract(html, /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)[0] || '';
    const h1s = extract(body, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i).map((h) =>
      h.replace(/<[^>]+>/g, '').trim(),
    );
    const hreflangs = extract(html, /hreflang=["']([^"']+)["']/i);
    const jsonLdBlocks = extract(
      html,
      /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
    );

    if (!title) errors.push(`${route}: missing <title>`);
    if (!description) errors.push(`${route}: missing meta description`);
    if (title) {
      const list = titles.get(title) ?? [];
      list.push(route);
      titles.set(title, list);
    }
    if (description) {
      const list = descriptions.get(description) ?? [];
      list.push(route);
      descriptions.set(description, list);
      if (description.length < 70 || description.length > 180) {
        warnings.push(`${route}: description length ${description.length} (aim 70–180)`);
      }
    }

    const isNoindex = /noindex/i.test(robots);
    if (!isNoindex && !canonical) errors.push(`${route}: missing canonical`);
    if (canonical && !canonical.startsWith('https://beautycorner.sa')) {
      errors.push(`${route}: canonical not on production host: ${canonical}`);
    }
    if (canonical) {
      try {
        const url = new URL(canonical);
        const canonicalPath = url.pathname.replace(/\/$/, '') || '/';
        const routePath = route.replace(/\/$/, '') || '/';
        if (canonicalPath !== routePath) {
          errors.push(`${route}: canonical path ${url.pathname} differs from file route`);
        }
      } catch {
        errors.push(`${route}: invalid canonical URL`);
      }
    }

    if (h1s.length === 0) errors.push(`${route}: missing H1`);
    if (h1s.length > 1) errors.push(`${route}: multiple H1 (${h1s.length})`);

    if (!isNoindex) {
      const isArabicOnly = route === '/blogs' || route.startsWith('/blogs/');
      if (isArabicOnly) {
        if (!hreflangs.includes('ar') || !hreflangs.includes('x-default')) {
          errors.push(`${route}: Arabic-only page missing ar/x-default hreflang`);
        }
        if (hreflangs.includes('en')) {
          errors.push(`${route}: Arabic-only page must not emit English hreflang`);
        }
        if (html.includes('og:locale:alternate')) {
          errors.push(`${route}: Arabic-only page must not emit og:locale:alternate`);
        }
        if (html.includes('/en/blogs')) {
          errors.push(`${route}: references nonexistent /en/blogs`);
        }
      } else if (
        !hreflangs.includes('ar') ||
        !hreflangs.includes('en') ||
        !hreflangs.includes('x-default')
      ) {
        errors.push(`${route}: missing reciprocal hreflang set (ar/en/x-default)`);
      }
      if (html.includes('/en/404')) errors.push(`${route}: hreflang references /en/404`);
    }

    for (const block of jsonLdBlocks) {
      try {
        const data = JSON.parse(block);
        const graph = Array.isArray(data['@graph']) ? data['@graph'] : [data];
        const types = graph.map((node) => node['@type']).filter(Boolean);
        if (!types.includes('MedicalClinic')) warnings.push(`${route}: JSON-LD missing MedicalClinic`);
        if (!types.includes('WebSite')) warnings.push(`${route}: JSON-LD missing WebSite`);
      } catch {
        errors.push(`${route}: invalid JSON-LD`);
      }
    }
  }

  for (const [title, list] of titles) {
    if (list.length > 1) errors.push(`Duplicate title "${title}" on: ${list.join(', ')}`);
  }
  for (const [desc, list] of descriptions) {
    if (list.length > 1) errors.push(`Duplicate description "${desc.slice(0, 48)}…" on: ${list.join(', ')}`);
  }

  const sitemapPath = join(DIST, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    errors.push('sitemap.xml missing from dist');
  } else {
    const sitemap = readFileSync(sitemapPath, 'utf8');
    if (sitemap.includes('/api/') || sitemap.includes('/404')) {
      errors.push('sitemap includes excluded routes');
    }
    if (sitemap.includes('/en/blogs')) {
      errors.push('sitemap includes nonexistent /en/blogs routes');
    }
    const locs = extract(sitemap, /<loc>([^<]+)<\/loc>/);
    for (const loc of locs) {
      if (!loc.startsWith('https://beautycorner.sa')) {
        errors.push(`sitemap loc not production: ${loc}`);
      }
    }
    const urlBlocks = sitemap.split('<url>').slice(1);
    for (const block of urlBlocks) {
      const loc = extract(block, /<loc>([^<]+)<\/loc>/)[0];
      const ar =
        extract(block, /hreflang="ar"\s+href="([^"]+)"/)[0] ||
        extract(block, /href="([^"]+)"\s+hreflang="ar"/)[0];
      const en =
        extract(block, /hreflang="en"\s+href="([^"]+)"/)[0] ||
        extract(block, /href="([^"]+)"\s+hreflang="en"/)[0];
      const xDefault =
        extract(block, /hreflang="x-default"\s+href="([^"]+)"/)[0] ||
        extract(block, /href="([^"]+)"\s+hreflang="x-default"/)[0];
      const isArabicOnlyBlog = loc?.includes('/blogs');
      if (isArabicOnlyBlog) {
        if (!ar || !xDefault) errors.push(`sitemap Arabic-only entry missing ar/x-default: ${loc}`);
        if (en) errors.push(`sitemap Arabic-only entry must not include en alternate: ${loc}`);
        if (!block.includes('<lastmod>')) {
          // Listing may omit lastmod; article URLs should include content dates.
          if (loc && /\/blogs\/[^/]+$/.test(new URL(loc).pathname)) {
            errors.push(`sitemap blog article missing lastmod: ${loc}`);
          }
        }
      } else if (!ar || !en || !xDefault) {
        errors.push(`sitemap entry missing alternates: ${loc}`);
      }
      if (xDefault && ar && xDefault !== ar) errors.push(`sitemap x-default != ar for ${loc}`);
    }

    // Bilingual site URLs + Arabic blog listing + article/pagination URLs from the active provider.
    const blogArticleLocs = locs.filter((loc) => {
      try {
        return /\/blogs\/[^/]+$/.test(new URL(loc).pathname) && !loc.includes('/blogs/page/');
      } catch {
        return false;
      }
    });
    const blogPageLocs = locs.filter((loc) => loc.includes('/blogs/page/'));
    if (!locs.some((loc) => loc.endsWith('/blogs') || loc.endsWith('/blogs/'))) {
      errors.push('sitemap missing Arabic blog listing /blogs');
    }
    if (blogArticleLocs.length === 0) {
      warnings.push('sitemap has no blog article URLs (empty provider dataset is allowed)');
    }
    if (blogPageLocs.length > 0) {
      warnings.push(`sitemap includes ${blogPageLocs.length} blog pagination URL(s)`);
    }
  }

  const robotsPath = join(ROOT, 'public/robots.txt');
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, 'utf8');
    if (!robots.includes('https://beautycorner.sa/sitemap.xml')) {
      errors.push('robots.txt missing production sitemap URL');
    }
  } else {
    errors.push('public/robots.txt missing');
  }

  const landing = readFileSync(join(ROOT, 'src/data/landing.ts'), 'utf8');
  if (landing.includes('[الافتتاح]') || landing.includes('[تاريخ')) {
    errors.push('landing.ts still contains visible placeholders');
  }
  const landingSections = readFileSync(
    join(ROOT, 'src/components/landing/LandingSections.astro'),
    'utf8',
  );
  if (landingSections.includes('اقرأ المقال') || landingSections.includes('مساحة مخصصة لخريطة')) {
    errors.push('LandingSections still contains placeholder/dead article UI');
  }

  // 404 page checks
  const notFoundPath = join(DIST, '404.html');
  if (existsSync(notFoundPath)) {
    const html = readFileSync(notFoundPath, 'utf8');
    if (!/noindex/i.test(html)) errors.push('404.html missing noindex');
    if (/nofollow/i.test(html) && !/noindex,\s*follow/i.test(html)) {
      warnings.push('404.html uses nofollow; prefer noindex, follow');
    }
    if (html.includes('hreflang') && html.includes('/en/404')) {
      errors.push('404.html references /en/404 in hreflang');
    }
  }

  console.log(`SEO verify scanned ${routes.length} HTML routes from ${DIST}`);
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    console.error(`\nSEO verify failed with ${errors.length} error(s), ${warnings.length} warning(s).`);
    process.exit(1);
  }

  console.log(`SEO verify passed with ${warnings.length} warning(s).`);
}

main();
