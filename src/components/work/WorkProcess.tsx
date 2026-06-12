'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

const STEPS = [
  {
    num: '01',
    title: 'Consultation & Site Visit',
    body: 'Sathish visits your site personally. We review the plot, soil, and your budget — no sales team, no pressure.',
  },
  {
    num: '02',
    title: 'Drawings & Approvals',
    body: 'Our engineers prepare CMDA/DTCP-ready drawings and manage the full permit process. You review every sheet.',
  },
  {
    num: '03',
    title: 'Foundation & Structure',
    body: 'Soil test to IS 1888. Rebar layout verified on site. Concrete cube tested at every pour to IS 456.',
  },
  {
    num: '04',
    title: 'MEP & Finishing',
    body: 'Electrical, plumbing, and drainage run by our own workers. Flooring, painting, fittings — all in one contract.',
  },
  {
    num: '05',
    title: 'Video Handover',
    body: 'We walk you through your home on camera. Test reports, warranty pack, and keys — handed together on day one.',
  },
] as const

export default function WorkProcess() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
            How Every Build Runs
          </p>
          <h2
            className="font-bold leading-tight"
            style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            The Same
            <br />
            <span style={{ color: BRAND_ORANGE }}>Process.</span> Every Time.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-[2.15rem] top-8 bottom-8 w-px hidden lg:block"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="flex gap-8 items-start"
              >
                {/* Step number bubble */}
                <div
                  className="shrink-0 w-[4.3rem] h-[4.3rem] border flex items-center justify-center z-10"
                  style={{
                    backgroundColor: T.bgDeep,
                    borderColor: i === 0 ? BRAND_ORANGE : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="font-bold text-sm tabular-nums"
                    style={{ color: i === 0 ? BRAND_ORANGE : T.textFaint }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="flex-1 border p-6"
                  style={{ backgroundColor: T.cardBg, borderColor: T.border }}
                >
                  <h3 className="font-semibold text-lg mb-2" style={{ color: T.text }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
