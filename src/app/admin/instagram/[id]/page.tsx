'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditInstagramPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('instagram_posts').select('*').eq('id', id).single()
      if (data) {
        setImageUrl(data.image_url)
        setCaption(data.caption ?? '')
        setPostUrl(data.post_url ?? '')
        setDisplayOrder(data.display_order?.toString() ?? '0')
        setIsActive(data.is_active)
      }
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSave() {
    if (!imageUrl) { setError('Image URL is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('instagram_posts').update({
      image_url: imageUrl,
      caption: caption.trim() || null,
      post_url: postUrl.trim() || null,
      display_order: parseInt(displayOrder) || 0,
      is_active: isActive,
    }).eq('id', id)

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/instagram')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this Instagram post? This cannot be undone.')) return
    await supabase.from('instagram_posts').delete().eq('id', id)
    router.push('/admin/instagram')
    router.refresh()
  }

  if (loading) return <div className="text-blue-400 text-sm p-8">Loading...</div>

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin/instagram" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Edit Instagram Post</h1>
            <p className="text-sm text-blue-400">{isActive ? 'Active / Visible' : 'Hidden'}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs font-medium">
          <Trash2 size={13} /> Delete
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        {/* Image Upload */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">
            Post Screenshot
          </label>
          <ImageUpload
            folder="blogs"
            value={imageUrl}
            onChange={setImageUrl}
            aspectRatio="aspect-square"
          />
        </div>

        {/* Fields */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Caption</label>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              rows={3}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Instagram Post Link</label>
            <input
              value={postUrl}
              onChange={e => setPostUrl(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={e => setDisplayOrder(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 accent-pink-500" />
            <span className="text-sm font-medium text-blue-800">Post is active / visible on homepage</span>
          </label>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-opacity disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Update Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
