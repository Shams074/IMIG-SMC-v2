'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setSlug(data.slug)
        setExcerpt(data.excerpt ?? '')
        setContent(data.content ?? '')
        setCoverImageUrl(data.cover_image_url ?? '')
        setPublished(data.published)
      }
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSave(publish: boolean) {
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('blogs').update({
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim() || null,
      cover_image_url: coverImageUrl || null,
      published: publish,
      published_at: publish && !published ? new Date().toISOString() : undefined,
    }).eq('id', id)

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/blogs')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    await supabase.from('blogs').delete().eq('id', id)
    router.push('/admin/blogs')
    router.refresh()
  }

  if (loading) return <div className="text-blue-400 text-sm p-8">Loading...</div>

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Edit Blog Post</h1>
            <p className="text-sm text-blue-400">{published ? 'Currently Published' : 'Draft'}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs font-medium transition-colors">
          <Trash2 size={13} /> Delete
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Cover Image</label>
          <ImageUpload folder="blogs" value={coverImageUrl} onChange={setCoverImageUrl} aspectRatio="aspect-video" />
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Slug</label>
            <input value={slug} onChange={e => setSlug(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Content</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={14}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y font-mono" />
          </div>
        </div>

        <div className="flex items-center gap-3 pb-6">
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Save size={14} /> Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Eye size={14} /> {published ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
