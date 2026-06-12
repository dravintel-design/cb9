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
}

export function destroyLenis(): void {
  instance?.destroy()
  instance = null
}
