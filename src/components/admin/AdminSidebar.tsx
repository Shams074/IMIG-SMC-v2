'use client'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Calendar, BookOpen, Newspaper,
  Users, FileText, LogOut, ChevronRight, Instagram, UserCheck
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',      href: '/admin' },
  { icon: Newspaper,       label: 'Blogs',           href: '/admin/blogs' },
  { icon: Calendar,        label: 'Events',          href: '/admin/events' },
  { icon: Users,           label: 'Team',            href: '/admin/team' },
  { icon: Instagram,       label: 'Instagram Posts', href: '/admin/instagram' },
  { icon: UserCheck,       label: 'Registrations',   href: '/admin/registrations' },
  { icon: BookOpen,        label: 'Resources',       href: '/admin/resources' },
  { icon: FileText,        label: 'Members',         href: '/admin/members' },
]

interface Props {
  adminEmail: string
  adminName: string
}

export default function AdminSidebar({ adminEmail, adminName }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-60 bg-blue-900 min-h-screen flex flex-col py-6 flex-shrink-0 sticky top-0">
      {/* Logo */}
      <div className="px-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow">
            IM
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">IMIG SMC</p>
            <p className="text-blue-400 text-[10px]">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map(({ icon: Icon, label, href }) => (
          <button
            key={href}
            onClick={() => router.push(href)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${
              isActive(href)
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-blue-300 hover:text-white hover:bg-blue-800'
            }`}
          >
            <Icon size={15} />
            {label}
            {isActive(href) && <ChevronRight size={12} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* View site link */}
      <div className="px-4 mb-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-200 text-xs font-medium transition-colors border border-blue-700 hover:border-blue-500 rounded-xl py-2"
        >
          View Website →
        </a>
      </div>

      {/* User + Logout */}
      <div className="px-4 pt-3 border-t border-blue-800">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-[11px] text-white font-bold flex-shrink-0">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{adminName}</p>
            <p className="text-blue-400 text-[10px] truncate">{adminEmail}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-blue-400 hover:text-red-400 text-xs font-medium transition-colors w-full px-1 py-1"
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
