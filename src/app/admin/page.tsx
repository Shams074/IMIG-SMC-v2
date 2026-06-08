import { createClient } from '@/lib/supabase/server'
import { Calendar, Newspaper, Users, BookOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [
    { count: blogsCount },
    { count: eventsCount },
    { count: teamCount },
    { data: recentBlogs },
    { data: upcomingEvents },
  ] = await Promise.all([
    supabase.from('blogs').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('team_members').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('blogs').select('id,title,published,created_at').order('created_at', { ascending: false }).limit(4),
    supabase.from('events').select('id,title,date,venue').gte('date', new Date().toISOString()).order('date').limit(3),
  ])

  const stats = [
    { label: 'Total Blogs',   value: blogsCount ?? 0,  icon: Newspaper, color: 'bg-blue-500',   href: '/admin/blogs' },
    { label: 'Active Events', value: eventsCount ?? 0, icon: Calendar,  color: 'bg-teal-500',   href: '/admin/events' },
    { label: 'Team Members',  value: teamCount ?? 0,   icon: Users,     color: 'bg-indigo-500', href: '/admin/team' },
    { label: 'Resources',     value: '—',              icon: BookOpen,  color: 'bg-violet-500', href: '/admin/resources' },
  ]

  const quickActions = [
    { label: 'New Blog Post',   icon: '✍️', href: '/admin/blogs/new' },
    { label: 'Create Event',    icon: '📅', href: '/admin/events/new' },
    { label: 'Add Team Member', icon: '👤', href: '/admin/team/new' },
  ]

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-sm text-blue-400">Welcome back — here is what is happening with IMIG SMC.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl border border-blue-100 p-5 hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={16} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-0.5">{value}</p>
            <p className="text-xs font-medium text-blue-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-blue-900 text-sm">Recent Blog Posts</h3>
            <Link href="/admin/blogs/new" className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium">
              <Plus size={12} /> New Post
            </Link>
          </div>
          {recentBlogs && recentBlogs.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {recentBlogs.map(blog => (
                <Link key={blog.id} href={`/admin/blogs/${blog.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 truncate">{blog.title}</p>
                    <p className="text-xs text-blue-400">{format(new Date(blog.created_at), 'MMM d, yyyy')}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${blog.published ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-600'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-blue-300 text-sm">
              No blog posts yet.{' '}
              <Link href="/admin/blogs/new" className="text-blue-500 hover:underline">Create the first one</Link>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-blue-100 p-6">
            <h3 className="font-semibold text-blue-900 text-sm mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              {quickActions.map(a => (
                <Link key={a.label} href={a.href} className="flex items-center gap-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-blue-800 transition-colors">
                  <span>{a.icon}</span>{a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-6">
            <h3 className="font-semibold text-blue-900 text-sm mb-4">Upcoming Events</h3>
            {upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="flex flex-col gap-3">
                {upcomingEvents.map(event => (
                  <Link key={event.id} href={`/admin/events/${event.id}`} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                      <strong className="text-[11px] font-bold leading-none">{format(new Date(event.date!), 'dd')}</strong>
                      <small className="text-[8px] uppercase">{format(new Date(event.date!), 'MMM')}</small>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-blue-900 truncate">{event.title}</p>
                      <p className="text-[11px] text-blue-400 truncate">{event.venue ?? 'Venue TBD'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-blue-300 text-center py-4">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
