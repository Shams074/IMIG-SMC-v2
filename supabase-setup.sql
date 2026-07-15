-- ==========================================================
-- IMIG SMC COMPLETE DATABASE SCHEMA SETUP
-- Run this script in the Supabase SQL Editor (https://supabase.com)
-- ==========================================================

-- 1. PROFILES TABLE
-- Stores profile information for registered users and administrators
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text default 'visitor' check (role in ('admin', 'member', 'visitor')),
  year_of_study text,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security (RLS) for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone" 
  on public.profiles for select 
  using (true);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Admins can manage all profiles" 
  on public.profiles for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Automatically create a profile when a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'visitor' -- default role for newly signed up users
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. BLOGS TABLE
-- Stores blog posts authored by administrators or members
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  cover_image_url text,
  author_id uuid references public.profiles(id) on delete set null,
  published boolean default false not null,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS for blogs
alter table public.blogs enable row level security;

-- Policies for blogs
create policy "Anyone can read published blogs" 
  on public.blogs for select 
  using (published = true);

create policy "Admins can manage blogs" 
  on public.blogs for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 3. EVENTS TABLE
-- Stores info about workshops, webinars, and other events
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date timestamp with time zone,
  venue text,
  banner_url text,
  registration_link text,
  max_seats integer,
  is_active boolean default true not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS for events
alter table public.events enable row level security;

-- Policies for events
create policy "Anyone can view active events" 
  on public.events for select 
  using (is_active = true);

create policy "Admins can manage events" 
  on public.events for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 4. TEAM MEMBERS TABLE
-- Stores members of the executive committee and departments
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  photo_url text,
  bio text,
  linkedin_url text,
  display_order integer default 0 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS for team members
alter table public.team_members enable row level security;

-- Policies for team members
create policy "Anyone can view active team members" 
  on public.team_members for select 
  using (is_active = true);

create policy "Admins can manage team members" 
  on public.team_members for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 5. MEMBERSHIP SETTINGS
-- Stores settings for controlling site-wide registration visibility
create table if not exists public.membership_settings (
  id uuid default gen_random_uuid() primary key,
  is_open boolean default false not null,
  title text default 'Membership Applications Open!',
  description text default 'Applications are now open for IMIG SMC membership. Fill out the form below to join.',
  form_url text,
  deadline text,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.membership_settings enable row level security;

-- Policies for membership settings
create policy "Anyone can view membership settings"
  on public.membership_settings for select 
  using (true);

create policy "Admins can manage membership settings"
  on public.membership_settings for all 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Insert default settings row
insert into public.membership_settings (is_open, title, description, form_url, deadline)
values (false, 'Membership Applications Open!', 'Applications are now open for IMIG SMC membership. Click below to register.', '', '')
on conflict do nothing;


-- 6. MEMBERSHIP REGISTRATIONS
-- Stores user applications for membership
create table if not exists public.membership_registrations (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  year_of_study text,
  department text,
  reason text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.membership_registrations enable row level security;

-- Policies for registrations
create policy "Anyone can submit membership applications"
  on public.membership_registrations for insert
  with check (true);

create policy "Admins can view registrations"
  on public.membership_registrations for select
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update registrations"
  on public.membership_registrations for update
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 7. INSTAGRAM POSTS
-- Stores manual links to screenshots of latest Instagram posts
create table if not exists public.instagram_posts (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,        -- Cloudinary URL
  caption text,
  post_url text,                  -- Instagram link
  posted_at timestamp with time zone default now(),
  is_active boolean default true not null,
  display_order integer default 0 not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.instagram_posts enable row level security;

-- Policies for instagram posts
create policy "Anyone can view active posts"
  on public.instagram_posts for select
  using (is_active = true);

create policy "Admins can manage instagram posts"
  on public.instagram_posts for all
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 8. SITE SETTINGS
-- Stores miscellaneous global configurations
create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Policies for site settings
create policy "Anyone can view site settings"
  on public.site_settings for select 
  using (true);

create policy "Admins can manage site settings"
  on public.site_settings for all
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Insert default site settings
insert into public.site_settings (key, value) values
  ('membership_open', 'true'),
  ('membership_form_url', ''),
  ('contact_email', 'imigsmc@gmail.com'),
  ('instagram_handle', 'imig.smc'),
  ('announcement', '')
on conflict (key) do nothing;
