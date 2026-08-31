import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BuildProcessPage from '@/components/pages/BuildProcessPage'

export const metadata: Metadata = {
  title: 'Build Process — Corner Brick 9 | Engineering You Can Audit',
  description: 'Soil testing to IS 1888, concrete cube-tested to IS 456, every trade under CB9 site management, and a documented handover — the CB9 build process.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <BuildProcessPage />
      </main>
      <Footer />
    </>
  )
}
