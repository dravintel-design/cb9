import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { PROJECTS, projectHref } from '@/data/projects'

const PAGES = [
  '', '/about', '/projects', '/design-process', '/build-process',
  '/services', '/materials', '/journal', '/contact', '/privacy', '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })),
    ...PROJECTS.map(p => ({ url: `${SITE_URL}${projectHref(p.id)}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
