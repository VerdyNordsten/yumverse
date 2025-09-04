-- Update user roles
ALTER TABLE users ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' NOT NULL;
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';