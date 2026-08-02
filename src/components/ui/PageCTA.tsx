'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'
import Magnetic from '@/components/ui/Magnetic'

interface PageCTAProps {
  eyebrow?: string
  lines: React.ReactNode[]
  body?: string
  ctaLabel?: string
  href?: string
}

/** Shared end-of-page call to action band. */
export default function PageCTA({
  eyebrow = 'Start the Conversation',
  lines,
  body,
  ctaLabel = 'Start a Project',
  href = '/contact',
}: PageCTAProps) {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: DARK_SECTION.bgDeep }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16 text-center flex flex-col items-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
          {eyebrow}
        </p>
        <TextReveal
          as="h2"
          className="font-bold leading-tight text-display-lg"
          style={{ color: DARK_SECTION.text }}
          lines={lines}
        />
        {body && (
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: DARK_SECTION.textMuted }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {body}
          </motion.p>
        )}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic strength={0.25}>
            <Link
              href={href}
              className="rounded-2xl inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors"
              style={{ backgroundColor: BRAND_ORANGE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
