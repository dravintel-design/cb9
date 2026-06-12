import type { Metadata } from 'next'
import Header                from '@/components/layout/Header'
import Footer                from '@/components/layout/Footer'
import AboutHero             from '@/components/about/AboutHero'
import AboutFounder          from '@/components/about/AboutFounder'
import AboutDifferentiators  from '@/components/about/AboutDifferentiators'
import AboutStandards        from '@/components/about/AboutStandards'
import AboutAreas            from '@/components/about/AboutAreas'
import AboutCTA              from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Corner Brick 9 — founded by M. Sathish Kumar (B.E./M.Tech Civil Engineering). Zero subcontractors, IS-standard testing at every stage, open-cost transparency, and video-documented handover. Based in Avadi and Thiruvallur, Chennai.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutFounder />
        <AboutDifferentiators />
        <AboutStandards />
        <AboutAreas />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
