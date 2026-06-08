import Link from 'next/link'
import { events } from '@/lib/data'
import { Section, SectionHeader, Tag, Button } from '@/components/ui'

const tagColor: Record<string, 'blue' | 'teal' | 'amber' | 'red'> = {
  Webinar:     'blue',
  Competition: 'amber',
  Workshop:    'teal',
  Newsletter:  'red',
}

export default function EventsPreview() {
  const upcoming = events.filter(e => e.upcoming)

  return (
    <Section>
      <div className="flex items-end justify-between mb-10">
        <SectionHeader
          label="Events Calendar"
          title="Upcoming Events"
          subtitle="Webinars, guest lectures, case discussions, and competitions — stay in the loop."
        />
        <Button href="/events" variant="outline" className="hidden sm:inline-flex flex-shrink-0 mb-10">
          View All Events →
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {upcoming.map((event, i) => (
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

            <Tag color={tagColor[event.tag] || 'blue'}>{event.tag}</Tag>
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
