import { Section, SectionHeader } from '@/components/ui'
import { Mail, Linkedin, Instagram, MapPin, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/data'

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Contact</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Reach us via email, LinkedIn, or Instagram. We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <SectionHeader label="Contact Info" title="How to Reach Us" />
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'Internal Medicine Interest Group SMC', href: 'https://linkedin.com/company/imigsmc' },
                { icon: <Instagram size={18} />, label: 'Instagram', value: `@${siteConfig.instagram}`, href: 'https://instagram.com/imig.smc' },
                { icon: <Youtube size={18} />, label: 'YouTube', value: 'IMIG SMC', href: siteConfig.youtube },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Sindh Medical College, Karachi', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-blue-50 rounded-2xl border border-blue-100 p-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-blue-900 font-medium text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Social Wall placeholder */}
          <div>
            <SectionHeader label="Social Wall" title="Latest from Instagram" />
            {/* TODO: Embed Instagram feed here
                Options:
                1. Use a service like SnapWidget or LightWidget (free iframe embed)
                2. Use Instagram Basic Display API
                For now, showing a placeholder grid
            */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <a
                  key={i}
                  href="https://instagram.com/imig.smc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-200 flex items-center justify-center text-blue-400 text-xs font-medium hover:opacity-80 transition-opacity"
                >
                  <Instagram size={20} />
                </a>
              ))}
            </div>
            <p className="text-xs text-blue-400 mt-3 text-center">
              Follow <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-500 hover:underline">@imig.smc</a> on Instagram for live updates
            </p>
          </div>
        </div>
      </Section>

      {/* Google Map */}
      <Section className="bg-blue-50/50 border-t border-blue-100 !pt-0">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Location" title="Find Us" />
          <div className="rounded-2xl overflow-hidden border border-blue-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.4!2d67.0099!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7e4cd72ce7%3A0x3e7b!2sSindh%20Medical%20College%2C%20Karachi!5e0!3m2!1sen!2spk!4v1"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sindh Medical College, Karachi"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
