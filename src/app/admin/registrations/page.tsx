import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { UserCheck, UserX, Clock, Mail, Phone, GraduationCap } from 'lucide-react'
import RegistrationActions from './RegistrationActions'

export default async function AdminRegistrationsPage() {
  const supabase = createClient()
  const { data: registrations } = await supabase
    .from('membership_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  const pending  = registrations?.filter(r => r.status === 'pending').length  ?? 0
  const approved = registrations?.filter(r => r.status === 'approved').length ?? 0
  const rejected = registrations?.filter(r => r.status === 'rejected').length ?? 0

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-xl font-bold text-blue-900">Membership Registrations</h1>
        <p className="text-sm text-blue-400">Review and approve student membership applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
          <Clock size={18} className="text-amber-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-amber-700">{pending}</p>
          <p className="text-xs font-medium text-amber-600">Pending</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
          <UserCheck size={18} className="text-teal-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-teal-700">{approved}</p>
          <p className="text-xs font-medium text-teal-600">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <UserX size={18} className="text-red-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-red-600">{rejected}</p>
          <p className="text-xs font-medium text-red-500">Rejected</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {registrations && registrations.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {registrations.map(reg => (
              <div key={reg.id} className="p-5 hover:bg-blue-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <p className="font-semibold text-blue-900">{reg.full_name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        reg.status === 'approved' ? 'bg-teal-100 text-teal-700' :
                        reg.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-blue-500">
                      <span className="flex items-center gap-1">
                        <Mail size={11} /> {reg.email}
                      </span>
                      {reg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={11} /> {reg.phone}
                        </span>
                      )}
                      {reg.year_of_study && (
                        <span className="flex items-center gap-1">
                          <GraduationCap size={11} /> {reg.year_of_study}
                        </span>
                      )}
                    </div>
                    {reg.reason && (
                      <p className="text-xs text-blue-600/70 mt-2 bg-blue-50 rounded-lg px-3 py-2 italic">
                        "{reg.reason}"
                      </p>
                    )}
                    <p className="text-[11px] text-blue-300 mt-2">
                      Submitted {format(new Date(reg.created_at), 'MMM d, yyyy · h:mm a')}
                    </p>
                  </div>

                  {reg.status === 'pending' && (
                    <RegistrationActions id={reg.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300 text-sm">
            No membership applications yet.
          </div>
        )}
      </div>
    </div>
  )
}
