export function buildRobotsTxt(options: {
  indexable: boolean;
  host: string;
  sitemapUrl: string;
}): string {
  const productionHost = options.host.toLowerCase() === 'beautycorner.sa';
  if (!options.indexable || !productionHost) {
    return [
      'User-agent: *',
      'Disallow: /',
      '',
      '# Non-indexable or non-production host.',
      '',
    ].join('\n');
  }

  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# Keep API and tooling out of discovery crawls when possible.',
    'Disallow: /api/',
    '',
    `Sitemap: ${options.sitemapUrl}`,
    '',
  ].join('\n');
}
