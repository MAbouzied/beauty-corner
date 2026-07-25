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

This project is configured for **static deployment on Cloudflare Workers Assets**.

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
npx wrangler deploy
```

Config lives in [`wrangler.jsonc`](./wrangler.jsonc) and points assets at `./dist`.

### Deploy with Cloudflare dashboard (Workers Builds)

Connect the GitHub repo, then use:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/` (repo root)

Optional environment variable:

- `PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in international digits only (no `+`)

See [`.env.example`](./.env.example).

### Notes

- No `@astrojs/cloudflare` adapter is required because the site is fully static.
- Custom 404 is enabled via `not_found_handling: "404-page"`.
- Security/cache headers are in [`public/_headers`](./public/_headers).

Docs: [Deploy Astro to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
