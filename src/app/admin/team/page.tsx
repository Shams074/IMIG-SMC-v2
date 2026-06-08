import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, GripVertical } from 'lucide-react'
import Image from 'next/image'

export default async function AdminTeamPage() {
  const supabase = createClient()
  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-blue-900">Team Members</h1>
          <p className="text-sm text-blue-400">{members?.length ?? 0} members · drag to reorder</p>
        </div>
        <Link href="/admin/team/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> Add Member
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {members && members.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {members.map(member => (
              <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors group">
                <GripVertical size={14} className="text-blue-200 group-hover:text-blue-400 flex-shrink-0 cursor-grab" />

                {member.photo_url ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-sm flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-blue-900 text-sm">{member.name}</p>
                  <p className="text-xs text-blue-400">{member.role}</p>
                </div>

                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  member.is_active ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {member.is_active ? 'Active' : 'Hidden'}
                </span>

                <Link href={`/admin/team/${member.id}`} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 transition-colors">
                  <Pencil size={13} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300">
            <p className="text-sm mb-2">No team members yet.</p>
            <Link href="/admin/team/new" className="text-blue-500 hover:underline text-sm font-medium">Add your first member →</Link>
          </div>
        )}
      </div>
    </div>
  )
}
