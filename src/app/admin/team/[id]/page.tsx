'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditTeamMemberPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('team_members').select('*').eq('id', id).single()
      if (data) {
        setName(data.name)
        setRole(data.role)
        setBio(data.bio ?? '')
        setPhotoUrl(data.photo_url ?? '')
        setLinkedinUrl(data.linkedin_url ?? '')
        setDisplayOrder(data.display_order?.toString() ?? '0')
        setIsActive(data.is_active)
      }
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSave() {
    if (!name.trim()) { setError('Name is required'); return }
    setSaving(true)
    setError('')

    const { error: saveError } = await supabase.from('team_members').update({
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim() || null,
      photo_url: photoUrl || null,
      linkedin_url: linkedinUrl.trim() || null,
      display_order: parseInt(displayOrder) || 0,
      is_active: isActive,
    }).eq('id', id)

    if (saveError) { setError(saveError.message); setSaving(false); return }
    router.push('/admin/team')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Remove this team member?')) return
    await supabase.from('team_members').delete().eq('id', id)
    router.push('/admin/team')
    router.refresh()
  }

  if (loading) return <div className="text-blue-400 text-sm p-8">Loading...</div>

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin/team" className="p-2 hover:bg-blue-100 rounded-xl transition-colors text-blue-500">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Edit Team Member</h1>
            <p className="text-sm text-blue-400">{isActive ? 'Visible on website' : 'Hidden'}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs font-medium">
          <Trash2 size={13} /> Remove
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

      <div className="flex flex-col gap-5">
        <div className="bg-white rounded-2xl border border-blue-100 p-6">
          <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Profile Photo</label>
          <div className="max-w-[180px]">
            <ImageUpload folder="team" value={photoUrl} onChange={setPhotoUrl} aspectRatio="aspect-square" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Role / Title *</label>
            <input value={role} onChange={e => setRole(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
            <input value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Display Order</label>
            <input type="number" value={displayOrder} onChange={e => setDisplayOrder(e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-medium text-blue-800">Visible on website</span>
          </label>
        </div>

        <div className="pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60">
            <Save size={14} /> {saving ? 'Saving…' : 'Update Member'}
          </button>
        </div>
      </div>
    </div>
  )
}
