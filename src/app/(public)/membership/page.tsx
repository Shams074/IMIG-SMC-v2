import { Section, SectionHeader, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'
import { ExternalLink, Users, Clock } from 'lucide-react'

export const revalidate = 60

const membershipTypes = [
  {
    title: 'SMC Student Member',
    subtitle: 'General Member',
    desc: 'Open to all current MBBS undergraduates of Sindh Medical College.',
    perks: ['Access to all member only events', 'Resource library', 'Member toolkit', 'Guided mentorship'],
    recommended: true,
  },
  {
    title: 'Campus Ambassador',
    subtitle: 'Leadership Role',
    desc: 'Represent IMIG SMC in your university and help organize our activities.',
    perks: ['All student benefits', 'Leadership role', 'Special recognition', 'Networking opportunities'],
    recommended: false,
  },
  {
    title: 'SMC Core Team Member',
    subtitle: 'Executive & Department Lead',
    desc: 'Reserved for students inducted into the IMIG SMC Executive Committee and working departments.',
    perks: ['Leadership experience', 'Exclusive networking with faculty', 'Priority access to all workshops', 'All student benefits'],
    recommended: false,
  },
]

export default async function MembershipPage() {
  const supabase = createClient()

  // Fetch live membership settings from admin
  const { data: settings } = await supabase
    .from('membership_settings')
    .select('*')
    .limit(1)
    .single()

  const isOpen     = settings?.is_open ?? false
  const regTitle   = settings?.title ?? 'Membership Applications Open!'
  const regDesc    = settings?.description ?? 'Applications are now open for IMIG SMC membership.'
  const formUrl    = settings?.form_url ?? ''
  const deadline   = settings?.deadline ?? ''

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Membership</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Join IMIG SMC</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Become a General Member and unlock access to our member only events, resources, research opportunities, and the ACP network.
            <br /><br />
            <span className="font-semibold text-blue-200">Membership applications for the 2025/2026 cycle will open soon. Please check back later.</span>
          </p>
        </div>
      </div>

      <Section>
        {/* ── Live Registration Banner (admin controlled) ── */}
        {isOpen ? (
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-8 mb-12 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Applications Open Now</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">{regTitle}</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xl mb-5">{regDesc}</p>
            {deadline && (
              <div className="flex items-center gap-2 text-white/70 text-xs mb-5">
                <Clock size={13} />
                <span>Application Deadline: <strong className="text-white">{deadline}</strong></span>
              </div>
            )}
            {formUrl && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-md"
              >
                <Users size={15} /> Apply for Membership →
              </a>
            )}
          </div>
        ) : (
          /* Closed state */
          <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 mb-12 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-2xl">📋</div>
            <h3 className="font-serif text-xl font-bold text-blue-900 mb-2">Applications Open Seasonally</h3>
            <p className="text-blue-600/70 text-sm leading-relaxed mb-5 max-w-md mx-auto">
              Membership applications are opened periodically throughout the year.
              Follow us on LinkedIn and Instagram to be notified when the next cycle opens.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors">
                Follow on Instagram
              </a>
              <a href="https://linkedin.com/company/imigsmc" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                Follow on LinkedIn
              </a>
            </div>
          </div>
        )}

        {/* Membership Types */}
        <SectionHeader label="Options" title="Choose Your Membership Type" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
          {membershipTypes.map((type) => (
            <div key={type.title} className={`rounded-2xl p-6 border-2 transition-all duration-200 ${
              type.recommended
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/60'
                : 'border-blue-100 bg-white'
            }`}>
              {type.recommended && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white px-2.5 py-1 rounded-full mb-3">
                  Recommended
                </span>
              )}
              <h3 className="font-semibold text-blue-900 mb-0.5">{type.title}</h3>
              <p className="text-xs text-blue-400 font-medium mb-3 uppercase tracking-wider">{type.subtitle}</p>
              <p className="text-xs text-blue-600/70 mb-4 leading-relaxed">{type.desc}</p>
              <ul className="flex flex-col gap-1.5">
                {type.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-blue-700">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-500 flex-shrink-0">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              {isOpen && formUrl && (
                <a href={formUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Apply Now <ExternalLink size={11} />
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ACP Section */}
      <Section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-white border border-green-200 flex flex-col items-center justify-center text-green-700 shadow-sm relative overflow-hidden">
              <span className="text-3xl mb-1">🏛️</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-800">ACP Logo</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Bonus Opportunity</p>
              <h3 className="font-serif text-2xl font-bold text-green-900 mb-2">Register with ACP for FREE</h3>
              <p className="text-sm text-green-800/70 leading-relaxed mb-4">
                As a medical student, you can register with the American College of Physicians as a Student Associate — completely free. Get access to ACP resources, Annals of Internal Medicine, career tools, and a global network of internists.
              </p>
              <a href="https://www.acponline.org/membership/medical-students" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors">
                Register with ACP <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
