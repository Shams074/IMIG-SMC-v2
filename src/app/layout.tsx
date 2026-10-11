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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700&family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}




