import type { MetadataRoute } from 'next'
import { SITE_LIVE, SITE_URL } from '@/lib/site'

/** Crawlers are turned away from the review preview; the live site is open to them. */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_LIVE) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
