'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Marks the document for static capture when `?print=1` is present.
 *
 * The site animates most content in on scroll (Framer Motion `whileInView`
 * starts at opacity 0) and pins several sections with ScrollTrigger. Both
 * would render blank or half-built in a headless PDF capture, so print mode
 * sets `data-print` on <html>; CSS then forces every element to its resting
 * visible state and the pinned components skip ScrollTrigger entirely.
 */
export default function PrintMode() {
  const params = useSearchParams()

  useEffect(() => {
    if (params.get('print') !== '1') return
    const root = document.documentElement
    root.setAttribute('data-print', '1')

    // `h` sizes the PDF page to the whole document so each site page
    // exports as exactly one PDF page. The capture script measures the
    // height from `data-doc-height` on a first pass, then re-requests
    // the page with that value.
    const h = params.get('h')
    if (h) {
      const style = document.createElement('style')
      style.textContent = `@page { size: 1440px ${h}px; margin: 0; }`
      document.head.appendChild(style)
    }

    // Publish the settled document height for the measuring pass.
    const publish = () => {
      root.setAttribute('data-doc-height', String(Math.ceil(root.scrollHeight)))
    }
    publish()
    const t = window.setTimeout(publish, 1200)
    return () => window.clearTimeout(t)
  }, [params])

  return null
}

/** True when the current page was requested for static capture. */
export function isPrintMode(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('print') === '1'
}
