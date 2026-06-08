'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewTeamMemberPage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!name.trim()) { setError('Name is required'); return }
    if (!role.trim()) { setError('Role is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('team_members').insert({
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim() || null,
      photo_url: photoUrl || null,
      linkedin_url: linkedinUrl.trim() || null,
      display_order: parseInt(displayOrder) || 0,
      is_active: true,
    })

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/team')
    router.refresh()
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/team" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Add Team Member</h1>
          <p className="text-sm text-blue-400">Add a new member to the About page</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        {/* Photo */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Profile Photo</label>
          <div className="max-w-[180px]">
            <ImageUpload folder="team" value={photoUrl} onChange={setPhotoUrl} label="Upload Photo" aspectRatio="aspect-square" />
          </div>
        </div>

        {/* Fields */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Abdul Thawwab"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Role / Title *</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. President"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
              placeholder="Short bio or description..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
            <input value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Display Order</label>
            <input type="number" value={displayOrder} onChange={e => setDisplayOrder(e.target.value)}
              placeholder="0 = first, 1 = second, etc."
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  )
}
