'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Users, Compass, PencilRuler, Sofa } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'

const T = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

/** A four-step summary of the eleven-stage Design Process page, in the same order. */
const STEPS = [
  {
    icon: Users,
    title: 'Understand the Family',
    body: 'Long conversations about how you live, what you need now, and what the home must hold in twenty years.',
    stages: 'Stage 01',
  },
  {
    icon: Compass,
    title: 'Read the Site',
    body: 'Plot, orientation, sunlight, wind, access, views and regulations, studied before a line is drawn.',
    stages: 'Stage 02',
  },
  {
    icon: PencilRuler,
    title: 'Design and Engineer Together',
    body: 'Brief, zoning, concept and design development, with structure and services resolved alongside the architecture.',
    stages: 'Stages 03 to 08',
  },
  {
    icon: Sofa,
    title: 'Complete the Residence',
    body: 'Elevation, interiors and landscape developed with the building, so the home is designed as one whole.',
    stages: 'Stage 09',
  },
] as const

export default function DesignSection() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bgDeep }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
              How We Design
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: T.text }}
              lines={[
                'Designed Around',
                <span key="l2" style={{ color: BRAND_ORANGE }}>Your Family.</span>,
              ]}
            />
            <motion.p
              className="mt-6 text-base lg:text-lg leading-relaxed"
              style={{ color: T.textMuted }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              We plan each home around the family and the site, with design and engineering
              developed together. Construction begins only once the design is resolved.
            </motion.p>
          </div>
          <Link
            href="/design-process"
            className="rounded-2xl group/link inline-flex items-center gap-2 self-start md:self-auto text-sm font-semibold tracking-wide border px-6 py-3 transition-colors hover:bg-white"
            style={{ borderColor: 'rgba(0,0,0,0.18)', color: T.text }}
          >
            See the Design Process
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STEPS.map(({ icon: Icon, title, body, stages }, i) => (
            <motion.li
              key={title}
              className="rounded-2xl border p-7 lg:p-8 flex flex-col gap-5"
              style={{ backgroundColor: T.cardBg, borderColor: T.border }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="rounded-xl w-11 h-11 flex items-center justify-center"
                  style={{ backgroundColor: `${BRAND_ORANGE}12`, color: BRAND_ORANGE }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="font-bold tabular-nums text-2xl" style={{ color: `${BRAND_ORANGE}40` }} aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-snug mb-2" style={{ color: T.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{body}</p>
              </div>
              <span className="mt-auto text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: T.textFaint }}>
                {stages}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
