'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    if (!email || !password) { setError('Please enter email and password.'); return }
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
            IM
          </div>
          <h1 className="text-2xl font-bold text-white">IMIG SMC</h1>
          <p className="text-blue-300 text-sm mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-lg font-bold text-blue-900 mb-6">Sign In</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="admin@imigsmc.com"
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-xl text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-blue-200 rounded-xl text-sm text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-xs text-blue-400 mt-6">
            Access restricted to IMIG SMC administrators.
          </p>
        </div>
      </div>
    </div>
  )
}
