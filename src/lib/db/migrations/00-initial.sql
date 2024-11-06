-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL,
    progress NUMERIC NOT NULL,
    goal INTEGER NOT NULL,
    raised INTEGER NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount INTEGER NOT NULL,
    project_id UUID REFERENCES projects(id),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    frequency TEXT NOT NULL DEFAULT 'once',
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    skills TEXT[],
    availability TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    encrypted_password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
DROP POLICY IF EXISTS "Projects can be inserted by authenticated users with admin role" ON projects;
DROP POLICY IF EXISTS "Projects can be updated by authenticated users with admin role" ON projects;
DROP POLICY IF EXISTS "Donations are viewable by admin users" ON donations;
DROP POLICY IF EXISTS "Donations can be inserted by anyone" ON donations;
DROP POLICY IF EXISTS "Volunteers are viewable by admin users" ON volunteers;
DROP POLICY IF EXISTS "Volunteers can be inserted by anyone" ON volunteers;
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Only admins can create new users" ON users;

-- Create policies for projects
CREATE POLICY "Public projects are viewable by everyone" 
ON projects FOR SELECT 
USING (true);

CREATE POLICY "Projects can be inserted by authenticated users with admin role" 
ON projects FOR INSERT 
WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

CREATE POLICY "Projects can be updated by authenticated users with admin role" 
ON projects FOR UPDATE 
USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Create policies for donations
CREATE POLICY "Public donations insert" 
ON donations FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Donations viewable by admin" 
ON donations FOR SELECT 
TO authenticated
USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Create policies for volunteers
CREATE POLICY "Public volunteers insert" 
ON volunteers FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Volunteers viewable by admin" 
ON volunteers FOR SELECT 
TO authenticated
USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);

-- Create policies for users
CREATE POLICY "Users view own data" 
ON users FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admin create users" 
ON users FOR INSERT 
TO authenticated
WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);