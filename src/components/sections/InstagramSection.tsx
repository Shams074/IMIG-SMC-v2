import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ExternalLink } from 'lucide-react'

export default async function InstagramSection() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('instagram_posts')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(6)

  // If no posts in DB yet, show a nice placeholder CTA
  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-pink-50 to-purple-50 border-y border-pink-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Instagram size={12} /> Instagram
          </div>
          <h2 className="font-serif text-3xl font-bold text-blue-900 mb-3">Follow Our Journey</h2>
          <p className="text-blue-600/70 text-base mb-6 max-w-md mx-auto">
            Stay updated with our latest events, achievements, and medical insights.
          </p>
          <Link
            href="https://instagram.com/imig.smc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            <Instagram size={16} /> @imig.smc
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-pink-50 to-purple-50 border-y border-pink-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              <Instagram size={12} /> Instagram
            </div>
            <h2 className="font-serif text-3xl font-bold text-blue-900">Latest from Instagram</h2>
            <p className="text-blue-500 text-sm mt-1">@imig.smc</p>
          </div>
          <Link
            href="https://instagram.com/imig.smc"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-white border border-pink-200 text-pink-600 font-semibold px-4 py-2 rounded-xl hover:bg-pink-50 transition-colors text-sm"
          >
            <ExternalLink size={13} /> View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.post_url ?? 'https://instagram.com/imig.smc'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-blue-100"
            >
              <Image
                src={post.image_url}
                alt={post.caption ?? 'IMIG SMC Instagram post'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                {post.caption && (
                  <p className="text-white text-[10px] leading-tight line-clamp-3">{post.caption}</p>
                )}
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={12} className="text-white drop-shadow" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link
            href="https://instagram.com/imig.smc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pink-600 font-semibold text-sm"
          >
            <Instagram size={14} /> Follow @imig.smc
          </Link>
        </div>
      </div>
    </section>
  )
}
