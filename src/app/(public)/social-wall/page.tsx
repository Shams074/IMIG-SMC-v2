import { Section, SectionHeader } from '@/components/ui'
import { Mail, Linkedin, Instagram, MapPin, Youtube, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function SocialWallPage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('instagram_posts')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .limit(6)

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-300 mb-3">Social Wall</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Connect with Us</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Reach us via email, LinkedIn, or follow our journey on Instagram. We'd love to hear from you.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <SectionHeader label="Contact Info" title="How to Reach Us" />
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'Internal Medicine Interest Group SMC', href: 'https://linkedin.com/company/imigsmc' },
                { icon: <Instagram size={18} />, label: 'Instagram', value: `@${siteConfig.instagram}`, href: 'https://instagram.com/imig.smc' },
                { icon: <Youtube size={18} />, label: 'YouTube', value: 'IMIG SMC', href: siteConfig.youtube },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Sindh Medical College, Karachi', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-blue-50 rounded-2xl border border-blue-100 p-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-900 font-medium text-sm hover:text-blue-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-blue-900 font-medium text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Social Wall */}
          <div>
            <SectionHeader label="Social Wall" title="Latest from Instagram" />
            
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={post.post_url ?? 'https://instagram.com/imig.smc'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-blue-100"
                  >
                    <Image
                      src={post.image_url}
                      alt={post.caption ?? 'IMIG SMC Instagram post'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      {post.caption && (
                        <p className="text-white text-[10px] leading-tight line-clamp-3">{post.caption}</p>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={12} className="text-white drop-shadow" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 border border-dashed border-blue-200 rounded-2xl p-6 text-center text-blue-500 mb-3 text-sm">
                Connect with our latest updates on Instagram.
              </div>
            )}

            <p className="text-xs text-blue-400 mt-3 text-center">
              Follow <a href="https://instagram.com/imig.smc" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-500 hover:underline">@imig.smc</a> on Instagram for live updates
            </p>
          </div>
        </div>
      </Section>

      {/* Google Map */}
      <Section className="bg-blue-50/50 border-t border-blue-100 !pt-0">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Location" title="Find Us" />
          <div className="rounded-2xl overflow-hidden border border-blue-200 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.4!2d67.0099!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7e4cd72ce7%3A0x3e7b!2sSindh%20Medical%20College%2C%20Karachi!5e0!3m2!1sen!2spk!4v1"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sindh Medical College, Karachi"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
