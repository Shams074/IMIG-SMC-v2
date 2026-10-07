-- Run this in your Supabase SQL Editor
-- This adds the category column to team_members

ALTER TABLE public.team_members
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Directors';
