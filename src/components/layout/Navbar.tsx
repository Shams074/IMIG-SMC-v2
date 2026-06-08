'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

// Filter out Contact from nav links — it's handled by the button
const filteredLinks = navLinks.filter(l => l.href !== '/contact')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100'
        : 'bg-white border-b border-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <Image
            src="/imig-logo.png"
            alt="IMIG SMC Logo"
            width={56}
            height={56}
            className="flex-shrink-0 w-14 h-14 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-blue-800 leading-snug">Internal Medicine Interest Group</span>
            <span className="text-[10px] text-blue-400 font-medium uppercase tracking-widest">Sindh Medical College</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1 ml-auto">
          {filteredLinks.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[13px] font-medium px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-blue-700/70 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          {/* Contact Us button — highlighted, always visible */}
          <li className="ml-2">
            <Link
              href="/#contact"
              className="text-[13px] font-semibold px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors"
            >
              Contact Us →
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-blue-100 bg-white px-6 py-4 flex flex-col gap-1">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-[14px] font-medium px-3 py-2.5 rounded-lg transition-colors ${
                pathname === link.href
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-blue-700/80 hover:bg-blue-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center text-[14px] font-semibold px-4 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      )}
    </nav>
  )
}
