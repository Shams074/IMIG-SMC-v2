import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { format } from 'date-fns'

export default async function AdminBlogsPage() {
  const supabase = createClient()
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-bold text-blue-900">Blog Posts</h1>
          <p className="text-sm text-blue-400">{blogs?.length ?? 0} total posts</p>
        </div>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
        {blogs && blogs.length > 0 ? (
          <div className="divide-y divide-blue-50">
            {blogs.map(blog => (
              <div key={blog.id} className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors">
                {blog.cover_image_url && (
                  <img src={blog.cover_image_url} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-blue-900 text-sm truncate">{blog.title}</p>
                  <p className="text-xs text-blue-400 truncate">{blog.excerpt ?? blog.slug}</p>
                  <p className="text-[11px] text-blue-300 mt-0.5">{format(new Date(blog.created_at), 'MMM d, yyyy')}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  blog.published ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-600'
                }`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {blog.published && (
                    <Link href={`/blogs/${blog.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-400 transition-colors">
                      <Eye size={13} />
                    </Link>
                  )}
                  <Link href={`/admin/blogs/${blog.id}`} className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 transition-colors">
                    <Pencil size={13} />
                  </Link>
                  <DeleteBlogButton id={blog.id} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-blue-300">
            <p className="text-sm mb-2">No blog posts yet.</p>
            <Link href="/admin/blogs/new" className="text-blue-500 hover:underline text-sm font-medium">Create your first post →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

function DeleteBlogButton({ id }: { id: string }) {
  return (
    <form action={`/api/admin/blogs/delete`} method="POST">
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors" onClick={(e) => {
        if (!confirm('Delete this blog post?')) e.preventDefault()
      }}>
        <Trash2 size={13} />
      </button>
    </form>
  )
}
