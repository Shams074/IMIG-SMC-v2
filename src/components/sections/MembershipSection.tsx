'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react'

export default function MembershipSection() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    year_of_study: '',
    department: '',
    reason: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const supabase = createClient()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.full_name.trim() || !form.email.trim()) {
      setError('Full name and email are required.')
      return
    }
    setStatus('loading')
    setError('')

    const { error: submitError } = await supabase
      .from('membership_registrations')
      .insert({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        year_of_study: form.year_of_study || null,
        department: form.department.trim() || null,
        reason: form.reason.trim() || null,
        status: 'pending',
      })

    if (submitError) {
      setError('Something went wrong. Please try again.')
      setStatus('error')
      return
    }

    setStatus('success')
    setForm({ full_name: '', email: '', phone: '', year_of_study: '', department: '', reason: '' })
  }

  return (
    <section id="membership" className="py-16 px-6 bg-white border-y border-blue-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <UserPlus size={12} /> Membership
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-900 mb-3">Join IMIG SMC</h2>
          <p className="text-blue-600/70 text-base max-w-xl mx-auto">
            Become part of a community of aspiring internists. Fill out the form and our team will reach out to you.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
            <CheckCircle size={40} className="text-teal-500 mx-auto mb-4" />
            <h3 className="font-bold text-teal-800 text-lg mb-2">Application Submitted!</h3>
            <p className="text-teal-700 text-sm">
              Thank you for applying. Our team will review your application and reach out via email soon.
            </p>
          </div>
        ) : (
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 md:p-8">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Abdul Thawwab"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Year of Study</label>
                <select
                  name="year_of_study"
                  value={form.year_of_study}
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  <option value="">Select year</option>
                  <option>1st Year (1st Prof)</option>
                  <option>2nd Year (2nd Prof)</option>
                  <option>3rd Year (3rd Prof Part I)</option>
                  <option>4th Year (3rd Prof Part II)</option>
                  <option>5th Year (Final Prof)</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Why do you want to join IMIG?</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows={3}
                placeholder="Share your motivation for joining..."
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <UserPlus size={15} />
              {status === 'loading' ? 'Submitting…' : 'Submit Application'}
            </button>

            <p className="text-center text-xs text-blue-400 mt-4">
              By submitting, you agree to be contacted by the IMIG SMC team.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
