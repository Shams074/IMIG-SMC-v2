import { Section, SectionHeader, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'
import { ExternalLink, Users, Clock } from 'lucide-react'
import Image from "next/image"

export const revalidate = 60

export default async function MembershipPage() {
  const supabase = createClient()

  // Fetch live membership settings from admin
  const { data: settings } = await supabase
    .from('membership_settings')
    .select('*')
    .limit(1)
    .single()

  const studentOpen = settings?.student_is_open ?? false
  const studentUrl = settings?.student_form_url ?? ''
  const coreOpen = settings?.core_is_open ?? false
  const coreUrl = settings?.core_form_url ?? ''
  const ambassadorOpen = settings?.ambassador_is_open ?? false
  const ambassadorUrl = settings?.ambassador_form_url ?? ''

  const membershipTypes = [
    {
      title: 'SMC Student Member',
      subtitle: 'General Member',
      desc: 'Open to all current MBBS undergraduates of Sindh Medical College.',
      perks: ['Access to all member only events', 'Resource library', 'Member toolkit', 'Guided mentorship'],
      recommended: true,
      isOpen: studentOpen,
      formUrl: studentUrl
    },
    {
      title: 'Campus Ambassador',
      subtitle: 'Leadership Role',
      desc: 'Represent IMIG SMC in your university and help organize our activities.',
      perks: ['All student benefits', 'Leadership role', 'Special recognition', 'Networking opportunities'],
      recommended: false,
      isOpen: ambassadorOpen,
      formUrl: ambassadorUrl
    },
    {
      title: 'SMC Core Team Member',
      subtitle: 'Executive & Department Lead',
      desc: 'Reserved for students inducted into the IMIG SMC Executive Committee and working departments.',
      perks: ['Leadership experience', 'Exclusive networking with faculty', 'Priority access to all workshops', 'All student benefits'],
      recommended: false,
      isOpen: coreOpen,
      formUrl: coreUrl
    },
  ]

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Membership</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Join IMIG SMC</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Become a General Member and unlock access to our member only events, resources, research opportunities, and the ACP network.
            <br /><br />
            <span className="font-semibold text-blue-200">Review the membership options below to find the right fit for you.</span>
          </p>
        </div>
      </div>

      <Section>
        {/* Membership Types */}
        <SectionHeader label="Options" title="Choose Your Membership Type" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
          {membershipTypes.map((type) => (
            <div key={type.title} className={`relative rounded-2xl p-6 border-2 transition-all duration-200 ${
              type.recommended
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/60'
                : 'border-blue-100 bg-white'
            }`}>
              {type.recommended && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white px-2.5 py-1 rounded-full mb-3">
                  Recommended
                </span>
              )}
              
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="font-semibold text-blue-900">{type.title}</h3>
                {type.isOpen && type.formUrl && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Open
                  </span>
                )}
              </div>
              
              <p className="text-xs text-blue-400 font-medium mb-3 uppercase tracking-wider">{type.subtitle}</p>
              <p className="text-xs text-blue-600/70 mb-4 leading-relaxed">{type.desc}</p>
              
              <ul className="flex flex-col gap-1.5 mb-6">
                {type.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-xs text-blue-700">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-500 flex-shrink-0">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                {type.isOpen && type.formUrl ? (
                  <a href={type.formUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Apply Now <ExternalLink size={11} />
                  </a>
                ) : (
                  <button disabled
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed">
                    Registrations Closed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ACP Section */}
      <Section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-white border border-green-200 flex items-center justify-center shadow-sm relative overflow-hidden p-3">
              <Image
                src="/ACP-Logo.jpg"
                alt="American College of Physicians logo"
                width={500}
                height={250}
                className="object-contain"
              />
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
