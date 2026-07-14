'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion'

interface ParallaxProps {
  children: React.ReactNode
  /** Percent of element height to drift across its scroll journey. */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

/** Subtle scroll-linked vertical drift, Framer-marketing-site style. */
export default function Parallax({
  children,
  speed = 10,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `-${speed}%`])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={(reduce ? { ...style } : { ...style, y }) as MotionStyle}
    >
      {children}
    </motion.div>
  )
}
