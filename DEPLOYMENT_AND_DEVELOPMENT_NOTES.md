# Deployment & Development Notes

This document records fixes and patterns from the Cloudflare Workers deployment. **Follow these when adding or changing code** so the same issues do not resurface.

---

## 1. Next.js 15/16: `params` and `searchParams` are Promises

In Next.js 15+, `params` and `searchParams` in page components are **Promises** and must be awaited.

**Pattern for dynamic routes (`app/[slug]/page.tsx` or similar):**

```ts
interface PageProps {
  params: Promise<{ slug: string }>  // not { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params  // await before use
  // use slug...
}
```

**Pattern for pages using `searchParams` (e.g. `app/contact/page.tsx`):**

```ts
interface PageProps {
  searchParams: Promise<{ showroom?: string }>  // not a plain object
}

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams  // await before use
  if (resolved.showroom) { /* ... */ }
}
```

**When to apply:** Any new `app/**/page.tsx` that uses `params` or `searchParams`.

---

## 2. Supabase: Type assertions for queries

Supabase client types sometimes infer as `never` in strict builds, which breaks `npm run build` and Cloudflare.

**Pattern for `.single()` / `.select()`:**

```ts
const { data, error } = await supabase
  .from('showrooms')
  .select('id, name')
  .eq('id', id)
  .single()

const row = data as { id: string; name: string } | null
if (row) {
  // use row.id, row.name
}
```

**Pattern for `.insert()` (e.g. in client components):**

```ts
// If TypeScript errors with "never", use a type assertion on the client:
const { error } = await (supabase as any)
  .from('contact_submissions')
  .insert({ form_type, name, email, ... })
```

**When to apply:** Any Supabase `.single()`, `.select()` used in type-sensitive places, or `.insert()` that reports “Argument of type X is not assignable to parameter of type 'never'”.

---

## 3. Edge runtime for Cloudflare (dynamic routes)

**IMPORTANT:** This project now uses **OpenNext** (`@opennextjs/cloudflare`), not `@cloudflare/next-on-pages`.

**Do NOT use `export const runtime = 'edge'`** - OpenNext does not support edge runtime. All pages run on the Node.js-compatible runtime with `nodejs_compat` flag.

**Current status:**
- All pages are configured for OpenNext (no edge runtime declarations)
- Dynamic pages (homepage, contact, project detail) work without edge runtime
- Static pages are properly pre-rendered

**When to apply:** When adding new dynamic routes, do NOT add `export const runtime = 'edge'`. OpenNext handles routing automatically.

---

## 4. Asset paths: no spaces, use hyphens

Paths under `public/assets/` are used in code and must work on Cloudflare static hosting. **Spaces and special characters in folder or file names** led to 404s in production.

**Rules:**

- Use **hyphens** in folder and file names where possible: `hero-assets`, `shop-online`.
- Logo files use spaces in names: `Logo SVG-Black.svg`, `Logo + Tagline-SVG-Black.svg`.
- Reference them in code exactly as on disk: `/assets/hero-assets/...`, `/assets/logo/Logo SVG-Black.svg`, `/assets/shop-online/...`.

**Current layout:**

- `public/assets/hero-assets/` – hero images
- `public/assets/shop-online/` – shop category images
- `public/assets/logo/` – logo SVGs and tagline PNG
- `public/assets/fonts/` – Gilroy, Rexton (no spaces)

**When to apply:** Whenever adding or renaming files/folders under `public/` or new references in components.

---

## 5. Images: unoptimized on Cloudflare

`next.config.js` has `images: { unoptimized: true }` because Cloudflare Workers does not run the Node-based Next.js image optimizer.

**Consequences:**

- No `/_next/image` optimization; images are served directly from `/assets/...`.
- Images can load more slowly than on Vercel or with a separate image CDN.

**Do not remove** `unoptimized: true` if you keep deploying to Cloudflare Workers with the current setup. If you move to Vercel or use an image CDN later, you can switch back to optimized images and adjust config.

---

## 6. Cloudflare-specific settings (dashboard)

These are configured in the Cloudflare project, not in the repo:

- **Compatibility flag:** In **Settings → Functions → Compatibility flags**, add `nodejs_compat` for **Production** (and Preview if used). Required for OpenNext.
- **Build:** Framework preset **None** (or leave blank), build command: `npx opennextjs-cloudflare build`, output directory: `.open-next/assets`.
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Production (and Preview if needed).

See **CLOUDFLARE_DEPLOY.md** for step-by-step setup.

---

## 7. Development checklist (avoid recurring issues)

Before pushing changes that might affect build or production:

| Area | Check |
|------|--------|
| **New page with `params`** | Type as `Promise<{ ... }>` and `await params` before use. |
| **New page with `searchParams`** | Type as `Promise<{ ... }>` and `await searchParams` before use. |
| **New dynamic route** | Do NOT add `export const runtime = 'edge'` - OpenNext doesn't support it. |
| **New Supabase query** | If you see a “never” type error, add an explicit type or `as T` assertion. |
| **New asset (image/font)** | Put it under `public/assets/` with **hyphenated** names (no spaces). |
| **New reference to `/assets/...`** | Use the same path as on disk (e.g. `/assets/hero-assets/...`). |
| **Changing `next.config.js`** | Do not remove `images.unoptimized` while deploying to Cloudflare Workers. |
| **New Cloudflare deploy** | Ensure `nodejs_compat` is set for the right environment. |

Running `npm run build` locally is a quick way to catch TypeScript and build-time issues before deploy.

---

## 8. Where each fix lives in the repo

| Issue | Files / config |
|-------|-----------------|
| Params/searchParams async | `app/contact/page.tsx`, `app/projects/[slug]/page.tsx` |
| Supabase type assertions | `app/contact/page.tsx`, `app/projects/[slug]/page.tsx`, `components/forms/ContactForm.tsx` |
| OpenNext adapter | `package.json`, `wrangler.jsonc`, `open-next.config.ts`, `next.config.js` |
| Unoptimized images | `next.config.js` |
| Asset path rules | `public/assets/` structure; `components/hero/HeroSection.tsx`, `components/ui/Logo.tsx`, `app/page.tsx` |

For full deployment steps and repo/Cloudflare setup, use **CLOUDFLARE_DEPLOY.md**.
