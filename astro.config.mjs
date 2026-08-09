// @ts-check
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://beautycorner.sa',
  trailingSlash: 'never',
  redirects: {
    '/devices': {
      status: 301,
      destination: '/#devices',
    },
    '/en/devices': {
      status: 301,
      destination: '/en#devices',
    },
  },
  adapter: cloudflare(),
  integrations: [react()],
  cache: { provider: cacheCloudflare() },
  env: {
    schema: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_PRIVATE_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_SHEET_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_BOOKINGS_SHEET_NAME: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_CUSTOMERS_SHEET_NAME: envField.string({ context: 'server', access: 'secret', optional: true }),
      BLOG_PROVIDER: envField.enum({
        context: 'server',
        access: 'public',
        values: ['mock', 'sanity'],
        optional: true,
        default: 'mock',
      }),
      SANITY_PROJECT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_DATASET: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_API_VERSION: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_API_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_WRITE_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      BLOG_REVALIDATE_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Separate, private dataset used only for staff authorization and management.
      SANITY_AUTH_DATASET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
        default: 'staff-auth',
      }),
      SANITY_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      ADMIN_AUTH_DISABLED: envField.boolean({ context: 'server', access: 'secret', optional: true, default: false }),
      PUBLIC_SANITY_STUDIO_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      BETTER_AUTH_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      BETTER_AUTH_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_CLIENT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
