import type { Metadata } from 'next'
// import '@/styles/globals.css'
// import './globals.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'IMIG SMC — Internal Medicine Interest Group',
  description: 'Internal Medicine Interest Group at Sindh Medical College — Registered Members of ACP.',
  keywords: 'IMIG, internal medicine, Sindh Medical College, ACP, medical students',
  openGraph: {
    title: 'IMIG SMC',
    description: 'Advancing Internal Medicine at Sindh Medical College',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
