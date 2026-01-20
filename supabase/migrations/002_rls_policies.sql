-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE showrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CATEGORIES POLICIES
-- ============================================
-- Everyone can read categories
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    USING (true);

-- Only authenticated users with admin role can modify (to be configured later)
-- For now, we'll allow service role to manage

-- ============================================
-- BRANDS POLICIES
-- ============================================
-- Everyone can read brands
CREATE POLICY "Brands are viewable by everyone"
    ON brands FOR SELECT
    USING (true);

-- ============================================
-- PRODUCTS POLICIES
-- ============================================
-- Everyone can read active products
CREATE POLICY "Active products are viewable by everyone"
    ON products FOR SELECT
    USING (is_active = true);

-- Authenticated users can see all products (including inactive)
CREATE POLICY "All products are viewable by authenticated users"
    ON products FOR SELECT
    USING (auth.role() = 'authenticated');

-- ============================================
-- USER PROFILES POLICIES
-- ============================================
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile (on registration)
CREATE POLICY "Users can insert own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================
-- PRICING TIERS POLICIES
-- ============================================
-- Function to get user type from profile
CREATE OR REPLACE FUNCTION get_user_type(user_uuid UUID)
RETURNS user_type AS $$
    SELECT user_type FROM user_profiles WHERE id = user_uuid;
$$ LANGUAGE sql SECURITY DEFINER;

-- Everyone can see pricing for guest/public users
CREATE POLICY "Public pricing is viewable by everyone"
    ON pricing_tiers FOR SELECT
    USING (user_type = 'guest');

-- Authenticated users can see pricing for their user type
CREATE POLICY "Users can view pricing for their type"
    ON pricing_tiers FOR SELECT
    USING (
        auth.uid() IS NOT NULL AND
        (
            user_type = 'registered' OR
            user_type = get_user_type(auth.uid())
        )
    );

-- Trade users can see trade pricing
CREATE POLICY "Trade users can view trade pricing"
    ON pricing_tiers FOR SELECT
    USING (
        auth.uid() IS NOT NULL AND
        get_user_type(auth.uid()) = 'trade' AND
        user_type IN ('trade', 'registered', 'guest')
    );

-- Wholesale users can see wholesale pricing
CREATE POLICY "Wholesale users can view wholesale pricing"
    ON pricing_tiers FOR SELECT
    USING (
        auth.uid() IS NOT NULL AND
        get_user_type(auth.uid()) = 'wholesale' AND
        user_type IN ('wholesale', 'trade', 'registered', 'guest')
    );

-- ============================================
-- SHOWROOMS POLICIES
-- ============================================
-- Everyone can view active showrooms
CREATE POLICY "Active showrooms are viewable by everyone"
    ON showrooms FOR SELECT
    USING (is_active = true);

-- ============================================
-- CART ITEMS POLICIES
-- ============================================
-- Users can view their own cart items
CREATE POLICY "Users can view own cart items"
    ON cart_items FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert own cart items"
    ON cart_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update own cart items"
    ON cart_items FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete own cart items"
    ON cart_items FOR DELETE
    USING (auth.uid() = user_id);

-- Guest users can manage cart via session_id (handled in application layer)
-- Note: RLS for session-based carts should be handled carefully
-- For now, we'll allow inserts with session_id (application should validate)

-- ============================================
-- QUOTES POLICIES
-- ============================================
-- Users can view their own quotes
CREATE POLICY "Users can view own quotes"
    ON quotes FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create quotes for themselves
CREATE POLICY "Users can create own quotes"
    ON quotes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own quotes (limited fields)
CREATE POLICY "Users can update own quotes"
    ON quotes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- BOOKINGS POLICIES
-- ============================================
-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
    ON bookings FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings"
    ON bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings"
    ON bookings FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can cancel their own bookings
CREATE POLICY "Users can cancel own bookings"
    ON bookings FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending')
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================
-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact forms"
    ON contact_submissions FOR INSERT
    WITH CHECK (true);

-- Users can view their own submissions (if we add user_id later)
-- For now, contact submissions are admin-only for viewing
-- This can be extended later if needed

