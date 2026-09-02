import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'The Studio: Design, Engineering & Build, Chennai',
  description: 'A residential architecture, engineering, and build studio in Chennai. One family, one site, one story, designed and built by our own hands.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  )
}
