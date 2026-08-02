'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'

const EASE = [0.22, 1, 0.36, 1] as const

interface PageHeroProps {
  eyebrow: string
  lines: React.ReactNode[]
  intro?: string
  /** Small meta row under the intro, e.g. scope tags. */
  meta?: readonly string[]
}

/** Shared minimal page hero — dark, editorial, large type. */
export default function PageHero({ eyebrow, lines, intro, meta }: PageHeroProps) {
  return (
    <section className="pt-40 lg:pt-52 pb-16 lg:pb-24" style={{ backgroundColor: DARK_SECTION.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <motion.p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
          style={{ color: BRAND_ORANGE }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {eyebrow}
        </motion.p>

        <TextReveal
          as="h1"
          show
          delay={0.08}
          stagger={0.12}
          className="font-bold leading-[1.02] tracking-tight text-display-xl max-w-5xl"
          style={{ color: DARK_SECTION.text }}
          lines={lines}
        />

        {intro && (
          <motion.p
            className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed"
            style={{ color: DARK_SECTION.textMuted }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            {intro}
          </motion.p>
        )}

        {meta && meta.length > 0 && (
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            {meta.map(m => (
              <span
                key={m}
                className="rounded-lg text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border"
                style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}08` }}
              >
                {m}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
