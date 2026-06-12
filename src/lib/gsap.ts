'use client'

/**
 * Central GSAP + ScrollTrigger registration.
 * Import from here everywhere — never import gsap directly.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Defaults
  gsap.defaults({ ease: 'power2.out', duration: 0.7 })

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(10)
    ScrollTrigger.getAll().forEach(t => t.kill())
  }
}

export { gsap, ScrollTrigger }
