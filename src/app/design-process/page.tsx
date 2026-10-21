import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import DesignProcessPage from '@/components/pages/DesignProcessPage'

export const metadata: Metadata = {
  title: 'Design Process: Eleven Stages from Discovery to Handover',
  description: 'From discovery to handover: the eleven-stage CB9 design process and the eight-principle Design DNA behind every drawing.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <DesignProcessPage />
      </main>
      <Footer />
    </>
  )
}
