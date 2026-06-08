import { Section } from '@/components/ui'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DeptPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-blue-300 text-sm mb-6 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to About
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Department</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Learning Department</h1>
          <p className="text-white/70 text-lg max-w-xl">Curates educational content, resources, and webinar programmes.</p>
        </div>
      </div>
      <Section>
        <div className="max-w-2xl mx-auto text-center py-10">
          <div className="text-5xl mb-4">🏗️</div>
          <h2 className="font-serif text-2xl font-bold text-blue-900 mb-3">Page Coming Soon</h2>
          <p className="text-blue-600/70 text-sm">This department page is being built. Check back soon for details about team members, ongoing projects, and activities.</p>
        </div>
      </Section>
    </>
  )
}
