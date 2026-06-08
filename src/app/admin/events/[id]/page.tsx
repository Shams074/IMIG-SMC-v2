'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [registrationLink, setRegistrationLink] = useState('')
  const [maxSeats, setMaxSeats] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('events').select('*').eq('id', id).single()
      if (data) {
        setTitle(data.title)
        setDescription(data.description ?? '')
        setDate(data.date ? format(new Date(data.date), "yyyy-MM-dd'T'HH:mm") : '')
        setVenue(data.venue ?? '')
        setBannerUrl(data.banner_url ?? '')
        setRegistrationLink(data.registration_link ?? '')
        setMaxSeats(data.max_seats?.toString() ?? '')
        setIsActive(data.is_active)
      }
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSave() {
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('events').update({
      title: title.trim(),
      description: description.trim() || null,
      date: date || null,
      venue: venue.trim() || null,
      banner_url: bannerUrl || null,
      registration_link: registrationLink.trim() || null,
      max_seats: maxSeats ? parseInt(maxSeats) : null,
      is_active: isActive,
    }).eq('id', id)

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/events')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this event? This cannot be undone.')) return
    await supabase.from('events').delete().eq('id', id)
    router.push('/admin/events')
    router.refresh()
  }

  if (loading) return <div className="text-blue-400 text-sm p-8">Loading...</div>

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin/events" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Edit Event</h1>
            <p className="text-sm text-blue-400">{isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs font-medium">
          <Trash2 size={13} /> Delete
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Event Banner</label>
          <ImageUpload folder="events" value={bannerUrl} onChange={setBannerUrl} aspectRatio="aspect-video" />
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Date & Time</label>
              <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Max Seats</label>
              <input type="number" value={maxSeats} onChange={e => setMaxSeats(e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Venue</label>
            <input value={venue} onChange={e => setVenue(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Registration Link</label>
            <input value={registrationLink} onChange={e => setRegistrationLink(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-medium text-blue-800">Event is active / visible on website</span>
          </label>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Update Event'}
          </button>
        </div>
      </div>
    </div>
  )
}
