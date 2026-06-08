-- ============================================
-- Run this in Supabase SQL Editor
-- New tables for: Membership Forms + Instagram Posts
-- ============================================

-- MEMBERSHIP REGISTRATIONS
-- Stores member registration submissions shown on website
create table if not exists public.membership_registrations (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  year_of_study text,
  department text,
  reason text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now()
);

alter table public.membership_registrations enable row level security;

-- Anyone can submit a registration
create policy "Anyone can submit membership"
  on public.membership_registrations for insert
  with check (true);

-- Only admin can view all registrations
create policy "Admins can view registrations"
  on public.membership_registrations for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Only admin can update status
create policy "Admins can update registrations"
  on public.membership_registrations for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- INSTAGRAM POSTS
-- Admin manually adds latest Instagram posts
create table if not exists public.instagram_posts (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,        -- Cloudinary URL of screenshot/image
  caption text,
  post_url text,                  -- Link to actual Instagram post
  posted_at timestamp with time zone default now(),
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.instagram_posts enable row level security;

-- Public can view active posts
create policy "Active posts viewable by all"
  on public.instagram_posts for select
  using (is_active = true);

-- Only admin can manage posts
create policy "Admins manage instagram posts"
  on public.instagram_posts for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- SITE SETTINGS
-- Admin can control global site content
create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone default now()
);

alter table public.site_settings enable row level security;

create policy "Settings viewable by all"
  on public.site_settings for select using (true);

create policy "Admins manage settings"
  on public.site_settings for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Default settings
insert into public.site_settings (key, value) values
  ('membership_open', 'true'),
  ('membership_form_url', ''),
  ('contact_email', 'imigsmc@gmail.com'),
  ('instagram_handle', 'imig.smc'),
  ('announcement', '')
on conflict (key) do nothing;
