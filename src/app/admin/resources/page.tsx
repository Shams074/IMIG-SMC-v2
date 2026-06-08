import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function AdminResourcesPage() {
  const supabase = createClient()
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-blue-900">Resources</h1>
          <p className="text-sm text-blue-400">{resources?.length ?? 0} resources uploaded</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> Add Resource
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {resources && resources.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {resources.map(r => (
              <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-blue-900 text-sm truncate">{r.title}</p>
                  <p className="text-xs text-blue-400">{r.category ?? 'Uncategorized'} · {r.access_level}</p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 font-semibold px-2.5 py-1 rounded-full">{r.access_level}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300 text-sm">
            No resources uploaded yet. Full resource manager coming soon.
          </div>
        )}
      </div>
    </div>
  )
}
