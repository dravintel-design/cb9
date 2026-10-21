import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services: Bespoke Residential Design + Build',
  description: 'Architecture, engineering, interiors, landscape and construction from one studio: Complete Residence, Design and Engineering, or Build to Approved Design.',
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
