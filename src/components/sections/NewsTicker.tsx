'use client'
import { tickerItems } from '@/lib/data'

export default function NewsTicker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="bg-blue-100 border-y border-blue-200 py-3 flex items-center gap-4 overflow-hidden">
      <div className="flex-shrink-0 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded ml-4">
        Updates
      </div>
      <div className="ticker-track flex-1">
        <div className="ticker-inner">
          {doubled.map((item, i) => (
            <span key={i} className="text-sm text-blue-800 font-medium flex items-center gap-2">
              <span className="text-blue-400 text-[8px]">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
