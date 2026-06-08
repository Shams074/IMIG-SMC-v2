'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Users, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

export default function AdminMembershipPage() {
  const supabase = createClient()

  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [deadline, setDeadline] = useState('')
  const [settingsId, setSettingsId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('membership_settings')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        setSettingsId(data.id)
        setIsOpen(data.is_open)
        setTitle(data.title ?? '')
        setDescription(data.description ?? '')
        setFormUrl(data.form_url ?? '')
        setDeadline(data.deadline ?? '')
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)

    const payload = {
      is_open: isOpen,
      title: title.trim(),
      description: description.trim(),
      form_url: formUrl.trim(),
      deadline: deadline.trim(),
      updated_at: new Date().toISOString(),
    }

    let saveError
    if (settingsId) {
      const { error } = await supabase
        .from('membership_settings')
        .update(payload)
        .eq('id', settingsId)
      saveError = error
    } else {
      const { error } = await supabase
        .from('membership_settings')
        .insert(payload)
      saveError = error
    }

    if (saveError) {
      setError(saveError.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  if (loading) return <div className="text-blue-400 text-sm p-8">Loading...</div>

  return (
    <div className="max-w-2xl">
      <div className="mb-7">
        <h1 className="text-xl font-bold text-blue-900">Membership Registration</h1>
        <p className="text-sm text-blue-400">Control when and how students can register for IMIG SMC membership</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
      )}
      {saved && (
        <div className="bg-teal-50 border border-teal-200 text-teal-700 rounded-xl px-4 py-3 text-sm mb-5">
          ✅ Settings saved! The membership page on your website has been updated.
        </div>
      )}

      {/* Toggle Card */}
      <div className={`rounded-2xl border-2 p-6 mb-5 transition-colors ${
        isOpen ? 'border-teal-400 bg-teal-50' : 'border-blue-200 bg-white'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-blue-900 text-base">Registration Status</h3>
            <p className="text-sm text-blue-500 mt-0.5">
              {isOpen
                ? '🟢 Membership registration is OPEN — visible on website'
                : '🔴 Membership registration is CLOSED — hidden from website'}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
              isOpen
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
            }`}
          >
            {isOpen ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            {isOpen ? 'Open' : 'Closed'}
          </button>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
            Banner Title
          </label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Membership Applications Now Open!"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="Tell students what to expect, who can apply, what they get..."
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
            Registration Form URL
          </label>
          <input
            value={formUrl}
            onChange={e => setFormUrl(e.target.value)}
            placeholder="https://forms.google.com/your-form-link"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formUrl && (
            <a href={formUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1.5">
              <ExternalLink size={11} /> Preview form
            </a>
          )}
          <p className="text-xs text-blue-300 mt-1">Paste your Google Form, Typeform, or any registration link here.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
            Application Deadline
          </label>
          <input
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            placeholder="e.g. December 31, 2025 or Rolling basis"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Preview box */}
      <div className="mt-5 bg-blue-50 rounded-2xl border border-blue-200 p-5">
        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">Preview — How it appears on website</p>
        {isOpen ? (
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} />
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Membership Open</span>
            </div>
            <h3 className="font-bold text-lg mb-1">{title || 'Membership Applications Open!'}</h3>
            <p className="text-white/80 text-sm mb-3">{description || 'Applications are now open. Click below to register.'}</p>
            {deadline && <p className="text-xs text-white/60 mb-3">⏰ Deadline: {deadline}</p>}
            <div className="inline-block bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg">
              Apply Now →
            </div>
          </div>
        ) : (
          <div className="bg-blue-100 rounded-xl p-5 text-center text-blue-400 text-sm">
            Registration is closed — this banner is hidden from visitors.
          </div>
        )}
      </div>

      <div className="mt-5 pb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
        >
          <Save size={14} /> {saving ? 'Saving…' : 'Save & Publish to Website'}
        </button>
      </div>
    </div>
  )
}
