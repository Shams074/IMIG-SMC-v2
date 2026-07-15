'use client'
import { Mail, Linkedin, Instagram, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/data'

export default function TopBar() {
  return (
    <div className="bg-blue-800 text-blue-100 text-xs py-1.5 px-6 flex items-center justify-end">
      {/* Social links & Email — right side */}
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com/company/imigsmc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={11} />
        </a>
        <a
          href="https://instagram.com/imig.smc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={11} />
        </a>
        <a
          href={siteConfig.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label="YouTube"
        >
          <Youtube size={11} />
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label="Email"
        >
          <Mail size={11} />
        </a>
      </div>
    </div>
  )
}
