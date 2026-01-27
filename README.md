# Crafted Bathrooms Website

A luxury bathroom fittings ecommerce website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

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
- [ ] **New dynamic route** (Supabase/cookies)? – It has `export const runtime = 'edge'`.
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
├── store/                  # Zustand state stores
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Product catalog with advanced filtering
- Quote-based cart system
- Dynamic pricing for different user types
- Showroom booking system
- Authentication and user management
- Responsive design

## Version Control Test on Local Git (xiey)
