-- Run this in Supabase SQL Editor

-- Membership Registration Settings (admin controls)
create table if not exists public.membership_settings (
  id uuid default gen_random_uuid() primary key,
  is_open boolean default false,
  title text default 'Membership Applications Open!',
  description text default 'Applications are now open for IMIG SMC membership. Fill out the form below to join.',
  form_url text,
  deadline text,
  updated_at timestamp with time zone default now()
);

-- Insert default settings row
insert into public.membership_settings (is_open, title, description, form_url, deadline)
values (false, 'Membership Applications Open!', 'Applications are now open for IMIG SMC membership. Click below to register.', '', '')
on conflict do nothing;

-- Enable RLS
alter table public.membership_settings enable row level security;

-- Public can read settings
create policy "Anyone can view membership settings"
  on public.membership_settings for select using (true);

-- Only admin can update
create policy "Admins can manage membership settings"
  on public.membership_settings for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
