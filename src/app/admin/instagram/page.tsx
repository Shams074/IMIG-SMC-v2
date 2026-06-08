import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Instagram } from 'lucide-react'
import { format } from 'date-fns'

export default async function AdminInstagramPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('instagram_posts')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-blue-900">Instagram Posts</h1>
          <p className="text-sm text-blue-400">
            {posts?.length ?? 0} posts · shown on homepage automatically
          </p>
        </div>
        <Link href="/admin/instagram/new"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity">
          <Plus size={15} /> Add Post
        </Link>
      </div>

      {/* How it works info box */}
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Instagram size={18} className="text-pink-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-pink-800 mb-1">How this works</p>
          <p className="text-xs text-pink-700 leading-relaxed">
            Instagram does not have a public API. To show posts on the website, take a screenshot of your Instagram post,
            upload it here with the post link. It will automatically appear in the Instagram section on the homepage.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {posts.map(post => (
              <div key={post.id} className="relative group rounded-xl overflow-hidden border border-blue-100 aspect-square bg-blue-50">
                <Image src={post.image_url} alt={post.caption ?? ''} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Link href={`/admin/instagram/${post.id}`}
                    className="flex items-center gap-1.5 bg-white text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    <Pencil size={11} /> Edit
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-[10px] truncate">{post.caption ?? 'No caption'}</p>
                  <p className="text-white/60 text-[9px]">
                    {format(new Date(post.created_at), 'MMM d, yyyy')} ·{' '}
                    <span className={post.is_active ? 'text-teal-300' : 'text-red-300'}>
                      {post.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300">
            <Instagram size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm mb-2">No posts added yet.</p>
            <Link href="/admin/instagram/new" className="text-pink-500 hover:underline text-sm font-medium">
              Add your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
