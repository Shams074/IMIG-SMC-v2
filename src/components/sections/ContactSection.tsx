import { Mail, Linkedin, Instagram, MapPin, Youtube } from 'lucide-react'

const contacts = [
  { icon: Mail,      label: 'Email',     value: 'imigsmc@gmail.com',                    href: 'mailto:imigsmc@gmail.com' },
  { icon: Linkedin,  label: 'LinkedIn',  value: 'Internal Medicine Interest Group SMC', href: 'https://linkedin.com/company/imigsmc' },
  { icon: Instagram, label: 'Instagram', value: '@imig.smc',                            href: 'https://instagram.com/imig.smc' },
  { icon: Youtube,   label: 'YouTube',   value: 'IMIG-SMC',                             href: 'https://www.youtube.com/@imig-smc' },
  { icon: MapPin,    label: 'Location',  value: 'Sindh Medical College, Karachi',       href: 'https://maps.app.goo.gl/z222UGwrmLDBgMLT6' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 px-6 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Get In Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h2>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Reach us via email, LinkedIn, or Instagram. We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {contacts.map(({ icon: Icon, label, value, href }) => {
            const CardWrapper = href ? 'a' : 'div'
            return (
              <CardWrapper
                key={label}
                href={href ?? undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/20 transition-colors block"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-200 flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white font-medium text-sm truncate">{value}</p>
                </div>
              </CardWrapper>
            )
          })}
        </div>

        {/* Embedded Map */}
        <div className="rounded-2xl overflow-hidden border border-white/20 aspect-[21/9] sm:aspect-[21/6]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.218324838421!2d67.04278451121014!3d24.85640244534575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7f06584c31%3A0xc3ab26c92dcd6888!2sJinnah%20Sindh%20Medical%20University!5e0!3m2!1sen!2s!4v1715694252520!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="IMIG SMC Location"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
