import Link from 'next/link'
import { events as hardcodedEvents } from '@/lib/data'
import { Section, SectionHeader, Tag, Button } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'

const tagColor: Record<string, 'blue' | 'teal' | 'amber' | 'red'> = {
  Webinar:     'blue',
  Competition: 'amber',
  Workshop:    'teal',
  Newsletter:  'red',
}

export default async function EventsPreview() {
  const supabase = createClient()

  // Fetch 3 most recent events from Supabase
  const { data: dbEvents } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: false })
    .limit(3)

  let displayEvents: any[] = []

  if (dbEvents && dbEvents.length > 0) {
    displayEvents = dbEvents.map(e => {
      const dateObj = new Date(e.date)
      return {
        day: dateObj.getDate().toString().padStart(2, '0'),
        month: dateObj.toLocaleString('default', { month: 'short' }),
        year: dateObj.getFullYear().toString(),
        title: e.title,
        desc: e.description,
        tag: 'Webinar', // Default tag as it's not in the DB
        upcoming: dateObj > new Date()
      }
    })
  } else {
    // Fallback to hardcoded events
    displayEvents = hardcodedEvents.slice(0, 3)
  }

  return (
    <Section>
      <div className="flex items-end justify-between mb-10">
        <SectionHeader
          label="Events Calendar"
          title="Past Events"
          subtitle="Workshops, webinars, guest lectures, case discussions, competitions and many more"
        />
        <Button href="/events" variant="outline" className="hidden sm:inline-flex flex-shrink-0 mb-10">
          View All Events →
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {displayEvents.map((event, i) => (
          <Link
            key={i}
            href="/events"
            className="group flex items-center gap-5 bg-blue-50/60 border border-blue-100 rounded-2xl p-5 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            {/* Date badge */}
            <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-xl flex flex-col items-center justify-center text-white">
              <strong className="text-xl font-bold leading-none">{event.day}</strong>
              <small className="text-[11px] uppercase tracking-wider opacity-80">{event.month}</small>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-blue-900 text-sm mb-1 group-hover:text-blue-600 transition-colors truncate">
                {event.title}
              </h4>
              <p className="text-xs text-blue-600/70 truncate">{event.desc}</p>
            </div>

            <Tag color={tagColor[event.tag] || 'blue'}>{event.tag || 'Event'}</Tag>
          </Link>
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Button href="/events" variant="primary" className="w-full justify-center">
          View All Events →
        </Button>
      </div>
    </Section>
  )
}
