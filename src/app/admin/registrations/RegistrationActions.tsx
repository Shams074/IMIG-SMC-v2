'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { UserCheck, UserX } from 'lucide-react'

export default function RegistrationActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function updateStatus(status: 'approved' | 'rejected') {
    setLoading(true)
    await supabase.from('membership_registrations').update({ status }).eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        onClick={() => updateStatus('approved')}
        disabled={loading}
        className="flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors disabled:opacity-60"
      >
        <UserCheck size={13} /> Approve
      </button>
      <button
        onClick={() => updateStatus('rejected')}
        disabled={loading}
        className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-semibold px-3 py-2 rounded-xl transition-colors disabled:opacity-60"
      >
        <UserX size={13} /> Reject
      </button>
    </div>
  )
}
