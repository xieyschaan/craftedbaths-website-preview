# Deploy to Cloudflare Pages via GitHub

Use this guide to deploy the Crafted Bathrooms site to Cloudflare Pages using the GitHub repo **craftedbaths-website-preview** and the Cloudflare project **craftedbaths-website-preview**.

**Before changing code or redeploying:** see **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md** for patterns that avoid recurring build/runtime issues (params & searchParams, Supabase typings, Edge runtime, asset paths, images).

---

## 1. Create the GitHub repository

1. Go to [github.com/new](https://github.com/new).
2. Set **Repository name** to: `craftedbaths-website-preview`
3. Choose **Public**.
4. Do **not** add a README, .gitignore, or license (the project already has these).
5. Click **Create repository**.

---

## 2. Push this project to GitHub

The project is already wired to use `origin` for **craftedbaths-website-preview**. Point it at your repo and push (replace `YOUR_USERNAME` with your GitHub username, or use your org name instead):

```powershell
cd "G:\Crafted Bathrooms Website"

git remote set-url origin https://github.com/YOUR_USERNAME/craftedbaths-website-preview.git
git branch -M main
git push -u origin main
```

After this, every `git push origin main` will update GitHub and (once Cloudflare is connected) trigger an automatic deploy.

---

## 3. Create the Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in.
2. In the left sidebar, open **Workers & Pages**.
3. Click **Create** → **Pages** → **Connect to Git**.
4. Choose **GitHub** and authorize Cloudflare if prompted.
5. Select the repository **craftedbaths-website-preview**.
6. Click **Begin setup**.

### If **craftedbaths-website-preview** is not in the repo list

Cloudflare can only see repos you’ve allowed for the Cloudflare Pages app. Fix it like this:

1. On the same Cloudflare “Select a repository” screen, click the link: **“configure repository access for the Cloudflare Pages app on GitHub”** (under the repo dropdown).
2. Or open GitHub → **Settings** → **Applications** → **Installed GitHub Apps** → **Cloudflare Pages** → **Configure**.
3. Under **Repository access**, choose **Only select repositories**.
4. Click **Select repositories** and add **craftedbaths-website-preview**.
5. Click **Save**.
6. Back in Cloudflare, refresh the page or open “Create project” again; **craftedbaths-website-preview** should appear. Select it and click **Begin setup**.

---

## 4. Configure the Pages project

Use these settings and the project name below.

| Setting | Value |
|--------|--------|
| **Project name** | `craftedbaths-website-preview` |
| **Production branch** | `main` |
| **Framework preset** | `Custom` |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | `.open-next` |
| **Root directory** | *(leave blank)* |

**Important:** The project now uses OpenNext for Cloudflare deployment. The build command runs `next build` first, then applies Cloudflare-specific transformations.

---

## 5. Environment variables (Supabase)

1. In the same setup flow, open **Environment variables**.
2. Add:

   - **Variable name:** `NEXT_PUBLIC_SUPABASE_URL`  
     **Value:** your Supabase project URL  

   - **Variable name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
     **Value:** your Supabase anon/public key  

3. Apply to **Production** (and **Preview** if you use branch previews).

---

## 6. Deploy

1. Click **Save and Deploy**.
2. Wait for the build to finish. The site will be at:
   - **Production:** `https://craftedbaths-website-preview.pages.dev`

---

## Updating the live site

From the project folder:

```powershell
git add -A
git commit -m "Your update message"
git push origin main
```

Cloudflare Pages will auto-build and deploy from the `main` branch.

---

## Before each deploy (checklist)

- [ ] `npm run build:cloudflare` passes locally.
- [ ] Any new page with `params` / `searchParams` uses `Promise<…>` and `await`.
- [ ] **No `export const runtime = 'edge'`** - OpenNext does not support edge runtime yet. Remove any edge runtime declarations.
- [ ] Any new Supabase query that errors with “never” has a type assertion.
- [ ] Any new assets use hyphenated paths (e.g. `hero-assets/`), no spaces.
- [ ] `images.unoptimized` is still `true` in `next.config.js` (for Cloudflare).
- [ ] Cloudflare project has `nodejs_compat` compatibility flag set (configured in `wrangler.jsonc`).

Full checklist and patterns: **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md** §7.

---

## Avoiding recurring issues

If a deploy fails or images/scripts break, use the checklist in **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md**. In particular:

- New pages with **`params` or `searchParams`** must use `Promise<…>` and `await`.
- **Remove `export const runtime = 'edge'`** from all pages - OpenNext does not support edge runtime.
- New **Supabase** `.single()` / `.insert()` may need explicit types or assertions if the build reports `never`.
- New **assets** under `public/`: use hyphenated paths (e.g. `hero-assets/`), no spaces.
- **Compatibility flags** (`nodejs_compat`, `global_fetch_strictly_public`) are configured in `wrangler.jsonc`.

---

## OpenNext Setup Notes

This project uses **OpenNext** (`@opennextjs/cloudflare`) for Cloudflare deployment, which is the recommended approach for Next.js apps on Cloudflare Workers/Pages.

### Local Development
- Run `npm run dev` for standard Next.js development (no OpenNext interference)
- CSS processing works normally with Turbopack

### Production Builds
- Run `npm run build:cloudflare` to build for Cloudflare
- This runs `next build` first, then applies OpenNext transformations
- Build output is in `.open-next/` directory

### Configuration Files
- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext-specific settings
- `.dev.vars` - Local development environment variables
- `public/_headers` - Static asset caching headers

### Testing Locally
- `npm run preview` - Builds and previews using Cloudflare Workers runtime locally
- `npm run deploy` - Builds and deploys directly to Cloudflare
