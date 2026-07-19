'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

export default function WorkCTA() {

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: T.bgDeep }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
              Start Your Build
            </p>
            <h2
              className="font-bold leading-tight mb-6"
              style={{ color: T.text, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
            >
              Your Home
              <br />
              <span style={{ color: BRAND_ORANGE }}>Could Be Next.</span>
            </h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: T.textMuted }}>
              Every project above started with a single site visit. Sathish will walk your plot, review your plan, and give you a realistic cost estimate — no obligation to proceed.
            </p>
          </motion.div>

          {/* Right — action block */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border p-10 flex flex-col gap-8"
            style={{ backgroundColor: T.cardBg, borderColor: T.border }}
          >
            <p className="text-sm font-semibold" style={{ color: T.text }}>
              What to expect from the first call:
            </p>

            {[
              'Free site visit — no charge, no commitment',
              'Realistic cost estimate with itemised breakdown',
              'Timeline based on your actual plot and scope',
              'Direct conversation with Sathish — no sales team',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b pb-6 last:border-0 last:pb-0"
                style={{ borderColor: T.border }}
              >
                <div
                  className="mt-1 w-4 h-4 shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: `${BRAND_ORANGE}18` }}
                >
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: BRAND_ORANGE }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{item}</p>
              </div>
            ))}

            <Link
              href="/contact"
              className="rounded-2xl inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
              style={{ backgroundColor: BRAND_ORANGE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
