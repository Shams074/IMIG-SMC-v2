import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-blue-50/40 flex">
      <AdminSidebar adminEmail={user.email ?? ''} adminName={profile.full_name ?? 'Admin'} />
      <main className="flex-1 p-6 lg:p-8 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}
