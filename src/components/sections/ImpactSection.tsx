'use client'
import { Section } from '@/components/ui'
import { Linkedin, Instagram, Youtube } from 'lucide-react'

export default function ImpactSection() {
  return (
    <Section className="bg-blue-50/50 border-y border-blue-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Newsletter */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-2">IMpact — Monthly Newsletter</p>
          <h3 className="font-serif text-2xl font-bold mb-3">Stay Updated Every Month</h3>
          <p className="text-white/75 text-sm leading-relaxed mb-6">
            Monthly newsletter curated by our editorial team. Subscribe for FREE via LinkedIn.
          </p>
          <a
            href="https://www.linkedin.com/newsletters/impact-smc-7328530931902840832"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-800 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
          >
            <Linkedin size={15} />
            Subscribe on LinkedIn
          </a>
          <p className="text-xs text-white/40 mt-3">Free. No spam. Unsubscribe anytime.</p>
        </div>

        {/* Social Stats */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-500 mb-2">Follow IMIG SMC</p>
          <h3 className="font-serif text-2xl font-bold text-blue-900 mb-6">IMIG Social Network in Numbers</h3>
          <div className="flex flex-col gap-4">
            <a href="https://linkedin.com/company/imigsmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl border border-blue-100 p-4 hover:border-blue-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <Linkedin size={18} className="text-blue-600" />
              </div>
              <div>
                <strong className="block text-lg font-bold text-blue-900">1700+ Followers</strong>
                <small className="text-xs text-blue-500">Internal Medicine Interest Group SMC · LinkedIn</small>
              </div>
            </a>
            <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl border border-blue-100 p-4 hover:border-blue-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
                <Instagram size={18} className="text-pink-600" />
              </div>
              <div>
                <strong className="block text-lg font-bold text-blue-900">3200+ Followers</strong>
                <small className="text-xs text-blue-500">@imig.smc · Posts, Reels, and event highlights</small>
              </div>
            </a>
            <a href="https://www.youtube.com/@imig-smc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl border border-blue-100 p-4 hover:border-blue-300 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                <Youtube size={18} className="text-red-600" />
              </div>
              <div>
                <strong className="block text-lg font-bold text-blue-900">450+ Subscribers</strong>
                <small className="text-xs text-blue-500">IMIG-SMC · Recorded sessions & highlights</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
