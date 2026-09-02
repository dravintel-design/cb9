import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services: Bespoke Residential Design + Build',
  description: 'Architecture, interior design, construction, project management, structural engineering, renovation, landscape, and consultation, one studio.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ServicesPage />
      </main>
      <Footer />
    </>
  )
}
