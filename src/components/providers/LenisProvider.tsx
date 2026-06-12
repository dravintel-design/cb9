'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { setLenis, destroyLenis } from '@/lib/lenis'
import { ScrollTrigger } from '@/lib/gsap'

interface Props {
  children: React.ReactNode
}

export default function LenisProvider({ children }: Props) {
  const rafId = useRef<number>(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(lenis)

    // Wire Lenis into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId.current)
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}
