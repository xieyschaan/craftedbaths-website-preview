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

