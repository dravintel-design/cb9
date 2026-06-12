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
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: T.border }} />

          <div className="flex flex-col gap-0">
            {STEPS.map(({ num, title, body, badge }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex gap-8 md:gap-12 pb-12 last:pb-0 group"
              >
                {/* Number bubble */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-[72px] h-[72px] flex items-center justify-center border text-lg font-bold transition-all duration-300"
                    style={{ borderColor: T.border, backgroundColor: T.bg, color: BRAND_ORANGE }}
                  >
                    {num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h3 className="font-bold text-xl mb-2" style={{ color: T.text }}>{title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: T.textMuted }}>{body}</p>
                  <span
                    className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border"
                    style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    Output → {badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
