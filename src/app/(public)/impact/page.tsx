import { Section, SectionHeader, Card } from '@/components/ui'
import { Linkedin } from 'lucide-react'

const issues = [
  { number: 5, title: 'Heart Failure Updates & AHA 2024 Guidelines', date: 'April 2025', highlights: 3 },
  { number: 4, title: 'Diabetes Management — New Frontiers', date: 'March 2025', highlights: 4 },
  { number: 3, title: 'Antibiotic Resistance in Pakistan', date: 'February 2025', highlights: 3 },
  { number: 2, title: 'Kidney Disease Awareness Month', date: 'January 2025', highlights: 4 },
  { number: 1, title: 'Launch Edition — IMIG SMC Introduces IMpact', date: 'December 2024', highlights: 2 },
]

const NEWSLETTER_URL = "https://www.linkedin.com/newsletters/impact-smc-7328530931902840832"

export default function ImpactPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">IMpact — Monthly Newsletter</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            IMpact — Monthly Newsletter
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Monthly newsletter curated by our editorial team. Subscribe for FREE via LinkedIn.
          </p>
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-white text-blue-800 font-semibold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Linkedin size={15} />
            Subscribe on LinkedIn — FREE
          </a>
        </div>
      </div>

      <Section>
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <SectionHeader label="Archive" title="All Issues" />
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Linkedin size={14} />
            Follow on LinkedIn
          </a>
        </div>

        {/* TODO: RSS Feed embed — share your LinkedIn newsletter RSS URL and we can embed it here */}
        {/* When you have the RSS URL, uncomment and use an RSS-to-HTML embed approach */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {issues.map((issue) => (
            <a
              key={issue.number}
              href={NEWSLETTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-blue-100 p-6 hover:border-blue-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-100 px-2.5 py-1 rounded-full">
                  Issue #{issue.number}
                </span>
                <span className="text-xs text-blue-400">{issue.date}</span>
              </div>
              <h3 className="font-semibold text-blue-900 text-sm mb-3 leading-snug">{issue.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-500">{issue.highlights} highlights</span>
                <span className="text-xs font-semibold text-blue-500 group-hover:text-blue-700 transition-colors">Read →</span>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
