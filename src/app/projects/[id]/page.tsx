import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ProjectDetailPage from '@/components/pages/ProjectDetailPage'
import { PROJECTS, projectHref, statusLabel } from '@/data/projects'

// Only the listed projects exist; any other id is a 404 rather than an empty page.
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = PROJECTS.find(x => x.id === params.id)
  if (!p) return {}
  return {
    title: `${p.title}: ${statusLabel(p)}`,
    description: `${p.note} ${p.location}.`,
    alternates: { canonical: projectHref(p.id) },
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id)
  if (!project) notFound()
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ProjectDetailPage project={project} />
      </main>
      <Footer />
    </>
  )
}
