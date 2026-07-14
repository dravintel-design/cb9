'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'

interface TextRevealProps {
  /** One entry per visual line — each line gets its own mask. */
  lines: React.ReactNode[]
  as?: TagName
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
  duration?: number
  /** When provided, reveal is driven by this flag instead of viewport entry. */
  show?: boolean
  /** Viewport amount for whileInView mode. */
  amount?: number
}

/**
 * Framer-style masked line reveal — each line slides up from behind an
 * overflow-hidden mask with a soft expo ease, staggered top to bottom.
 */
export default function TextReveal({
  lines,
  as = 'h2',
  className,
  style,
  delay = 0,
  stagger = 0.1,
  duration = 0.9,
  show,
  amount = 0.5,
}: TextRevealProps) {
  const reduce = useReducedMotion()
  const Tag = as

  const hidden = reduce ? { opacity: 0 } : { y: '110%' }
  const shown = reduce ? { opacity: 1 } : { y: '0%' }

  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={hidden}
            {...(show !== undefined
              ? { animate: show ? shown : hidden }
              : { whileInView: shown, viewport: { once: true, amount } })}
            transition={{ duration, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
