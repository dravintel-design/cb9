'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FlaskConical, DollarSign, Video } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

const T = LIGHT_SECTION

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    tag: 'Our #1 Differentiator',
    title: 'Zero Subcontractors',
    body: 'Every worker on your site — mason, electrician, plumber — is a Corner Brick 9 employee. One accountability chain, start to finish.',
    stat: '0',
    statLabel: 'Subcontractors, ever',
  },
  {
    icon: FlaskConical,
    tag: 'Engineering Rigour',
    title: 'IS-Standard Testing at Every Stage',
    body: 'Soil tests, concrete cube tests, and structural checks at foundation, slab, and roof — every batch, every pour, documented.',
    stat: '100%',
    statLabel: 'Batches tested & documented',
  },
  {
    icon: DollarSign,
    tag: 'No Hidden Charges',
    title: 'Open-Cost Transparency',
    body: 'Itemised estimates shared before sign-off. Stage-wise payment schedule locked upfront. No surprise bills at handover.',
    stat: '₹0',
    statLabel: 'Surprise costs at handover',
  },
  {
    icon: Video,
    tag: 'Post-Completion Proof',
    title: 'Video-Documented Handover',
    body: 'You receive a full video walkthrough of every completed system — plumbing, wiring, structure — alongside the keys and warranty pack.',
    stat: '40+',
    statLabel: 'Homes handed over on video',
  },
] as const

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
            Why Corner Brick 9
          </p>
          <h2 className="font-bold leading-tight text-display-lg" style={{ color: T.text }}>
            Not What We Do.
            <br />
            <span style={{ color: BRAND_ORANGE }}>How We Do It.</span>
          </h2>
        </motion.div>

        {/* ScrollStack cards */}
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={20}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.88}
          blurAmount={0}
        >
          {DIFFERENTIATORS.map(({ icon: Icon, tag, title, body, stat, statLabel }) => (
            <ScrollStackItem key={title}>
              <div
                className="w-full border flex flex-col"
                style={{
                  backgroundColor: T.cardBg,
                  borderColor: T.border,
                  minHeight: '22rem',
                }}
              >
                {/* Top: icon + tag */}
                <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6">
                  <div
                    className="w-12 h-12 flex items-center justify-center border shrink-0"
                    style={{ borderColor: `${BRAND_ORANGE}50`, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1 mt-1"
                    style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}40`, backgroundColor: `${BRAND_ORANGE}06` }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: T.border, margin: '0 2rem' }} />

                {/* Body */}
                <div className="flex flex-col gap-3 px-8 py-6 flex-1">
                  <h3 className="font-bold text-2xl leading-snug" style={{ color: T.text }}>{title}</h3>
                  <p className="leading-relaxed text-sm flex-1" style={{ color: T.textMuted }}>{body}</p>
                </div>

                {/* Stat footer */}
                <div
                  className="flex items-center justify-between gap-4 px-8 py-5 border-t"
                  style={{ borderColor: T.border, backgroundColor: T.bg }}
                >
                  <div>
                    <p className="font-bold text-3xl leading-none" style={{ color: BRAND_ORANGE }}>{stat}</p>
                    <p className="text-xs mt-1" style={{ color: T.textFaint }}>{statLabel}</p>
                  </div>
                  <div
                    className="h-[2px] flex-1 mx-4"
                    style={{ backgroundColor: `${BRAND_ORANGE}20` }}
                  />
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
