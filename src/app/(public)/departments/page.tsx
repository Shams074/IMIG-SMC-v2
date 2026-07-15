import { Section, SectionHeader } from '@/components/ui'
import { departments } from '@/lib/data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function DepartmentsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Structure</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Our Departments</h1>
          <p className="text-white/70 text-lg max-w-xl">
            IMIG SMC operates through 4 specialized departments, each led by talented student officers.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeader
          label="Departments"
          title="Explore Our Core Teams"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {departments.map((dept) => (
            <div key={dept.name} className="bg-white rounded-2xl border border-blue-100 p-8 hover:shadow-lg transition-shadow flex flex-col h-full">
              <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">{dept.name}</h3>
              <p className="text-sm text-blue-600/80 leading-relaxed mb-8 flex-1">{dept.desc}</p>
              <Link
                href={dept.href}
                className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors self-start"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
