-- Function to get product price based on user type
CREATE OR REPLACE FUNCTION get_product_price(
    p_product_id UUID,
    p_user_id UUID DEFAULT NULL
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    v_user_type user_type;
    v_price DECIMAL(10, 2);
    v_base_price DECIMAL(10, 2);
BEGIN
    -- Get base price
    SELECT base_price INTO v_base_price
    FROM products
    WHERE id = p_product_id;
    
    -- If no user, return base price (guest pricing)
    IF p_user_id IS NULL THEN
        SELECT COALESCE(
            (SELECT price FROM pricing_tiers 
             WHERE product_id = p_product_id 
             AND user_type = 'guest' 
             AND (valid_to IS NULL OR valid_to > NOW())
             ORDER BY valid_from DESC LIMIT 1),
            v_base_price
        ) INTO v_price;
        RETURN v_price;
    END IF;
    
    -- Get user type
    SELECT user_type INTO v_user_type
    FROM user_profiles
    WHERE id = p_user_id;
    
    -- If user type not found, default to registered
    IF v_user_type IS NULL THEN
        v_user_type := 'registered';
    END IF;
    
    -- Get price for user type (check in order: user_type, registered, guest, base)
    SELECT COALESCE(
        (SELECT price FROM pricing_tiers 
         WHERE product_id = p_product_id 
         AND user_type = v_user_type
         AND (valid_to IS NULL OR valid_to > NOW())
         ORDER BY valid_from DESC LIMIT 1),
        (SELECT price FROM pricing_tiers 
         WHERE product_id = p_product_id 
         AND user_type = 'registered'
         AND (valid_to IS NULL OR valid_to > NOW())
         ORDER BY valid_from DESC LIMIT 1),
        (SELECT price FROM pricing_tiers 
         WHERE product_id = p_product_id 
         AND user_type = 'guest'
         AND (valid_to IS NULL OR valid_to > NOW())
         ORDER BY valid_from DESC LIMIT 1),
        v_base_price
    ) INTO v_price;
    
    RETURN v_price;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate cart total
CREATE OR REPLACE FUNCTION calculate_cart_total(
    p_user_id UUID DEFAULT NULL,
    p_session_id VARCHAR(255) DEFAULT NULL
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    v_total DECIMAL(10, 2) := 0;
BEGIN
    SELECT COALESCE(SUM(price_at_added * quantity), 0)
    INTO v_total
    FROM cart_items
    WHERE (p_user_id IS NOT NULL AND user_id = p_user_id)
       OR (p_session_id IS NOT NULL AND session_id = p_session_id);
    
    RETURN v_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View for products with current pricing (for authenticated users)
CREATE OR REPLACE VIEW products_with_pricing AS
SELECT 
    p.*,
    pt.user_type,
    pt.price as tier_price,
    COALESCE(pt.price, p.base_price) as current_price
FROM products p
LEFT JOIN pricing_tiers pt ON pt.product_id = p.id
WHERE p.is_active = true
  AND (pt.valid_to IS NULL OR pt.valid_to > NOW())
  AND pt.valid_from <= NOW();

-- Function to sync user profile on auth user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, user_type)
    VALUES (NEW.id, NEW.email, 'registered');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
-- Drop trigger if it exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

