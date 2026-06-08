import { Section, SectionHeader, Card } from '@/components/ui'
import { resourceCategories, clinicalHandbook } from '@/lib/data'
import { ExternalLink, BookOpen, FileText, Youtube, Download } from 'lucide-react'

export default function ResourcesPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Resource Library</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Resource Library</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Latest guidelines, high-yield infographics, templates and recorded YouTube sessions.
          </p>
        </div>
      </div>

      {/* Clinical Language Handbook highlight */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-amber-900 px-3 py-1 rounded-full mb-3">
                🇵🇰 Pakistan&apos;s First
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mb-2">{clinicalHandbook.title}</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">{clinicalHandbook.desc}</p>
            </div>
            <a
              href={clinicalHandbook.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-white text-blue-800 font-semibold text-sm px-6 py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <Download size={16} />
              Download FREE PDF
            </a>
          </div>
        </div>
      </div>

      <Section>
        <SectionHeader
          label="Library"
          title="Browse All Our Resources"
          subtitle="Curated by IMIG Core Team just for you"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {resourceCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  {cat.name === 'Recorded Sessions' ? (
                    <Youtube size={16} className="text-red-500" />
                  ) : cat.name === 'History Templates' ? (
                    <FileText size={16} className="text-blue-500" />
                  ) : (
                    <BookOpen size={16} className="text-blue-500" />
                  )}
                </div>
                <h3 className="font-semibold text-blue-900 text-base">{cat.name}</h3>
              </div>

              {/* Subtypes */}
              {cat.subtypes && cat.subtypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.subtypes.map((sub) => (
                    <span key={sub} className="text-[11px] font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                      {sub}
                    </span>
                  ))}
                </div>
              )}

              {/* YouTube playlist embed */}
              {cat.name === 'Recorded Sessions' && cat.youtubePlaylistId ? (
                <div className="rounded-2xl overflow-hidden border border-blue-100">
                  <iframe
                    width="100%"
                    height="220"
                    src={`https://www.youtube.com/embed/videoseries?list=${cat.youtubePlaylistId}`}
                    title="IMIG SMC YouTube Playlist"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : cat.items && cat.items.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {(cat.items as any[]).map((item, i) => (
                    <Card key={i} className="!p-4 flex items-center gap-4 cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        {item.type === 'YouTube' ? (
                          <Youtube size={16} className="text-red-500" />
                        ) : (
                          <Download size={16} className="text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-900 truncate">{item.title}</p>
                        <p className="text-xs text-blue-500">
                          {item.subtype && <span className="text-blue-400 mr-1">[{item.subtype}]</span>}
                          {item.type}
                        </p>
                      </div>
                      {item.href && (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-blue-50 rounded-2xl border border-dashed border-blue-200 p-6 text-center text-sm text-blue-400">
                  Resources coming soon — check back shortly.
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
