const SUPABASE_URL = "https://neitjdsnybgxdbtzcbsh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laXRqZHNueWJneGRidHpjYnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5OTYxNDksImV4cCI6MjEwMjU3MjE0OX0.Z1LB3_0BM1GnxF-KjPnngvjDN8emGjXBCW2XEWDaqJ8";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
