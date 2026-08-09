# Beauty Corner

Astro website for بيوتي كورنر — dental, dermatology, and laser clinic pages with WhatsApp booking and Schema.org SEO.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local Astro dev server |
| `npm run build` | Production build to `./dist` |
| `npm run preview` | Preview the Astro build locally |
| `npm run preview:cf` | Preview the Workers build with Wrangler |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run verify` | Type-check + production build |

## Cloudflare Workers

This project uses Astro's Cloudflare adapter. Pages are prerendered as static assets, while
`POST /api/customers` runs on demand in a Cloudflare Worker and writes booking leads to Google Sheets.

### Deploy with Wrangler

1. Log in once:

```sh
npx wrangler login
```

2. Deploy:

```sh
npm run deploy
```

Or:

```sh
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

Project settings live in [`wrangler.jsonc`](./wrangler.jsonc). The Astro Cloudflare adapter generates the
Worker entrypoint and static asset configuration in `./dist/server/wrangler.json` during the build —
deploy against that generated config.

### Deploy with Cloudflare dashboard (Workers Builds)

Connect the GitHub repo, then use:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy --config dist/server/wrangler.json`
- **Root directory:** `/` (repo root)

Optional public environment variables:

- `PUBLIC_DENTAL_PHONE` — Dental clinic WhatsApp/telephone in international digits only (no `+`).
  Default: `966552959863` (`055 295 9863`).
- `PUBLIC_DERMATOLOGY_PHONE` — Dermatology clinic WhatsApp/telephone in international digits only (no `+`).
  Default: `966559523784` (`055 952 3784`).
- `PUBLIC_GTM_ID` — Google Tag Manager container ID (for example `GTM-ABC1234`). GTM stays off when unset.

See [`.env.example`](./.env.example).

## Blog (Sanity) and staff admin

- Blog content reads from the configured provider. `BLOG_PROVIDER=sanity` loads the database response; local `BLOG_PROVIDER=mock` mode starts empty and only contains records created during the current test process—no fixture posts are seeded. Configure the provider with the build-time env vars documented in [`.env.example`](./.env.example).
- The Arabic dashboard uses `/admin` for the overview, `/admin/create` to reserve a new draft, `/admin/:id/edit` for rich-text editing, and `/admin/:id/preview` for previewing the latest saved draft before publishing. It supports draft saving, publishing, unpublishing, editing, preview, and deletion. Local testing has `ADMIN_AUTH_DISABLED=true` in `.dev.vars`; keep it false or unset in production.
- Standalone Studio: [`studio/`](./studio/) (`npm run studio:dev`).
- Staff Google login for `/admin` uses Better Auth and the private `staff-auth` Sanity dataset. Before enabling it in production, create the private dataset, deploy the Studio, manually add and publish the first real administrator in the Studio `/staff-auth` workspace, configure `SANITY_AUTH_DATASET` and `SANITY_AUTH_TOKEN` as Worker secrets, then enable the Google auth secrets. Never seed an administrator through an environment variable. See [Sanity and staff auth](./docs/sanity-and-staff-auth.md).

## Google Sheets

Valid booking submissions write full booking data to a private `Bookings` tab and raw customer data to a
private `Customers` tab. See [Google Sheets integration](./docs/google-sheets.md) for the complete feature
requirements, schemas, implementation details, setup, testing, deployment, and credential cleanup guide.

Docs: [Deploy Astro to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
