'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

const STEPS = [
  {
    num: '01',
    title: 'Site Visit & Honest Scope',
    body: 'We walk the site, run soil checks, and give you a realistic scope — no inflated estimates to win the deal.',
    badge: 'Stage-wise payment schedule locked upfront',
  },
  {
    num: '02',
    title: 'Design & Permits',
    body: 'Our in-house civil engineers produce structural drawings and handle every government approval.',
    badge: 'Structural drawings + all approvals handled',
  },
  {
    num: '03',
    title: 'Foundation & Structure',
    body: 'Concrete is cube-tested to IS standards. Every pour is recorded. Nothing is skipped for speed.',
    badge: 'Soil test + concrete cube tested to IS standards',
  },
  {
    num: '04',
    title: 'MEP & Interior Finishing',
    body: 'Mechanical, electrical, and plumbing work done entirely by our own team — zero outsourcing.',
    badge: 'All our workers — zero subcontractors',
  },
  {
    num: '05',
    title: 'Video-Documented Handover',
    body: 'You get the keys, a walkthrough video of every system, and a full warranty pack.',
    badge: 'Keys + walkthrough video + warranty pack',
  },
] as const

export default function ProcessSection() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
            How We Build
          </p>
          <h2 className="font-bold leading-tight text-display-lg" style={{ color: T.text }}>
            Precision Is a Process,
            <br />
            <span style={{ color: BRAND_ORANGE }}>Not a Promise.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: T.border }} />

          <div className="flex flex-col gap-0">
            {STEPS.map(({ num, title, body, badge }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex gap-8 md:gap-12 pb-12 last:pb-0 group"
              >
                {/* Animated left border reveal on scroll */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-[2.25rem] top-[72px] bottom-0 w-px origin-top hidden md:block"
                  style={{ backgroundColor: BRAND_ORANGE, opacity: i === STEPS.length - 1 ? 0 : 0.25 }}
                />

                {/* Number bubble */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="w-[72px] h-[72px] flex items-center justify-center border text-lg font-bold"
                    style={{ borderColor: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}10`, color: BRAND_ORANGE }}
                  >
                    {num}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-1 pt-4"
                >
                  <h3 className="font-bold text-xl mb-2" style={{ color: T.text }}>{title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: T.textMuted }}>{body}</p>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border"
                    style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    Output → {badge}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
