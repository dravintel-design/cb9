import type { Metadata } from 'next'
import Header          from '@/components/layout/Header'
import Footer          from '@/components/layout/Footer'
import ServicesHero    from '@/components/services/ServicesHero'
import ServicesMarquee from '@/components/services/ServicesMarquee'
import ServicePanels   from '@/components/services/ServicePanels'
import ServicesFAQ     from '@/components/services/ServicesFAQ'
import ServicesCTA     from '@/components/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Turnkey construction services from Corner Brick 9 — design & planning, IS-standard structural works, MEP, interior finishing, and video-documented handover. All done in-house. Zero subcontractors.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesMarquee />
        <ServicePanels />
        <ServicesFAQ />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
