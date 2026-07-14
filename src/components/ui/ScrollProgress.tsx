'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { BRAND_ORANGE } from '@/lib/utils'

/** Thin orange page-scroll progress bar pinned to the top edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[90] origin-left"
      style={{ scaleX, backgroundColor: BRAND_ORANGE }}
    />
  )
}
