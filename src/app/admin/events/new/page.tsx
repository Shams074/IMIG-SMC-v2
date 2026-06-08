'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewEventPage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [registrationLink, setRegistrationLink] = useState('')
  const [maxSeats, setMaxSeats] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('events').insert({
      title: title.trim(),
      description: description.trim() || null,
      date: date || null,
      venue: venue.trim() || null,
      banner_url: bannerUrl || null,
      registration_link: registrationLink.trim() || null,
      max_seats: maxSeats ? parseInt(maxSeats) : null,
      is_active: true,
    })

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/events')
    router.refresh()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/events" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Create Event</h1>
          <p className="text-sm text-blue-400">Add a new event to the website</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        {/* Banner */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Event Banner</label>
          <ImageUpload folder="events" value={bannerUrl} onChange={setBannerUrl} label="Upload Event Banner" aspectRatio="aspect-video" />
        </div>

        {/* Fields */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Event Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Research Workshop on Clinical Trials"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              placeholder="Describe the event, agenda, guest speakers..."
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
              <input type="number" value={maxSeats} onChange={e => setMaxSeats(e.target.value)} placeholder="Leave empty for unlimited"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Venue</label>
            <input value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. SMC Auditorium / Online (Zoom)"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Registration Link</label>
            <input value={registrationLink} onChange={e => setRegistrationLink(e.target.value)} placeholder="https://forms.google.com/..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  )
}
