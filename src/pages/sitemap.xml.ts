import type { APIRoute } from 'astro';
import { getSitemapRoutePairs } from '../lib/i18n/routes';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Astro site URL must be configured.', { status: 500 });
  }

  const pairs = await getSitemapRoutePairs();

  const urls = pairs.flatMap((pair) => {
    const arabicLoc = new URL(pair.ar, site).href;
    const englishLoc = pair.en ? new URL(pair.en, site).href : null;
    const lastmod = pair.lastmod;

    const arabicEntry = {
      loc: arabicLoc,
      changefreq: pair.changefreq ?? 'monthly',
      priority: pair.priority,
      lastmod,
      alternates: {
        ar: arabicLoc,
        en: englishLoc,
      },
    };

    if (!englishLoc) return [arabicEntry];

    return [
      arabicEntry,
      {
        loc: englishLoc,
        changefreq: pair.changefreq ?? 'monthly',
        priority: pair.priority,
        lastmod,
        alternates: {
          ar: arabicLoc,
          en: englishLoc,
        },
      },
    ];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((entry) => {
    const priority =
      entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : '';
    const lastmod = entry.lastmod
      ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`
      : '';
    const alternateLinks = entry.alternates.en
      ? `
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(entry.alternates.ar)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(entry.alternates.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(entry.alternates.ar)}" />`
      : `
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(entry.alternates.ar)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(entry.alternates.ar)}" />`;

    return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <changefreq>${entry.changefreq}</changefreq>${priority}${lastmod}${alternateLinks}
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
