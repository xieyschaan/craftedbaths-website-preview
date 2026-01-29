# Deploy to Cloudflare Workers

This project uses **OpenNext** (`@opennextjs/cloudflare`) to deploy Next.js applications to **Cloudflare Workers**. OpenNext is specifically designed for Workers deployment and provides full support for SSR, dynamic routes, and all Next.js features.

---

## Quick Deploy

From the project root:

```powershell
npm run deploy
```

This command:
1. Builds your Next.js app (`next build`)
2. Transforms it for Cloudflare Workers (`opennextjs-cloudflare build`)
3. Deploys to Cloudflare Workers (`opennextjs-cloudflare deploy`)

---

## Initial Setup

### 1. Install Dependencies

```powershell
npm install
```

### 2. Authenticate with Cloudflare

```powershell
npx wrangler login
```

This will open your browser to authenticate with Cloudflare.

### 3. Configure Environment Variables

Create a `.dev.vars` file for local development (already exists):

```
NEXTJS_ENV=development
```

For production, set environment variables in Cloudflare Dashboard:
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **crafted-bathrooms-website**
3. Go to **Settings** → **Variables and Secrets**
4. Add your environment variables:
   - `NEXT_PUBLIC_SITE_URL` – Your production domain (e.g. `https://craftedbathrooms.com`). Use a custom domain for a professional appearance; omit to use the default workers.dev URL.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Any other required variables

### 4. Deploy

```powershell
npm run deploy
```

Your site will be available at: `https://crafted-bathrooms-website.xiey-inc.workers.dev`

---

## Configuration Files

### `wrangler.toml`
Main Cloudflare Workers configuration file:
- **name**: Worker name (`crafted-bathrooms-website`)
- **main**: Entry point (`.open-next/worker.js`)
- **compatibility_date**: Minimum Workers runtime version
- **compatibility_flags**: Required flags (`nodejs_compat`, `global_fetch_strictly_public`)
- **assets**: Static assets configuration
- **services**: Self-reference for internal routing
- **images**: Image optimization binding

### `open-next.config.ts`
OpenNext-specific configuration (optional overrides).

### `.dev.vars`
Local development environment variables (not committed to Git).

---

## Development Workflow

### Local Development (Standard Next.js)

```powershell
npm run dev
```

Uses standard Next.js dev server with Turbopack. No OpenNext interference during development.

### Preview Workers Build Locally

```powershell
npm run preview
```

Builds and runs the app locally using Cloudflare Workers runtime. Useful for testing before deployment.

### Build Only (No Deploy)

```powershell
npm run build:cloudflare
```

Builds the app for Cloudflare without deploying. Output is in `.open-next/` directory.

---

## Updating the Live Site

1. Make your changes
2. Test locally: `npm run dev`
3. Preview Workers build: `npm run preview`
4. Deploy: `npm run deploy`

Or use gradual deployments:

```powershell
npm run upload
```

This creates a new version without immediately switching traffic (useful for testing).

---

## Before Each Deploy (Checklist)

- [ ] `npm run build:cloudflare` passes locally
- [ ] `npm run preview` works correctly
- [ ] Any new page with `params` / `searchParams` uses `Promise<…>` and `await`
- [ ] **No `export const runtime = 'edge'`** - OpenNext does not support edge runtime
- [ ] Any new Supabase query that errors with "never" has a type assertion
- [ ] Any new assets use hyphenated paths (e.g. `hero-assets/`), no spaces
- [ ] `images.unoptimized` is still `true` in `next.config.js` (required for Cloudflare)
- [ ] Environment variables are set in Cloudflare Dashboard

---

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Clear `.next` and `.open-next` directories: `rm -rf .next .open-next`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Deployment Fails

- Verify authentication: `npx wrangler whoami`
- Check `wrangler.toml` configuration
- Review Cloudflare Dashboard for error logs

### Runtime Errors

- Check compatibility flags in `wrangler.toml`
- Verify environment variables are set
- Check Worker logs in Cloudflare Dashboard

---

## Custom Domain

To use a custom domain for a professional appearance (hides workers.dev in metadata and inspect view):

1. Go to Cloudflare Dashboard → **Workers & Pages** → **crafted-bathrooms-website**
2. Navigate to **Settings** → **Triggers**
3. Add a custom domain under **Routes**
4. Set `NEXT_PUBLIC_SITE_URL` to your domain (e.g. `https://craftedbathrooms.com`) in GitHub Secrets (for CI) or Cloudflare Variables (for manual deploy)

---

## Advanced: R2 Incremental Cache

To enable R2 for Next.js incremental cache:

1. Create an R2 bucket in Cloudflare Dashboard
2. Uncomment the `[[r2_buckets]]` section in `wrangler.toml`
3. Replace `<<BUCKET_NAME>>` with your bucket name
4. Uncomment the R2 incremental cache import in `open-next.config.ts`

---

## Notes

- **OpenNext is designed for Cloudflare Workers**, not Pages
- Workers provide full Next.js feature support (SSR, dynamic routes, API routes)
- The Worker name (`crafted-bathrooms-website`) matches the existing Worker in your Cloudflare account
- All deployments update the existing Worker, preserving your domain and configuration
