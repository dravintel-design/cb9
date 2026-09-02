import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ContactPage from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Tell us about your plot, your family and your brief. A founder-led conversation and a free first site visit: Corner Brick 9, Avadi, Chennai.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  )
}
