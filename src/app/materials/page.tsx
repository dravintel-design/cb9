import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import MaterialsPage from '@/components/pages/MaterialsPage'

export const metadata: Metadata = {
  title: 'Materials & Craft: Materials That Age Beautifully',
  description: 'Eight curated material families: stone, wood, metal, glass, lighting, hardware, sanitaryware and finishes, chosen for how they age and logged per residence.',
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
