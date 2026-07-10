'use client'

/**
 * Singleton Lenis instance — initialised once by LenisProvider,
 * exported for GSAP ScrollTrigger.scrollerProxy() wiring.
 */
import Lenis from 'lenis'

let instance: Lenis | null = null

export function getLenis(): Lenis | null {
  return instance
}

export function setLenis(l: Lenis): void {
  instance = l
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    // Dev convenience: allows driving smooth scroll from tooling.
    ;(window as unknown as { __lenis?: Lenis }).__lenis = l
  }
}

export function destroyLenis(): void {
  instance?.destroy()
  instance = null
}
