'use client'
import { Mail, Linkedin, Instagram, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/data'

export default function TopBar() {
  return (
    <div className="bg-blue-800 text-blue-100 text-xs py-1.5 px-6 flex items-center justify-between">
      {/* Desktop: email only (no long title) */}
      <a
        href={`mailto:${siteConfig.email}`}
        className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <Mail size={11} />
        <span className="hidden md:inline">{siteConfig.email}</span>
      </a>

      {/* Social links — right side */}
      <div className="flex items-center gap-4 ml-auto">
        <a
          href="https://linkedin.com/company/imigsmc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Linkedin size={11} />
          <span className="hidden md:inline">LinkedIn</span>
        </a>
        <a
          href="https://instagram.com/imig.smc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Instagram size={11} />
          <span className="hidden md:inline">@{siteConfig.instagram}</span>
        </a>
        <a
          href={siteConfig.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Youtube size={11} />
          <span className="hidden md:inline">YouTube</span>
        </a>
        {/* Mobile: email icon only */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="sm:hidden flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Mail size={11} />
        </a>
      </div>
    </div>
  )
}
