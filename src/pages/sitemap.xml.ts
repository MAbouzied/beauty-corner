import type { APIRoute } from 'astro';
import { doctors } from '../data/doctors';
import { clinicServices } from '../data/services';

const staticPaths = ['/', '/services', '/doctors', '/contact'] as const;

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Astro site URL must be configured.', { status: 500 });
  }

  const lastmod = new Date().toISOString().split('T')[0];
  const urls = [
    ...staticPaths.map((path) => ({
      loc: new URL(path, site).href,
      changefreq: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? '1.0' : '0.8',
    })),
    ...clinicServices.map((service) => ({
      loc: new URL(`/services/${service.id}`, site).href,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...doctors.map((doctor) => ({
      loc: new URL(`/doctors/${doctor.id}`, site).href,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
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
