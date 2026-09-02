import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import JournalPage from '@/components/pages/JournalPage'

export const metadata: Metadata = {
  title: 'Journal: Building Knowledge, Openly',
  description: 'Essays, site stories, engineering insights, and video lessons from the CB9 studio, education for informed home builders.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <JournalPage />
      </main>
      <Footer />
    </>
  )
}
