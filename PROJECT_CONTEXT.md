# Project Context - Crafted Bathrooms Website

## Project Overview

**Crafted Bathrooms** is a luxury bathroom fittings ecommerce website built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. The website showcases bathroom products, completed projects, showrooms, and provides a quote-based ordering system for different user types (guest, registered, trade, wholesale).

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.4.19
- **Deployment:** OpenNext Cloudflare adapter (`@opennextjs/cloudflare`)
- **Forms:** React Hook Form 7.69.0 + Zod 4.3.4
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Authentication:** Supabase Auth
- **Icons:** Lucide React 0.562.0 (tree-shaking optimized)

## Architecture Decisions

### Server-Side Rendering
- All pages use Next.js App Router with Server Components by default
- Supabase client is created server-side using `createClient()` from `@/lib/supabase/server`
- Data fetching happens at the page level before rendering

### Database Integration
- Supabase is used for all dynamic content:
  - **Projects:** Featured projects on homepage, project listings, individual project pages
  - **FAQs:** FAQ page content
  - **Showrooms:** Showroom directory and contact form integration
  - **Contact Submissions:** Contact form data storage
- Database schema includes tables for products, categories, brands, pricing tiers, cart items, quotes, bookings, and user profiles (though some are not actively used in current pages)

### Component Structure
- Components are organized by feature/domain (layout, hero, projects, forms, etc.)
- UI components are in `components/ui/` with a barrel export via `index.ts`
- Layout components (Header, Footer) are client components for interactivity
- Most page components are Server Components

### Design System
- **Primary Font:** Gilroy (sans-serif) - used for body text and UI
- **Secondary Font:** Rexton (serif) - used for elegant headings
- **Primary Color:** `#302620` (dark brown/charcoal)
- **Accent Color:** `#bea98e` (beige/taupe)
- **Background:** Pure white (`#ffffff`)
- Custom spacing scale with generous section spacing (160px, 120px, 80px, 60px)
- Content width system: max 1440px (luxury, spacious design)

## Deployment & compatibility

When adding or changing pages, Supabase usage, or static assets, follow **DEPLOYMENT_AND_DEVELOPMENT_NOTES.md**. It documents patterns that keep the app building and deploying correctly (e.g. Next.js 15/16 async params/searchParams, Supabase type assertions, Edge runtime for Cloudflare, asset path rules). Cloudflare setup steps are in **CLOUDFLARE_DEPLOY.md**.

## Database Schema

### Active Tables (Currently Used)
- **projects:** Project portfolio data (title, slug, description, images, category, location, featured status)
- **faqs:** FAQ content (question, answer, category, order_index)
- **showrooms:** Showroom locations and contact information
- **contact_submissions:** Contact form submissions

### Defined But Not Actively Used
- **categories:** Product categories (hierarchical)
- **brands:** Product brands/manufacturers
- **products:** Product catalog (5000-8000 SKUs capacity)
- **user_profiles:** Extended user information
- **pricing_tiers:** Dynamic pricing by user type
- **cart_items:** Shopping cart items
- **quotes:** Quote requests
- **bookings:** Showroom visit bookings

### Database Functions
- `get_product_price(product_id, user_id)` - Get price based on user type
- `calculate_cart_total(user_id, session_id)` - Calculate cart total
- `get_user_type(user_uuid)` - Get user's type
- `handle_new_user()` - Auto-create profile on signup

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data (cart, quotes, bookings)
- Product pricing filtered based on user type
- Public data (products, categories, brands) viewable by everyone

## Key Features

### Pages
1. **Homepage (`app/page.tsx`):**
   - Hero section with carousel
   - Shop Online section (4 categories: Taps, Showers, Baths, Basins)
   - Services cards (Expert Consultation, Visit Showrooms, Portfolio)
   - Featured brands section
   - Featured projects (fetched from Supabase `projects` table)

2. **Projects (`app/projects/page.tsx`):**
   - Lists all published projects from database
   - Project detail pages (`app/projects/[slug]/page.tsx`)

3. **Showrooms (`app/showrooms/page.tsx`):**
   - Lists all active showrooms from database

4. **FAQ (`app/faq/page.tsx`):**
   - Displays FAQs grouped by category from database

5. **Contact (`app/contact/page.tsx`):**
   - Contact form that submits to `contact_submissions` table
   - Can be linked to specific showrooms via query parameter

6. **About (`app/about/page.tsx`):**
   - About page (content structure exists)

7. **Services (`app/services/page.tsx`):**
   - Services page (content structure exists)

### Components

#### Layout
- **Header (`components/layout/Header.tsx`):** Client component with mobile menu, navigation links
- **Footer (`components/layout/Footer.tsx`):** Footer with links and contact info

#### UI Components (`components/ui/`)
- Button, Input, Textarea, Select, Checkbox, Radio, Modal, Card, Logo
- All exported via `index.ts` barrel export

#### Feature Components
- **HeroSection:** Homepage hero with carousel
- **ShopCard:** Shop category cards
- **BrandSlider:** Brand showcase slider
- **ProjectCard/ProjectGrid:** Project display components
- **ShowroomCard:** Showroom display card
- **FAQItem:** FAQ accordion item
- **ContactForm:** Contact form with Supabase integration

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── projects/          # Projects pages
│   │   ├── page.tsx       # Projects listing
│   │   └── [slug]/        # Individual project pages
│   ├── services/          # Services page
│   └── showrooms/         # Showrooms page
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── ui/                # Reusable UI components
│   ├── hero/              # Hero section
│   ├── shop/              # Shop components
│   ├── brands/            # Brand components
│   ├── projects/          # Project components
│   ├── showrooms/         # Showroom components
│   ├── faq/               # FAQ components
│   └── forms/             # Form components
├── lib/                   # Utilities and services
│   ├── supabase/          # Supabase client configuration
│   │   ├── client.ts      # Client-side Supabase client
│   │   ├── server.ts      # Server-side Supabase client
│   │   ├── middleware.ts  # Middleware for session management
│   │   └── types.ts       # Database TypeScript types
│   ├── services/          # Business logic services (empty)
│   └── utils.ts           # Utility functions (cn helper)
├── hooks/                 # Custom React hooks (empty)
├── public/                # Static assets
│   └── assets/            # Images, fonts, PDFs
├── supabase/              # Database migrations
│   ├── migrations/        # SQL migration files
│   └── seed.sql           # Sample data
├── middleware.ts          # Next.js middleware
└── tailwind.config.ts     # Tailwind configuration
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Important Notes

### Current State
- **Database:** Connected to Supabase but minimal data stored (only homepage has some data, rest is in local files)
- **E-commerce Features:** Product catalog, cart, quotes, bookings tables exist but are not actively used in current pages
- **Authentication:** Supabase Auth is configured but not actively used in current pages
- **Pricing System:** Dynamic pricing tiers are defined but not implemented in UI

### Design Philosophy
- **Minimalistic:** Clean, simple design
- **Luxury:** Premium feel without exaggeration
- **Modern:** Contemporary aesthetic
- **White Background:** Pure white background as base
- **Elegant Color Palette:** Dark brown primary with beige accents
- **Generous Spacing:** Large section spacing for luxury feel

### Development Notes
- All Supabase queries use TypeScript types from `lib/supabase/types.ts`
- Server Components are used by default for better performance
- Client Components are only used when interactivity is needed (forms, menus, etc.)
- Contact form writes directly to `contact_submissions` table
- Projects, FAQs, and Showrooms are fetched server-side on page load

### Future Considerations
- E-commerce functionality (products, cart, checkout) is scaffolded but not implemented
- User authentication and profiles are set up but not used in current pages
- Dynamic pricing system is defined but not integrated into UI
- Product catalog structure exists but products are not displayed

## Migration Files

Database migrations in `supabase/migrations/`:
1. `001_initial_schema.sql` - Creates all tables, indexes, triggers
2. `002_rls_policies.sql` - Configures Row Level Security policies
3. `003_functions_and_views.sql` - Helper functions for pricing and cart calculations
4. `004_remove_ecommerce_tables.sql` - Removes some ecommerce tables (if needed)
5. `005_update_rls_policies.sql` - Updates RLS policies

## Setup Instructions

1. Install dependencies: `npm install`
2. Create `.env.local` with Supabase credentials
3. Run database migrations in Supabase dashboard (in order: 001, 002, 003)
4. Start dev server: `npm run dev`

See `SETUP_GUIDE.md` and `supabase/README.md` for detailed setup instructions.
