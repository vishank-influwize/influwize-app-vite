/*
  # Create recent searches table

  1. New Tables
    - `recent_searches`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `query` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `recent_searches` table
    - Add policy for authenticated users to read their own searches
    - Add policy for authenticated users to insert their own searches
*/

CREATE TABLE IF NOT EXISTS recent_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  query text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recent_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own searches"
  ON recent_searches
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches"
  ON recent_searches
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
