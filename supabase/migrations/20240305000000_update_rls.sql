-- Enable RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON donations;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON donations;

-- Create new policies
CREATE POLICY "Enable insert for everyone"
ON donations FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable read for admins"
ON donations FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);