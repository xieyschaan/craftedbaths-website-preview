-- Migration: Remove e-commerce tables and add informational website tables
-- This migration transforms the database from e-commerce to informational website

-- ============================================
-- STEP 1: Drop RLS Policies for tables we're removing
-- ============================================

-- Drop policies for e-commerce tables
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Brands are viewable by everyone" ON brands;
DROP POLICY IF EXISTS "Active products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "All products are viewable by authenticated users" ON products;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Pricing tiers are viewable by everyone" ON pricing_tiers;
DROP POLICY IF EXISTS "Cart items are viewable by owner" ON cart_items;
DROP POLICY IF EXISTS "Users can manage own cart items" ON cart_items;
DROP POLICY IF EXISTS "Quotes are viewable by owner" ON quotes;
DROP POLICY IF EXISTS "Users can create quotes" ON quotes;
DROP POLICY IF EXISTS "Bookings are viewable by owner" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;

-- ============================================
-- STEP 2: Drop indexes for tables we're removing
-- ============================================

DROP INDEX IF EXISTS idx_products_category_id;
DROP INDEX IF EXISTS idx_products_brand_id;
DROP INDEX IF EXISTS idx_products_sku;
DROP INDEX IF EXISTS idx_products_is_active;
DROP INDEX IF EXISTS idx_products_material;
DROP INDEX IF EXISTS idx_products_finish;
DROP INDEX IF EXISTS idx_products_style;
DROP INDEX IF EXISTS idx_products_base_price;
DROP INDEX IF EXISTS idx_categories_slug;
DROP INDEX IF EXISTS idx_categories_parent_id;
DROP INDEX IF EXISTS idx_brands_slug;
DROP INDEX IF EXISTS idx_pricing_tiers_product_id;
DROP INDEX IF EXISTS idx_pricing_tiers_user_type;
DROP INDEX IF EXISTS idx_pricing_tiers_valid_dates;
DROP INDEX IF EXISTS idx_cart_items_user_id;
DROP INDEX IF EXISTS idx_cart_items_session_id;
DROP INDEX IF EXISTS idx_cart_items_product_id;
DROP INDEX IF EXISTS idx_quotes_user_id;
DROP INDEX IF EXISTS idx_quotes_showroom_id;
DROP INDEX IF EXISTS idx_quotes_status;
DROP INDEX IF EXISTS idx_bookings_user_id;
DROP INDEX IF EXISTS idx_bookings_showroom_id;
DROP INDEX IF EXISTS idx_bookings_date;
DROP INDEX IF EXISTS idx_bookings_status;

-- ============================================
-- STEP 3: Drop triggers for tables we're removing
-- ============================================

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_brands_updated_at ON brands;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_pricing_tiers_updated_at ON pricing_tiers;
DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;

-- ============================================
-- STEP 4: Drop e-commerce tables (in correct order due to foreign keys)
-- ============================================

DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS pricing_tiers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- ============================================
-- STEP 5: Drop unused enum types
-- ============================================

DROP TYPE IF EXISTS user_type CASCADE;
DROP TYPE IF EXISTS quote_status CASCADE;
DROP TYPE IF EXISTS booking_status CASCADE;

-- ============================================
-- STEP 6: Modify contact_submissions table
-- ============================================

-- Remove product_id foreign key constraint and column
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_product_id_fkey;
ALTER TABLE contact_submissions DROP COLUMN IF EXISTS product_id;

-- Keep showroom_id as it might be useful for informational site
-- Update form_type to remove 'product' option (keep 'general', 'trade', 'showroom')
-- Note: We'll keep the column as-is, but form_type values will be managed in application code

-- ============================================
-- STEP 7: Create new tables for informational website
-- ============================================

-- Projects table (portfolio/projects showcase)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    images TEXT[] DEFAULT '{}',
    featured_image TEXT,
    category VARCHAR(100),
    location VARCHAR(255),
    completed_date DATE,
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 8: Create indexes for new tables
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_published ON faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_order_index ON faqs(order_index);

-- ============================================
-- STEP 9: Add updated_at triggers for new tables
-- ============================================

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 10: Enable RLS on new tables
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 11: Create RLS policies for new tables
-- ============================================

-- Projects: Everyone can view published projects
CREATE POLICY "Published projects are viewable by everyone"
    ON projects FOR SELECT
    USING (is_published = true);

-- FAQs: Everyone can view published FAQs
CREATE POLICY "Published FAQs are viewable by everyone"
    ON faqs FOR SELECT
    USING (is_published = true);

-- Note: Insert/Update/Delete policies will be added in a separate migration
-- if admin functionality is needed later
