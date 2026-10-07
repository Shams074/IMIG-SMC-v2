'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

export default function AdminMembershipPage() {
  const supabase = createClient()

  const [studentIsOpen, setStudentIsOpen] = useState(false)
  const [studentFormUrl, setStudentFormUrl] = useState('')

  const [coreIsOpen, setCoreIsOpen] = useState(false)
  const [coreFormUrl, setCoreFormUrl] = useState('')

  const [ambassadorIsOpen, setAmbassadorIsOpen] = useState(false)
  const [ambassadorFormUrl, setAmbassadorFormUrl] = useState('')

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
        setStudentIsOpen(data.student_is_open ?? false)
        setStudentFormUrl(data.student_form_url ?? '')
        setCoreIsOpen(data.core_is_open ?? false)
        setCoreFormUrl(data.core_form_url ?? '')
        setAmbassadorIsOpen(data.ambassador_is_open ?? false)
        setAmbassadorFormUrl(data.ambassador_form_url ?? '')
      }
      setLoading(false)
    }
    load()
  }, [])

  function isValidUrl(string: string) {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setSaved(false)

    // Validation
    if (studentIsOpen && (!studentFormUrl.trim() || !isValidUrl(studentFormUrl))) {
      setError('Please provide a valid URL for SMC Student Member when open.')
      setSaving(false)
      return
    }
    if (coreIsOpen && (!coreFormUrl.trim() || !isValidUrl(coreFormUrl))) {
      setError('Please provide a valid URL for SMC Core Team Member when open.')
      setSaving(false)
      return
    }
    if (ambassadorIsOpen && (!ambassadorFormUrl.trim() || !isValidUrl(ambassadorFormUrl))) {
      setError('Please provide a valid URL for Campus Ambassador when open.')
      setSaving(false)
      return
    }

    const payload = {
      student_is_open: studentIsOpen,
      student_form_url: studentFormUrl.trim(),
      core_is_open: coreIsOpen,
      core_form_url: coreFormUrl.trim(),
      ambassador_is_open: ambassadorIsOpen,
      ambassador_form_url: ambassadorFormUrl.trim(),
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

  const SectionForm = ({ 
    title, isOpen, setIsOpen, url, setUrl 
  }: { 
    title: string, isOpen: boolean, setIsOpen: (val: boolean) => void, url: string, setUrl: (val: string) => void 
  }) => (
    <div className={`rounded-2xl border-2 p-6 mb-5 transition-colors ${isOpen ? 'border-teal-400 bg-teal-50' : 'border-blue-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-blue-900 text-base">{title}</h3>
          <p className="text-sm text-blue-500 mt-0.5">
            {isOpen ? '🟢 Registrations are OPEN' : '🔴 Registrations are CLOSED'}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
            isOpen ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
          }`}
        >
          {isOpen ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          {isOpen ? 'Open' : 'Closed'}
        </button>
      </div>
      <div>
        <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
          Registration Form URL
        </label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://forms.google.com/..."
          className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {url && isValidUrl(url) && (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1.5">
            <ExternalLink size={11} /> Preview form
          </a>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl">
      <div className="mb-7">
        <h1 className="text-xl font-bold text-blue-900">Membership Registration</h1>
        <p className="text-sm text-blue-400">Control when and how students can register for each IMIG SMC membership type</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
      )}
      {saved && (
        <div className="bg-teal-50 border border-teal-200 text-teal-700 rounded-xl px-4 py-3 text-sm mb-5">
          ✅ Settings saved! The membership page on your website has been updated.
        </div>
      )}

      <SectionForm 
        title="1. SMC Student Member" 
        isOpen={studentIsOpen} setIsOpen={setStudentIsOpen} 
        url={studentFormUrl} setUrl={setStudentFormUrl} 
      />
      <SectionForm 
        title="2. SMC Core Team Member" 
        isOpen={coreIsOpen} setIsOpen={setCoreIsOpen} 
        url={coreFormUrl} setUrl={setCoreFormUrl} 
      />
      <SectionForm 
        title="3. Campus Ambassador" 
        isOpen={ambassadorIsOpen} setIsOpen={setAmbassadorIsOpen} 
        url={ambassadorFormUrl} setUrl={setAmbassadorFormUrl} 
      />

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
