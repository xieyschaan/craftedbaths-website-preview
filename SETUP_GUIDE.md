# Supabase Database Setup Guide

## Quick Start

### Step 1: Create Supabase Project

1. Visit [https://supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name:** `crafted-bathrooms-website`
   - **Database Password:** (create a strong password and save it)
   - **Region:** Choose closest to your users
4. Wait 2-3 minutes for project creation

### Step 2: Get API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Configure Environment Variables

1. Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Run Database Migrations

#### Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Run migrations in this order:

**Migration 1: Initial Schema**
- Open `supabase/migrations/001_initial_schema.sql`
- Copy all contents
- Paste into SQL Editor
- Click **"Run"**

**Migration 2: RLS Policies**
- Open `supabase/migrations/002_rls_policies.sql`
- Copy all contents
- Paste into SQL Editor
- Click **"Run"**

**Migration 3: Functions & Views**
- Open `supabase/migrations/003_functions_and_views.sql`
- Copy all contents
- Paste into SQL Editor
- Click **"Run"**

### Step 5: Verify Setup

1. Go to **Table Editor** → Verify these tables exist:
   - ✅ categories
   - ✅ brands
   - ✅ products
   - ✅ user_profiles
   - ✅ pricing_tiers
   - ✅ showrooms
   - ✅ cart_items
   - ✅ quotes
   - ✅ bookings
   - ✅ contact_submissions

2. Go to **Authentication** → **Policies** → Verify RLS is enabled

### Step 6: (Optional) Add Sample Data

1. Go to **SQL Editor**
2. Open `supabase/seed.sql`
3. Copy and paste contents
4. Click **"Run"**

## Database Schema Overview

### Core Tables

| Table | Purpose |
|-------|---------|
| `categories` | Product categories (hierarchical) |
| `brands` | Product brands/manufacturers |
| `products` | Product catalog (5000-8000 SKUs) |
| `user_profiles` | Extended user information |
| `pricing_tiers` | Dynamic pricing by user type |
| `showrooms` | Showroom locations |
| `cart_items` | Shopping cart items |
| `quotes` | Quote requests |
| `bookings` | Showroom visit bookings |
| `contact_submissions` | Contact form submissions |

### Security Features

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ Users can only access their own data
- ✅ Pricing filtered by user type
- ✅ Public data (products, categories) viewable by everyone

### Helper Functions

- `get_product_price(product_id, user_id)` - Get price based on user type
- `calculate_cart_total(user_id, session_id)` - Calculate cart total
- `get_user_type(user_uuid)` - Get user's type
- `handle_new_user()` - Auto-create profile on signup

## Next Steps

After database setup:
1. ✅ Test authentication flow
2. ✅ Add product data
3. ✅ Configure showrooms
4. ✅ Set up pricing tiers
5. ✅ Test cart functionality

## Troubleshooting

**Migration errors?**
- Ensure migrations run in order (001, 002, 003)
- Check SQL Editor for specific error messages
- Verify all extensions are enabled

**RLS blocking access?**
- Check user is authenticated
- Verify user profile exists
- Review policy conditions in migration 002

**Pricing not showing?**
- Verify `pricing_tiers` table has data
- Check user profile has correct `user_type`
- Test `get_product_price()` function in SQL Editor

## Support

For detailed information, see `supabase/README.md`

