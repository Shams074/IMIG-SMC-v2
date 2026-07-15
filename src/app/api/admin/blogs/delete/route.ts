import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Get ID from form data
  const formData = await request.formData()
  const id = formData.get('id') as string

  if (!id) {
    return new NextResponse('Bad Request: Missing id', { status: 400 })
  }

  // Delete the blog
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)

  if (error) {
    return new NextResponse(error.message, { status: 500 })
  }

  // Redirect back to blogs page
  return NextResponse.redirect(new URL('/admin/blogs', request.url), 303)
}
