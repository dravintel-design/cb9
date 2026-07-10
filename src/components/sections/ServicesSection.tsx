'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, FlaskConical, DollarSign, Video, ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

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

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null)

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

        {/* Cards — staggered scroll-in, one after another */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {DIFFERENTIATORS.map(({ icon: Icon, tag, title, body, stat, statLabel }, i) => {
            const isHovered = hovered === i
            return (
              <motion.div
                key={title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col gap-0 overflow-hidden cursor-default border"
                style={{
                  backgroundColor: isHovered ? T.cardBg : T.bg,
                  borderColor: isHovered ? `${BRAND_ORANGE}40` : T.border,
                  transition: 'background-color 0.35s ease, border-color 0.35s ease',
                }}
              >
                {/* Orange fill bar that grows from bottom on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: isHovered ? '3px' : '0px',
                    backgroundColor: BRAND_ORANGE,
                    transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />

                {/* Top: icon + tag */}
                <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-6">
                  <div
                    className="w-12 h-12 flex items-center justify-center border shrink-0"
                    style={{
                      borderColor: isHovered ? BRAND_ORANGE : T.border,
                      color: BRAND_ORANGE,
                      backgroundColor: isHovered ? `${BRAND_ORANGE}10` : 'transparent',
                      transition: 'border-color 0.3s ease, background-color 0.3s ease',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1 mt-1"
                    style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}40`, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: T.border, margin: '0 2rem' }} />

                {/* Body */}
                <div className="flex flex-col gap-4 px-8 py-6 flex-1">
                  <h3 className="font-bold text-xl leading-snug" style={{ color: T.text }}>{title}</h3>
                  <p className="leading-relaxed text-sm flex-1" style={{ color: T.textMuted }}>{body}</p>
                </div>

                {/* Stat footer */}
                <div
                  className="flex items-center justify-between gap-4 px-8 py-5 border-t"
                  style={{ borderColor: T.border }}
                >
                  <div>
                    <p
                      className="font-bold text-2xl leading-none"
                      style={{ color: isHovered ? BRAND_ORANGE : T.text, transition: 'color 0.3s ease' }}
                    >
                      {stat}
                    </p>
                    <p className="text-xs mt-1" style={{ color: T.textFaint }}>{statLabel}</p>
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center border"
                    style={{
                      borderColor: isHovered ? BRAND_ORANGE : T.border,
                      backgroundColor: isHovered ? `${BRAND_ORANGE}12` : 'transparent',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      style={{
                        color: isHovered ? BRAND_ORANGE : T.textFaint,
                        transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
