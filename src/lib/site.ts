/**
 * Site-wide facts in one place. Contact details, launch state and the service
 * list are read from here by the header, footer, contact page, enquiry API and
 * metadata, so the final details from the client are a single-file update.
 */

/**
 * Launch switch. While false the site is a review preview: search engines are
 * told not to index it, and unfinished entries (draft journal articles, empty
 * photo slots) are shown with preview labels instead of being hidden.
 * Set NEXT_PUBLIC_SITE_LIVE=true in Vercel only after the client's final approval.
 */
export const SITE_LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === 'true'

/**
 * Absolute base for canonical URLs, the sitemap and link-preview images.
 * Set NEXT_PUBLIC_SITE_URL=https://cornerbrick9.com once that domain points at
 * this site. Until then Vercel's own production URL is used, so links shared
 * from the preview still show their image.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

/**
 * PLACEHOLDERS: the client will supply the final contact details after design
 * approval. Everything that shows or dials these reads them from here.
 */
export const CONTACT = {
  phoneDisplay: '+91 98765 43210',
  /** Digits only, with country code, for tel: and wa.me links. */
  phoneRaw: '919876543210',
  whatsappRaw: '919876543210',
  email: 'hello@cornerbrick9.com',
  area: 'Avadi, Chennai, Tamil Nadu',
  hours: 'Mon to Sat · 9:30 AM to 6:30 PM',
  /** Google Maps query for the exact office pin. null until the address is confirmed. */
  mapQuery: null as string | null,
} as const

/**
 * Service promises awaiting the client's confirmation. Copy that depends on one
 * of these renders only once it is set, so nothing unconfirmed is published.
 */
export const PROMISES = {
  /** e.g. 'Reply within one working day' */
  replyTime: null as string | null,
} as const

/** The finished guide. null hides every link to it, so nothing points at a missing page. */
export const GUIDE_URL: string | null = null

/** The three ways to work with CB9. Services page tiers and the enquiry form both use this list. */
export const SERVICES = [
  {
    id: 'complete-residence',
    label: 'Complete Residence',
    note: 'Design, engineering, interiors, landscape and build. One coordinated journey, one accountable project team.',
  },
  {
    id: 'design-engineering',
    label: 'Design and Engineering',
    note: 'The full design and engineering package, developed to construction documentation.',
  },
  {
    id: 'build-to-design',
    label: 'Build to Approved Design',
    note: 'You already have drawings you believe in; we engineer, manage and build them.',
  },
] as const

export type ServiceId = (typeof SERVICES)[number]['id']

/** Link into the enquiry form with the service and/or site-visit request remembered. */
export function enquiryHref(opts: { service?: ServiceId; visit?: boolean } = {}) {
  const q = new URLSearchParams()
  if (opts.service) q.set('service', opts.service)
  if (opts.visit) q.set('visit', '1')
  const s = q.toString()
  return `/contact${s ? `?${s}` : ''}#enquiry`
}
