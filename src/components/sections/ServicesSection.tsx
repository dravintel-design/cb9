'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FlaskConical, DollarSign, Video } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    tag: 'Our #1 Differentiator',
    title: 'Zero Subcontractors',
    body: 'Every worker on your site — mason, electrician, plumber — is a Corner Brick 9 employee. One accountability chain, start to finish.',
  },
  {
    icon: FlaskConical,
    tag: 'Engineering Rigour',
    title: 'IS-Standard Testing at Every Stage',
    body: 'Soil tests, concrete cube tests, and structural checks at foundation, slab, and roof — every batch, every pour, documented.',
  },
  {
    icon: DollarSign,
    tag: 'No Hidden Charges',
    title: 'Open-Cost Transparency',
    body: 'Itemised estimates shared before sign-off. Stage-wise payment schedule locked upfront. No surprise bills at handover.',
  },
  {
    icon: Video,
    tag: 'Post-Completion Proof',
    title: 'Video-Documented Handover',
    body: 'You receive a full video walkthrough of every completed system — plumbing, wiring, structure — alongside the keys and warranty pack.',
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: T.border }}>
          {DIFFERENTIATORS.map(({ icon: Icon, tag, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="p-10 lg:p-12 flex flex-col gap-6 group transition-colors duration-300"
              style={{ backgroundColor: T.bg }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = T.cardBg)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.bg)}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 flex items-center justify-center border transition-colors duration-300"
                  style={{ borderColor: T.border, color: BRAND_ORANGE }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className="text-[10px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1"
                  style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}40` }}
                >
                  {tag}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3" style={{ color: T.text }}>{title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: T.textMuted }}>{body}</p>
              </div>
              <div
                className="h-[1px] w-0 group-hover:w-full transition-[width] duration-700"
                style={{ backgroundColor: BRAND_ORANGE }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
