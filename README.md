# Crafted Bathrooms Website

A luxury bathroom fittings ecommerce website built with Next.js 16, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.4.19
- **Forms:** React Hook Form + Zod
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React
- **Deployment:** OpenNext Cloudflare adapter

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the project root with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docs

- **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md** – Patterns for Next.js 15/16, Supabase typings, Edge runtime, and asset paths so build and Cloudflare deploy keep working.
- **CLOUDFLARE_DEPLOY.md** – Step-by-step Cloudflare Pages deploy via GitHub.
- **PROJECT_CONTEXT.md** – Architecture, stack, and project overview.

## Pre-push / pre-deploy checklist

Before `git push` (or before triggering a Cloudflare deploy), run `npm run build` and confirm:

- [ ] **New page with `params`?** – Typed as `Promise<{ ... }>`, and you `await params` before use.
- [ ] **New page with `searchParams`?** – Typed as `Promise<{ ... }>`, and you `await searchParams` before use.
- [ ] **New dynamic route** (Supabase/cookies)? – Do NOT add `export const runtime = 'edge'` (OpenNext doesn't support it).
- [ ] **New Supabase** `.single()` / `.insert()`? – No “never” type errors; add a type assertion if needed.
- [ ] **New assets** under `public/`? – Folder and file names use **hyphens** (e.g. `hero-assets/`), no spaces.
- [ ] **New `/assets/...` references in code?** – Path matches the actual path on disk.
- [ ] **`next.config.js` changes?** – `images.unoptimized` is still `true` if you deploy to Cloudflare Pages.
- [ ] **New Cloudflare project or env?** – `nodejs_compat` is set (Settings → Functions) for Production (and Preview if used).

Full table and examples: **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md** §7.

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utilities and services
│   ├── supabase/          # Supabase client configuration
│   └── services/          # Business logic services
├── hooks/                  # Custom React hooks
└── public/                 # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Product catalog and project showcase
- Quote-based inquiry system
- Showroom directory and contact forms
- Responsive design with luxury aesthetic
- Server-side rendering with Supabase integration
