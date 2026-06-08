'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import slugify from 'slugify'

export default function NewBlogPage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(slugify(val, { lower: true, strict: true }))
  }

  async function handleSave(publish: boolean) {
    if (!title.trim()) { setError('Title is required'); return }
    if (!slug.trim()) { setError('Slug is required'); return }

    setSaving(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    const { error: saveError } = await supabase.from('blogs').insert({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim() || null,
      cover_image_url: coverImageUrl || null,
      author_id: user?.id ?? null,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
    })

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    router.push('/admin/blogs')
    router.refresh()
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/blogs" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-blue-900">New Blog Post</h1>
          <p className="text-sm text-blue-400">Create and publish a new blog post</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
      )}

      <div className="flex flex-col gap-5">
        {/* Cover Image */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Cover Image</label>
          <ImageUpload folder="blogs" value={coverImageUrl} onChange={setCoverImageUrl} label="Upload Cover Image" aspectRatio="aspect-video" />
        </div>

        {/* Main Fields */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Title *</label>
            <input
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. Understanding Hypertension Management"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Slug *</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-400">/blogs/</span>
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="understanding-hypertension-management"
                className="flex-1 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="A short summary shown in blog listings..."
              rows={2}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your full blog post content here..."
              rows={14}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y font-mono"
            />
            <p className="text-xs text-blue-300 mt-1.5">Supports plain text or Markdown.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pb-6">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            <Save size={14} /> Save as Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            <Eye size={14} /> Publish Post
          </button>
        </div>
      </div>
    </div>
  )
}
