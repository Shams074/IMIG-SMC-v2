import { Mail, Linkedin, Instagram, MapPin, Youtube } from 'lucide-react'

const contacts = [
  { icon: Mail,      label: 'Email',     value: 'imigsmc@gmail.com',                    href: 'mailto:imigsmc@gmail.com' },
  { icon: Linkedin,  label: 'LinkedIn',  value: 'Internal Medicine Interest Group SMC', href: 'https://linkedin.com/company/imigsmc' },
  { icon: Instagram, label: 'Instagram', value: '@imig.smc',                            href: 'https://instagram.com/imig.smc' },
  { icon: Youtube,   label: 'YouTube',   value: 'IMIG SMC',                             href: 'https://youtube.com/@imigsmc' },
  { icon: MapPin,    label: 'Location',  value: 'Sindh Medical College, Karachi',       href: null },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 px-6 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Get In Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h2>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Have a question or want to collaborate? Reach us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-200 flex-shrink-0">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-0.5">{label}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-white font-medium text-sm hover:text-blue-300 transition-colors truncate block">
                    {value}
                  </a>
                ) : (
                  <p className="text-white font-medium text-sm truncate">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
