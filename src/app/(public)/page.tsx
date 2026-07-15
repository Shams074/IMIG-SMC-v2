import HeroSection from '@/components/sections/HeroSection'
import NewsTicker from '@/components/sections/NewsTicker'
import HighlightsSection from '@/components/sections/HighlightsSection'
import EventsPreview from '@/components/sections/EventsPreview'
import ImpactSection from '@/components/sections/ImpactSection'
import ContactSection from '@/components/sections/ContactSection'

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsTicker />
      <HighlightsSection />
      <EventsPreview />
      <ImpactSection />
      <ContactSection />
    </>
  )
}
