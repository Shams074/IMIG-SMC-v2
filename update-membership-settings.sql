-- Run this in your Supabase SQL Editor
-- This adds the new specific membership role columns to the membership_settings table

ALTER TABLE public.membership_settings
ADD COLUMN IF NOT EXISTS student_is_open BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS student_form_url TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS core_is_open BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS core_form_url TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS ambassador_is_open BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS ambassador_form_url TEXT DEFAULT '';
