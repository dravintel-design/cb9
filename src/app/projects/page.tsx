import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ProjectsPage from '@/components/pages/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projects: Homes & Concept Residences',
  description: 'Completed homes and clearly labelled concept studies across Chennai and Tamil Nadu. See our selected homes and how we approach design and construction.',
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ProjectsPage />
      </main>
      <Footer />
    </>
  )
}
