'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

const TESTIMONIALS = [
  {
    quote: 'Sathish personally explained every stage before it started. I never had to chase anyone for an update — they sent photos every week without being asked.',
    name: 'R. Venkataraman',
    detail: 'G+2 Home — Avadi, 2024',
    initials: 'RV',
  },
  {
    quote: 'Other builders quoted lower but changed the price mid-build. CB9 locked our estimate before they broke ground. Final bill matched the signed document exactly.',
    name: 'S. Lakshmi Priya',
    detail: 'G+1 Home — Thiruvallur, 2024',
    initials: 'SL',
  },
  {
    quote: "They handed me a folder with all the IS test reports at handover. Foundation, slab, each concrete pour — documented. I didn't expect that level of transparency.",
    name: 'K. Murugappan',
    detail: 'New Build — Ambattur, 2023',
    initials: 'KM',
  },
] as const

export default function WorkTestimonials() {

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
            From Our Clients
          </p>
          <h2
            className="font-bold leading-tight"
            style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            What Homeowners
            <br />
            <span style={{ color: BRAND_ORANGE }}>Say.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="border flex flex-col gap-6 p-8"
              style={{ backgroundColor: T.cardBg, borderColor: T.border }}
            >
              {/* Orange accent quote mark */}
              <span
                className="font-bold leading-none select-none"
                style={{ fontSize: '3rem', color: `${BRAND_ORANGE}30`, lineHeight: 1 }}
              >
                &ldquo;
              </span>

              <p className="text-base leading-relaxed flex-1" style={{ color: T.textMuted }}>
                {t.quote}
              </p>

              <div
                className="flex items-center gap-4 pt-6 border-t"
                style={{ borderColor: T.border }}
              >
                {/* Initials avatar */}
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0 font-bold text-xs"
                  style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: T.text }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: T.textFaint }}>{t.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
