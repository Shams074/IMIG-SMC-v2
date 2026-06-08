import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

export default async function AdminMembersPage() {
  const supabase = createClient()
  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-xl font-bold text-blue-900">Members</h1>
        <p className="text-sm text-blue-400">{members?.length ?? 0} registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {members && members.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {members.map(member => (
              <div key={member.id} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                  {(member.full_name ?? '?').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-blue-900 text-sm truncate">{member.full_name ?? 'No name'}</p>
                  <p className="text-xs text-blue-400">Joined {format(new Date(member.created_at), 'MMM d, yyyy')}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  member.role === 'admin' ? 'bg-violet-100 text-violet-700' :
                  member.role === 'member' ? 'bg-teal-100 text-teal-700' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300 text-sm">
            No registered users yet.
          </div>
        )}
      </div>
    </div>
  )
}
