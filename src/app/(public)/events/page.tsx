import { Section, SectionHeader, Tag } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'
import { events as staticEvents } from '@/lib/data'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'

const tagColor: Record<string, 'blue' | 'teal' | 'amber' | 'red'> = {
  Webinar:     'blue',
  Competition: 'amber',
  Workshop:    'teal',
  Newsletter:  'red',
}

export const revalidate = 60 // refresh every 60 seconds

export default async function EventsPage() {
  const supabase = createClient()

  const { data: dbEvents } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: false })

  const now = new Date()

  // Separate upcoming and past from DB
  const upcomingEvents = dbEvents?.filter(e => e.date && new Date(e.date) >= now) ?? []
  const pastDbEvents   = dbEvents?.filter(e => !e.date || new Date(e.date) < now) ?? []

  // Use static events as fallback if no DB events exist yet
  const hasDbEvents = dbEvents && dbEvents.length > 0

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Events</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">IMIG Calendar</h1>
            <p className="text-white/70 text-lg max-w-xl">
              Guest lectures, workshops, case-based discussions, competitions, and many more.
            </p>
          </div>
          <div className="lg:text-right">
            <p className="text-sm text-blue-200 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl inline-block">
              Stay tuned — upcoming events are announced on our{' '}
              <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">Instagram</a>{' '}
              and{' '}
              <a href="https://linkedin.com/company/imigsmc" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">LinkedIn</a>.
            </p>
          </div>
        </div>
      </div>

      <Section>
        {/* Upcoming Events from DB */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <SectionHeader label="Coming Up" title="Upcoming Events" />
            <div className="flex flex-col gap-5">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200">
                  {event.banner_url && (
                    <div className="relative w-full h-48">
                      <Image src={event.banner_url} alt={event.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5 flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-xl flex flex-col items-center justify-center text-white">
                      <strong className="text-2xl font-bold leading-none">
                        {event.date ? format(new Date(event.date), 'dd') : '?'}
                      </strong>
                      <small className="text-[11px] uppercase tracking-wider opacity-80">
                        {event.date ? format(new Date(event.date), 'MMM') : ''}
                      </small>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <h4 className="font-semibold text-blue-900 text-lg">{event.title}</h4>
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 flex-shrink-0">
                          Upcoming
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-sm text-blue-600/70 mt-1">{event.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-3">
                        {event.date && (
                          <span className="flex items-center gap-1.5 text-xs text-blue-500">
                            <Calendar size={12} />
                            {format(new Date(event.date), 'MMMM d, yyyy · h:mm a')}
                          </span>
                        )}
                        {event.venue && (
                          <span className="flex items-center gap-1.5 text-xs text-blue-500">
                            <MapPin size={12} /> {event.venue}
                          </span>
                        )}
                      </div>
                      {event.registration_link && (
                        <Link
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                          <ExternalLink size={11} /> Register Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        <div>
          <SectionHeader label="" title="Past Events" />
          <div className="flex flex-col gap-4">
            {/* DB past events */}
            {pastDbEvents.map(event => (
              <div key={event.id} className="flex items-center gap-5 bg-blue-50/60 border border-blue-100 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-xl flex flex-col items-center justify-center text-white">
                  <strong className="text-2xl font-bold leading-none">
                    {event.date ? format(new Date(event.date), 'dd') : '?'}
                  </strong>
                  <small className="text-[11px] uppercase tracking-wider opacity-80">
                    {event.date ? format(new Date(event.date), 'MMM') : ''}
                  </small>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-900 mb-1">{event.title}</h4>
                  {event.description && <p className="text-sm text-blue-600/70">{event.description}</p>}
                  {event.venue && (
                    <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                      <MapPin size={10} /> {event.venue}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Static fallback events (from data.ts) shown only if no DB events */}
            {!hasDbEvents && staticEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-5 bg-blue-50/60 border border-blue-100 rounded-2xl p-5 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-xl flex flex-col items-center justify-center text-white">
                  <strong className="text-2xl font-bold leading-none">{event.day}</strong>
                  <small className="text-[11px] uppercase tracking-wider opacity-80">{event.month}</small>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-blue-600/70">{event.desc}</p>
                  {event.year && <p className="text-xs text-blue-400 mt-1">{event.year}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <Tag color={tagColor[event.tag] || 'blue'}>{event.tag}</Tag>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
