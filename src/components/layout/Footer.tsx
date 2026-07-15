import Link from 'next/link'
import Image from 'next/image'
import { Mail, Linkedin, Instagram, MapPin, Youtube } from 'lucide-react'
import { siteConfig, navLinks } from '@/lib/data'


const navigate = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Events",           href: "/events" },
  { label: "Resource Library", href: "/resources" },
  { label: "Departments",      href: "/departments" },
]

const engage = [
  { label: "IMpact Newsletter", href: "/impact" },
  { label: "Membership",        href: "/membership" },
  { label: "Social Wall",       href: "/social-wall" },
]

const legal = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Terms & Conditions",href: "#" },
  { label: "Code of Ethics",    href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-blue-200">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo — place your logo at /public/imig-logo.png
                  TODO: Once you add the file, replace the placeholder div with: */}
                  {/* <Image src="/New IMIG Logo.png" alt="IMIG SMC" width={40} height={40} className="rounded-full" /> */}
             
            <Image
                src="/New IMIG Logo.png"
                alt="IMIG SMC"
                width={48}
                height={48}
                className="flex-shrink-0 w-12 h-12 object-contain"
            />
              <div>
                <p className="text-white font-semibold text-sm">Internal Medicine Interest Group</p>
                <p className="text-blue-400 text-xs">{siteConfig.college}</p>
              </div>
            </div>
            <p className="text-sm text-blue-300/80 leading-relaxed mb-5 max-w-xs">
              A student-led organization at Jinnah Sindh Medical University dedicated to explore Internal Medicine through clinical excellence, research, mentorship and networking.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={13} className="text-blue-400" />
                {siteConfig.email}
              </a>
              <a href="https://linkedin.com/company/imigsmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin size={13} className="text-blue-400" />
                LinkedIn
              </a>
              <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Instagram size={13} className="text-blue-400" />
                @{siteConfig.instagram}
              </a>
              <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Youtube size={13} className="text-blue-400" />
                YouTube
              </a>
              <span className="flex items-center gap-2 text-blue-400">
                <MapPin size={13} />
                Karachi, Pakistan
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navigate</h4>
            <ul className="flex flex-col gap-2">
              {navigate.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-300/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Engage</h4>
            <ul className="flex flex-col gap-2">
              {engage.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-300/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-300/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-400">
  <p>© 2026 IMIG SMC. All rights reserved. Developed by <a href="https://linkedin.com/in/shams-raza-24b337297" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Shams Raza</a></p>

  <a href="https://www.acponline.org" target="_blank" rel="noopener noreferrer">
    <Image
      src="https://www.acponline.org/themes/acp_scratch/images/acp-logo-horizontal-4c.svg"
      alt="American College of Physicians"
      width={120}
      height={48}
      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
    />
  </a>
</div>
      </div>
    </footer>
  )
}
