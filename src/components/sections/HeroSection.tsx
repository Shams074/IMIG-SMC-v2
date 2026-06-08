import Link from 'next/link'
import { heroStats } from '@/lib/data'

export default function HeroSection() {
  return (
    <div className="relative min-h-[580px] bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center overflow-hidden">
      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-800/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
            Advancing<br />
            <em className="not-italic text-blue-200">Internal Medicine</em> at<br />
            Sindh Medical College
          </h1>

          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
            A student-led organization dedicated to explore Internal Medicine through clinical excellence, research, mentorship and networking.
          </p>

          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
            From workshops and resources to research and networking — IMIG SMC has you covered throughout your medical school.
          </p>
        </div>

        {/* Stats cards — desktop */}
        <div className="absolute bottom-10 right-6 hidden lg:flex gap-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-md"
            >
              <strong className="block font-serif text-3xl font-bold text-white">{stat.value}</strong>
              <small className="text-[11px] text-white/60 uppercase tracking-wider font-medium">{stat.label}</small>
            </div>
          ))}
        </div>

        {/* Mobile stats */}
        <div className="grid grid-cols-2 gap-3 mt-10 lg:hidden">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center backdrop-blur-md"
            >
              <strong className="block font-serif text-xl font-bold text-white">{stat.value}</strong>
              <small className="text-[10px] text-white/60 uppercase tracking-wider">{stat.label}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
