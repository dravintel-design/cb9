import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import MaterialsPage from '@/components/pages/MaterialsPage'

export const metadata: Metadata = {
  title: 'Materials Library — Corner Brick 9 | Materials That Age Beautifully',
  description: 'Twelve material categories specified for performance and provenance — every delivery certified, every batch logged in your project file.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <MaterialsPage />
      </main>
      <Footer />
    </>
  )
}
