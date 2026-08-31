'use client'

import { useEffect } from 'react'

/**
 * Marks the document for static capture when `?print=1` is present.
 *
 * The site animates most content in on scroll (Framer Motion `whileInView`
 * starts at opacity 0) and pins several sections with ScrollTrigger. Both
 * would render blank or half-built in a headless PDF capture, so print mode
 * sets `data-print` on <html>; CSS then forces every element to its resting
 * visible state and the pinned components skip ScrollTrigger entirely.
 *
 * The flag is read straight from `window.location` rather than
 * `useSearchParams()`: these routes are statically prerendered, and in that
 * mode the hook did not populate reliably under a headless capture, which
 * silently produced PDFs with every animated section left invisible.
 */
export default function PrintMode() {
  useEffect(() => {
    if (!isPrintMode()) return
    const root = document.documentElement
    root.setAttribute('data-print', '1')

    // Publish the settled document height so a capture pass can size the
    // PDF page to the whole document.
    const publish = () => {
      root.setAttribute('data-doc-height', String(Math.ceil(root.scrollHeight)))
    }
    publish()
    const t = window.setTimeout(publish, 1200)
    return () => window.clearTimeout(t)
  }, [])

  return null
}

/** True when the current page was requested for static capture. */
export function isPrintMode(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('print') === '1'
}
