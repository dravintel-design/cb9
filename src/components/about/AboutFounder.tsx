'use client'

import { motion } from 'framer-motion'
import { Youtube, GraduationCap, Wrench, Users } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

const CREDENTIALS = [
  {
    icon: GraduationCap,
    label: 'Academic Credentials',
    value: 'B.E. + M.Tech — Civil Engineering',
    detail: 'Structural analysis, load design, and construction management at post-graduate level.',
  },
  {
    icon: Wrench,
    label: 'Field Experience',
    value: '10+ Years On-Site',
    detail: 'Every project managed personally — not delegated to a site supervisor you never meet.',
  },
  {
    icon: Users,
    label: 'Client Approach',
    value: 'Every Consultation Direct',
    detail: "Sathish takes every initial site visit himself. No sales team, no hand-off after the first call.",
  },
  {
    icon: Youtube,
    label: 'Educational Reach',
    value: 'YouTube — First-Gen Homeowners',
    detail: 'Educating buyers on what IS-standard construction actually means — before they ever hire anyone.',
  },
]

export default function AboutFounder() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Section label */}
        <motion.p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-16"
          style={{ color: BRAND_ORANGE }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Founder
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* LEFT — Portrait placeholder + name */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Portrait box */}
            <div
              className="relative w-full aspect-[3/4] max-w-sm overflow-hidden border"
              style={{ backgroundColor: T.bgDeep, borderColor: T.border }}
            >
              {/* Orange corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-12"
                style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 100%)` }}
              />
              {/* Initials placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className="font-bold leading-none block"
                    style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', color: `${BRAND_ORANGE}15` }}
                  >
                    MSK
                  </span>
                  <p className="text-xs tracking-[0.2em] uppercase mt-4" style={{ color: T.textFaint }}>
                    M. Sathish Kumar
                  </p>
                </div>
              </div>
              {/* Bottom overlay with name */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 border-t"
                style={{ borderColor: T.border, backgroundColor: T.cardBg }}
              >
                <p className="font-bold text-lg" style={{ color: T.text }}>M. Sathish Kumar</p>
                <p className="text-xs tracking-wide mt-1" style={{ color: T.textFaint }}>
                  Founder & Managing Director
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote
              className="border-l-2 pl-5 italic text-base leading-relaxed"
              style={{ borderColor: BRAND_ORANGE, color: T.textMuted }}
            >
              "First-generation homeowners in Chennai are making the biggest financial decision of their lives — often with no one in their corner. That is why I take every consultation myself, and why I put our IS test reports in the client&apos;s hands at every stage."
            </blockquote>
          </motion.div>

          {/* RIGHT — Bio + credentials */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-10"
          >
            <div>
              <h2
                className="font-bold leading-tight mb-6"
                style={{ color: T.text, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                The Engineer Who
                <br />
                <span style={{ color: BRAND_ORANGE }}>Builds Your Home.</span>
              </h2>
              <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: T.textMuted }}>
                <p>
                  Sathish Kumar founded Corner Brick 9 after watching the Chennai construction market reward firms that were good at selling over firms that were good at building. He built CB9 to be the opposite: a firm where every quality claim is backed by a test report, every cost commitment is locked in writing, and every project is documented from first soil test to final video handover.
                </p>
                <p>
                  His B.E. and M.Tech credentials in civil engineering are not decorative — they mean he reads structural drawings, interprets IS standard results, and knows when a concrete pour does and does not meet specification. He is not a promoter who hired engineers. He is the engineer.
                </p>
                <p>
                  Outside CB9, Sathish runs a YouTube channel educating first-generation homeowners on what IS-standard construction actually means in practice — the kind of information most builders prefer their clients not to know.
                </p>
              </div>
            </div>

            {/* Credential tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREDENTIALS.map(({ icon: Icon, label, value, detail }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.08 }}
                  className="border p-5 flex flex-col gap-3"
                  style={{ backgroundColor: T.cardBg, borderColor: T.border }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_ORANGE}12` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: BRAND_ORANGE }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: T.textFaint }}>
                      {label}
                    </p>
                    <p className="font-semibold text-sm leading-snug mb-1.5" style={{ color: T.text }}>
                      {value}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: T.textFaint }}>
                      {detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
