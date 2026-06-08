'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function NewInstagramPostPage() {
  const router = useRouter()
  const supabase = createClient()

  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!imageUrl) { setError('Please upload an image first'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('instagram_posts').insert({
      image_url: imageUrl,
      caption: caption.trim() || null,
      post_url: postUrl.trim() || null,
      display_order: parseInt(displayOrder) || 0,
      is_active: true,
    })

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/instagram')
    router.refresh()
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/instagram" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Add Instagram Post</h1>
          <p className="text-sm text-blue-400">Upload a screenshot of your Instagram post</p>
        </div>
      </div>

      {/* Guide */}
      <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
        <Instagram size={16} className="text-pink-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-pink-700 leading-relaxed">
          <strong>How to add:</strong> Open Instagram on your phone → find the post → take a screenshot →
          upload it here. Add the post link so visitors can tap to view on Instagram.
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        {/* Image Upload */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">
            Post Screenshot *
          </label>
          <ImageUpload
            folder="blogs"
            value={imageUrl}
            onChange={setImageUrl}
            label="Upload Post Screenshot"
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
              placeholder="Paste the Instagram post caption here..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Instagram Post Link</label>
            <input
              value={postUrl}
              onChange={e => setPostUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-blue-300 mt-1">Visitors will be taken to this link when they click the post.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Display Order</label>
            <input
              type="number"
              value={displayOrder}
              onChange={e => setDisplayOrder(e.target.value)}
              placeholder="0 = first"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-opacity disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Add Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
