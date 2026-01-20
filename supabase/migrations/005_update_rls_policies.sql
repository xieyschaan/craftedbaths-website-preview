-- Migration: Update RLS policies for informational website
-- This migration updates remaining policies and removes e-commerce references

-- ============================================
-- STEP 1: Update SHOWROOMS POLICIES (keep existing, already correct)
-- ============================================
-- Showrooms policies are already correct, no changes needed

-- ============================================
-- STEP 2: Update CONTACT SUBMISSIONS POLICIES
-- ============================================
-- Keep existing insert policy, it's already correct
-- Add a select policy for admin viewing (optional, can be added later if needed)

-- ============================================
-- STEP 3: Clean up function that references removed tables
-- ============================================

-- Drop the get_user_type function as it references user_profiles which we removed
DROP FUNCTION IF EXISTS get_user_type(UUID);

-- ============================================
-- STEP 4: Ensure RLS is enabled on remaining tables
-- ============================================

ALTER TABLE showrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
