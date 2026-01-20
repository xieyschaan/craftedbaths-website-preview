# Supabase Database Setup

This directory contains database migrations and setup files for the Crafted Bathrooms website.

## Setup Instructions

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `crafted-bathrooms-website` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created (2-3 minutes)

### 2. Get Your Supabase Credentials

1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 3. Add Credentials to Your Project

1. Create a `.env.local` file in the project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Database Migrations

#### Option A: Using Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open each migration file in order:
   - `001_initial_schema.sql` - Creates all tables and indexes
   - `002_rls_policies.sql` - Sets up Row Level Security policies
   - `003_functions_and_views.sql` - Creates helper functions and views
4. Copy and paste each file's contents into the SQL Editor
5. Click "Run" to execute each migration

#### Option B: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. Verify that all tables are created:
   - categories
   - brands
   - products
   - user_profiles
   - pricing_tiers
   - showrooms
   - cart_items
   - quotes
   - bookings
   - contact_submissions

3. Check **Authentication** → **Policies** to verify RLS policies are active

### 6. (Optional) Seed Sample Data

If you want to add sample data for development:

1. Go to **SQL Editor** in Supabase dashboard
2. Copy and paste contents of `seed.sql`
3. Click "Run"

**Note:** The seed file contains placeholder data. Update it with your actual product data.

## Database Schema Overview

### Core Tables

- **categories** - Product categories (hierarchical)
- **brands** - Product brands/manufacturers
- **products** - Product catalog (5000-8000 SKUs)
- **user_profiles** - Extended user information
- **pricing_tiers** - Dynamic pricing by user type
- **showrooms** - Showroom locations
- **cart_items** - Shopping cart items
- **quotes** - Quote requests
- **bookings** - Showroom visit bookings
- **contact_submissions** - Contact form submissions

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only access their own data (cart, quotes, bookings)
- Product pricing is filtered based on user type
- Public data (products, categories, brands) is viewable by everyone

## Migration Files

1. **001_initial_schema.sql** - Creates all database tables, indexes, and triggers
2. **002_rls_policies.sql** - Configures Row Level Security policies
3. **003_functions_and_views.sql** - Helper functions for pricing and cart calculations

## Important Notes

- Always run migrations in order (001, 002, 003)
- RLS policies ensure data security - don't disable them
- The `handle_new_user()` function automatically creates user profiles on signup
- Pricing functions handle dynamic pricing based on user type
- Cart items support both authenticated users and guest sessions

## Troubleshooting

### Migration Errors

If you encounter errors:
1. Check that you're running migrations in order
2. Verify your Supabase project is active
3. Check the SQL Editor for specific error messages
4. Ensure all required extensions are enabled

### RLS Policy Issues

If users can't access their data:
1. Verify RLS is enabled on the table
2. Check that policies are correctly applied
3. Ensure user authentication is working
4. Review policy conditions in `002_rls_policies.sql`

### Pricing Not Showing

If pricing isn't displaying correctly:
1. Verify `pricing_tiers` table has data
2. Check user profile has correct `user_type`
3. Test the `get_product_price()` function in SQL Editor

