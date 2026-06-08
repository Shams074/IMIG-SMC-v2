import { Section, SectionHeader, Card, Button } from '@/components/ui'
import { researchTypes, publishedArticles } from '@/lib/data'
import { ExternalLink, FlaskConical } from 'lucide-react'

export default function ResearchPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Research</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Research & Publications</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Ongoing projects, publication opportunities, and collaboration requests from IMIG SMC.
          </p>
        </div>
      </div>

      {/* Ongoing Research Types */}
      <Section>
        <SectionHeader label="Active Projects" title="Ongoing Research" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {researchTypes.map((r) => (
            <Card key={r.type} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FlaskConical size={18} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 text-sm mb-1">{r.type}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                    {r.count} project{r.count !== 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                    {r.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Published Articles */}
      <Section className="bg-blue-50/60 border-y border-blue-100">
        <SectionHeader label="Publications" title="Published Articles" />
        {publishedArticles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {(publishedArticles as any[]).map((article, i) => (
              <Card key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-blue-500">
                      {article.journal} · {article.year}
                    </p>
                  </div>
                  {article.href && (
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors flex-shrink-0"
                    >
                      View Paper <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-blue-200 p-8 text-center text-sm text-blue-400">
            Published articles will be listed here soon.
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader
            label="Collaborate"
            title="Want to collaborate on a study?"
            subtitle="IMIG SMC welcomes collaboration requests from students, faculty, and partner institutions."
            center
          />
          <Button href="/contact" variant="primary">
            Contact Us →
          </Button>
        </div>
      </Section>
    </>
  )
}
