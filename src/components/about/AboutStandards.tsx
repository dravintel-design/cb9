'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

const STANDARDS = [
  {
    code: 'IS 456',
    name: 'Plain & Reinforced Concrete',
    applies: 'Every concrete pour — foundation, slab, columns, beams',
    what: 'Governs concrete mix design, reinforcement bar placement, curing time, and minimum compressive strength. We conduct cube tests at every pour stage — not just at the foundation.',
    why: "A slab poured without cube testing could be under-strength and you would not know for years — not until the cracks appear.",
  },
  {
    code: 'IS 1888',
    name: 'Soil Bearing Capacity Test',
    applies: 'Before any foundation work begins',
    what: "Tests how much load your plot's soil can bear before foundation design is finalised. The type and depth of your foundation depends entirely on this result — designing without it is guesswork.",
    why: "Every plot is different. Soil that looks identical to a neighbour's plot can carry half the load. We test before we design.",
  },
  {
    code: 'IS 732',
    name: 'Electrical Wiring Practice',
    applies: 'All internal electrical installation',
    what: 'Covers cable sizing, earthing, circuit protection, and safe wiring practice for buildings. Followed by our in-house electricians — not subcontracted installers working to their own standard.',
    why: "Electrical faults are the leading cause of residential fires in India. IS 732 compliance is not a premium feature — it's the minimum that should be non-negotiable.",
  },
  {
    code: 'IS 1200',
    name: 'Method of Measurement',
    applies: 'Estimate preparation and billing',
    what: 'The Indian standard for how construction quantities are measured and billed. Our estimates follow IS 1200 — so when we say 2,200 sq.ft, we are using the same definition you are.',
    why: 'Without a consistent measurement standard, a builder can quote you one number and charge you another. IS 1200 eliminates that ambiguity.',
  },
] as const

export default function AboutStandards() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
            What IS-Standard Actually Means
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <h2
              className="font-bold leading-tight"
              style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              The Standards
              <br />
              <span style={{ color: BRAND_ORANGE }}>Behind the Build.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
              Most construction firms use "IS-standard" as a marketing phrase. We use it as an operating checklist — with test reports to prove it. Here is exactly what each standard covers and why it matters for your home.
            </p>
          </div>
        </motion.div>

        {/* Standards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {STANDARDS.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="border flex flex-col gap-0 overflow-hidden"
              style={{ backgroundColor: T.cardBg, borderColor: T.border }}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between gap-4 p-6 border-b"
                style={{ borderColor: T.border }}
              >
                <div>
                  <span
                    className="font-bold text-3xl leading-none block mb-1"
                    style={{ color: BRAND_ORANGE }}
                  >
                    {s.code}
                  </span>
                  <p className="font-semibold text-sm" style={{ color: T.text }}>{s.name}</p>
                </div>
                <div
                  className="text-[9px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1.5 border shrink-0 text-right leading-snug"
                  style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}08` }}
                >
                  {s.applies}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-4 p-6">
                <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>
                  {s.what}
                </p>
                <div
                  className="border-l-2 pl-4"
                  style={{ borderColor: BRAND_ORANGE }}
                >
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: BRAND_ORANGE }}>
                    Why it matters for you
                  </p>
                  <p className="text-xs leading-relaxed italic" style={{ color: T.textMuted }}>
                    {s.why}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-sm text-center leading-relaxed"
          style={{ color: T.textFaint }}
        >
          All test reports are compiled and handed to you at handover. You receive the folder — not a summary, not a verbal confirmation.
        </motion.p>
      </div>
    </section>
  )
}
