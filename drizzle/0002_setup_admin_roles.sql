-- Migration to ensure user roles are properly set up
-- This migration ensures that:
-- 1. The role column exists in the users table
-- 2. The role column has the correct enum type
-- 3. Default values are set correctly

-- Add role column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user' NOT NULL;

-- Ensure existing admin users have the correct role
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com' OR email = 'alice@example.com';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);