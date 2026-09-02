import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ProjectsPage from '@/components/pages/ProjectsPage'

export const metadata: Metadata = {
  title: 'Projects: Homes & Concept Residences',
  description: 'Completed homes and honest concept studies across Chennai: residential, villas, farmhouses, interiors, and renovations, all fully documented.',
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
