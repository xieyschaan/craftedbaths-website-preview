-- Seed data for development/testing
-- This file contains sample data to help with development

-- Insert sample categories
INSERT INTO categories (id, name, slug, description) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Taps & Faucets', 'taps-faucets', 'Bathroom taps and faucets'),
    ('00000000-0000-0000-0000-000000000002', 'Showers', 'showers', 'Shower systems and accessories'),
    ('00000000-0000-0000-0000-000000000003', 'Basins', 'basins', 'Bathroom basins and sinks'),
    ('00000000-0000-0000-0000-000000000004', 'Baths', 'baths', 'Bathroom baths and tubs'),
    ('00000000-0000-0000-0000-000000000005', 'Toilets', 'toilets', 'Toilets and WC suites')
ON CONFLICT DO NOTHING;

-- Insert sample brands
INSERT INTO brands (id, name, slug, description) VALUES
    ('00000000-0000-0000-0000-000000000101', 'Luxury Bath Co', 'luxury-bath-co', 'Premium bathroom fittings'),
    ('00000000-0000-0000-0000-000000000102', 'Modern Design', 'modern-design', 'Contemporary bathroom solutions'),
    ('00000000-0000-0000-0000-000000000103', 'Classic Elegance', 'classic-elegance', 'Traditional bathroom fixtures')
ON CONFLICT DO NOTHING;

-- Insert sample showrooms
INSERT INTO showrooms (id, name, address, city, phone, email, is_active) VALUES
    ('00000000-0000-0000-0000-000000000201', 'London Showroom', '123 High Street', 'London', '+44 20 1234 5678', 'london@craftedbathrooms.com', true),
    ('00000000-0000-0000-0000-000000000202', 'Manchester Showroom', '456 Main Road', 'Manchester', '+44 161 1234 5678', 'manchester@craftedbathrooms.com', true),
    ('00000000-0000-0000-0000-000000000203', 'Birmingham Showroom', '789 City Centre', 'Birmingham', '+44 121 1234 5678', 'birmingham@craftedbathrooms.com', true)
ON CONFLICT DO NOTHING;

-- Note: Sample products would be inserted here, but they require actual product data
-- This is a template for when you have product information

