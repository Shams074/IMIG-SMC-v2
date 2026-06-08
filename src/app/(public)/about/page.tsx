import { Section, SectionHeader, Card } from '@/components/ui'
import { patrons, presidentsTeam, directors, departments, timeline } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Linkedin } from 'lucide-react'

export const revalidate = 60

export default async function AboutPage() {
  const supabase = createClient()

  // Fetch live team members from Supabase
  const { data: dbTeam } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const hasDbTeam = dbTeam && dbTeam.length > 0

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">About IMIG SMC</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Our Story, Mission & Vision</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Founded by SMCians for SMCians to bridge academics and clinical excellence.
          </p>
        </div>
      </div>

      {/* Mission + Vision + ACP */}
      <Section>
        <SectionHeader label="Our Foundation" title="Mission & Vision" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
          <div className="bg-blue-700 rounded-2xl p-6 text-white">
            <h3 className="font-serif text-lg font-bold mb-3">Mission</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              To cultivate a community of clinically competent and research-driven medical students passionate about internal medicine, by providing a dedicated platform for learning, networking, opportunities and mentorship that supplements and complements formal medical education to thrive at SMC and beyond.
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-serif text-lg font-bold text-blue-900 mb-3">Vision</h3>
            <p className="text-blue-600/80 text-sm leading-relaxed">
              To cultivate a generation of inspired, well-rounded, and aspiring internists who actively shape the future of internal medicine, while becoming the leading student lead medical organization in Pakistan.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-serif text-lg font-bold text-green-900 mb-3">ACP Affiliation</h3>
            <p className="text-green-800/80 text-sm leading-relaxed">
              IMIG SMC is a recognized student interest group registered with the{' '}
              <strong className="text-green-700">American College of Physicians (ACP)</strong>, the largest medical specialty society in the world.
            </p>
            <a href="https://www.acponline.org" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors">
              Learn more about ACP <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-blue-50/50 border-y border-blue-100">
        <SectionHeader label="Our Story" title="Key Milestones" center />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 shadow-md">
                    {item.year.slice(2)}
                  </div>
                  <div className="bg-white rounded-2xl border border-blue-100 p-5 flex-1">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{item.year}</span>
                    <h4 className="font-semibold text-blue-900 mb-1 mt-1">{item.title}</h4>
                    <p className="text-sm text-blue-600/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <SectionHeader label="People" title="Our Team Structure" />

        {/* If DB has team members — show them */}
        {hasDbTeam ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {dbTeam.map(member => (
              <Card key={member.id} className="text-center !p-4" hover={false}>
                {member.photo_url ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mx-auto mb-3">
                    <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">
                    {member.name.charAt(0)}
                  </div>
                )}
                <p className="font-semibold text-blue-900 text-xs">{member.name}</p>
                <p className="text-[11px] text-blue-500 mt-0.5">{member.role}</p>
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-2 text-blue-400 hover:text-blue-600">
                    <Linkedin size={13} />
                  </a>
                )}
              </Card>
            ))}
          </div>
        ) : (
          // Fallback — static data from data.ts
          <>
            {/* Patrons */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Patrons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {patrons.map((m) => (
                  <Card key={m.name} className="!p-5 flex items-center gap-4" hover={false}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                      {m.name.split(' ').slice(-1)[0][0]}{m.name.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">{m.name}</p>
                      <p className="text-xs text-blue-500 mt-0.5">{m.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* President's Team */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">President's Team</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {presidentsTeam.map((m) => (
                  <Card key={m.name} className="text-center !p-4" hover={false}>
                    <Image src={m.photo} alt={m.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover mx-auto mb-2" />
                    <p className="font-semibold text-blue-900 text-xs">{m.name}</p>
                    <p className="text-[11px] text-blue-500 mt-0.5">{m.role}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Directors */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">Directors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {directors.map((m) => (
                  <Card key={m.name} className="text-center !p-4" hover={false}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mx-auto mb-2">
                      {m.name.charAt(0)}
                    </div>
                    <p className="font-semibold text-blue-900 text-xs">{m.name}</p>
                    <p className="text-[11px] text-blue-500 mt-0.5">{m.role}</p>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </Section>

      {/* Departments */}
      <Section className="bg-blue-50/60 border-y border-blue-100">
        <SectionHeader
          label="Structure"
          title="Our Departments"
          subtitle="IMIG SMC operates through 4 specialized departments, each led by talented student officers."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {departments.map((dept) => (
            <Link key={dept.name} href={dept.href}
              className="group bg-white rounded-2xl border border-blue-100 p-6 text-center hover:border-blue-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">{dept.name}</h3>
              <p className="text-xs text-blue-600/70 leading-relaxed mb-4">{dept.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
