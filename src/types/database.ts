export type UserRole = 'admin' | 'member' | 'visitor'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  year_of_study: string | null
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  cover_image_url: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  created_at: string
  author?: Profile
}

export interface Event {
  id: string
  title: string
  description: string | null
  date: string | null
  venue: string | null
  banner_url: string | null
  registration_link: string | null
  max_seats: number | null
  is_active: boolean
  created_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string | null
  name: string
  email: string
  registered_at: string
  event?: Event
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo_url: string | null
  bio: string | null
  linkedin_url: string | null
  display_order: number
  is_active: boolean
}

export interface Resource {
  id: string
  title: string
  description: string | null
  file_url: string | null
  category: string | null
  access_level: 'public' | 'member' | 'admin'
  created_at: string
}
