import type { Metadata } from 'next'
import Header           from '@/components/layout/Header'
import Footer           from '@/components/layout/Footer'
import WorkHero         from '@/components/work/WorkHero'
import WorkGrid         from '@/components/work/WorkGrid'
import WorkProcess      from '@/components/work/WorkProcess'
import WorkTestimonials from '@/components/work/WorkTestimonials'
import WorkCTA          from '@/components/work/WorkCTA'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Portfolio of completed residential and commercial projects by Corner Brick 9 — turnkey builds in Chennai, Avadi, Thiruvallur, and Pattibiram. No subcontractors. IS-standard tested.',
}

export default function WorkPage() {
  return (
    <>
      <Header />
      <main>
        <WorkHero />
        <WorkGrid />
        <WorkProcess />
        <WorkTestimonials />
        <WorkCTA />
      </main>
      <Footer />
    </>
  )
}
