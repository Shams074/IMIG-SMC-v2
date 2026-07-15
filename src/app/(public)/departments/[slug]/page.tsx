import { notFound } from 'next/navigation'
import { Section, SectionHeader, Card, Button } from '@/components/ui'
import { departments, researchTypes, publishedArticles } from '@/lib/data'
import { ExternalLink, FlaskConical, Users } from 'lucide-react'

export function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.href.split('/').pop(),
  }))
}

export default function DepartmentSubPage({ params }: { params: { slug: string } }) {
  const department = departments.find(d => d.href.endsWith(params.slug))

  if (!department) {
    notFound()
  }

  const isJournalClub = params.slug === 'journal-club'

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Department</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{department.name}</h1>
          <p className="text-white/70 text-lg max-w-xl">
            {department.desc}
          </p>
        </div>
      </div>

      {isJournalClub ? (
        <>
          {/* Research & Publications Section (Moved from old /research) */}
          <Section>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-2xl font-bold text-blue-900 mb-3">Research & Publications</h2>
              <p className="text-blue-600/80 leading-relaxed">
                The Journal Club coordinates ongoing projects, publication opportunities, and collaboration requests from IMIG SMC.
              </p>
            </div>
            
            <SectionHeader label="Active Projects" title="Ongoing Research" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
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
          <Section className="bg-blue-50/60 border-t border-blue-100">
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
      ) : (
        <Section>
          <div className="max-w-3xl bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Users size={32} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-blue-900 mb-4">About {department.name}</h2>
            <p className="text-lg text-blue-700/80 leading-relaxed mb-8">
              The {department.name} team plays a vital role in executing the vision of IMIG SMC. {department.desc}
            </p>
            <div className="flex items-center gap-4">
              <Button href="/contact" variant="primary">
                Contact Department
              </Button>
              <Button href="/about" variant="outline">
                View All Departments
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
