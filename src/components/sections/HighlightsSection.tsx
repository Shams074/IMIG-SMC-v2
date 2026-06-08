import Link from 'next/link'
import { highlights } from '@/lib/data'
import { Section, SectionHeader } from '@/components/ui'
import { ArrowRight, Calendar, BookOpen, FlaskConical, Newspaper, Users, Instagram } from 'lucide-react'

// Minimalistic icons mapped to each highlight title
const iconMap: Record<string, React.ReactNode> = {
  "Events & Webinars":          <Calendar size={20} className="text-blue-500" />,
  "Resource Library":           <BookOpen size={20} className="text-blue-500" />,
  "Research":                   <FlaskConical size={20} className="text-blue-500" />,
  "IMpact - Monthly Newsletter":<Newspaper size={20} className="text-blue-500" />,
  "Membership":                 <Users size={20} className="text-blue-500" />,
  "Social Wall":                <Instagram size={20} className="text-blue-500" />,
}

export default function HighlightsSection() {
  return (
    <Section className="bg-blue-50/60">
      <SectionHeader
        label="What We Offer"
        title="Everything You Need to Excel in Internal Medicine"
        subtitle="From workshops and resources to research and networking — IMIG SMC has you covered throughout your medical school."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((h) => (
          <Link
            key={h.href}
            href={h.href}
            className="group bg-white rounded-2xl border border-blue-100 p-6 hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-200 block"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
              {iconMap[h.title] ?? <BookOpen size={20} className="text-blue-500" />}
            </div>
            <h3 className="font-semibold text-blue-900 text-base mb-2">{h.title}</h3>
            <p className="text-sm text-blue-600/70 leading-relaxed mb-4">{h.desc}</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 group-hover:gap-2 transition-all">
              {h.cta}
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
