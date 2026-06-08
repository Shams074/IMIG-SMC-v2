import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
