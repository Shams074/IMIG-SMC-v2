import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Trash2, MapPin, Calendar } from 'lucide-react'
import { format } from 'date-fns'

export default async function AdminEventsPage() {
  const supabase = createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  const now = new Date()

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-blue-900">Events</h1>
          <p className="text-sm text-blue-400">{events?.length ?? 0} total events</p>
        </div>
        <Link href="/admin/events/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> New Event
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {events && events.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {events.map(event => {
              const isUpcoming = event.date ? new Date(event.date) >= now : false
              return (
                <div key={event.id} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors">
                  {event.banner_url ? (
                    <img src={event.banner_url} alt="" className="w-16 h-10 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-blue-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900 text-sm truncate">{event.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {event.date && (
                        <span className="flex items-center gap-1 text-xs text-blue-400">
                          <Calendar size={11} />
                          {format(new Date(event.date), 'MMM d, yyyy · h:mm a')}
                        </span>
                      )}
                      {event.venue && (
                        <span className="flex items-center gap-1 text-xs text-blue-400">
                          <MapPin size={11} /> {event.venue}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    isUpcoming ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-500'
                  }`}>
                    {isUpcoming ? 'Upcoming' : 'Past'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/events/${event.id}`} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 transition-colors">
                      <Pencil size={13} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300">
            <p className="text-sm mb-2">No events yet.</p>
            <Link href="/admin/events/new" className="text-blue-500 hover:underline text-sm font-medium">Create your first event →</Link>
          </div>
        )}
      </div>
    </div>
  )
}
