'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION
const ITEMS = Array.from({ length: 8 }, (_, i) => ({ id: i }))

export default function ServicesMarquee() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y py-10 lg:py-14"
      style={{ backgroundColor: T.bg, borderColor: T.border }}
      aria-hidden="true"
    >
      {/* Scrolling watermark track */}
      <div className="relative flex">
        <motion.div className="flex shrink-0 items-center gap-0" style={{ x }}>
          {[...ITEMS, ...ITEMS].map(({ id }, i) => (
            <div key={`${id}-${i}`} className="flex items-center shrink-0">
              <span
                className="font-bold whitespace-nowrap px-8 leading-none select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  color: i % 2 === 0 ? 'rgba(23,23,23,0.05)' : 'rgba(23,23,23,0.03)',
                }}
              >
                What We Help You Build
              </span>
              <span className="text-2xl lg:text-4xl shrink-0" style={{ color: `${BRAND_ORANGE}30` }}>◆</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Centred foreground text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p
          className="font-bold text-center leading-none"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: T.text,
          }}
        >
          What Can We{' '}
          <span style={{ color: BRAND_ORANGE }}>Build</span>{' '}
          for You?
        </p>
      </div>
    </div>
  )
}
