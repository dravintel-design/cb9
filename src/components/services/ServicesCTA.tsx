'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

export default function ServicesCTA() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              Ready to Build
            </p>
            <h2 className="font-bold text-display-lg leading-tight mb-6" style={{ color: T.text }}>
              Let&apos;s Talk About
              <br />
              <span style={{ color: BRAND_ORANGE }}>Your Home.</span>
            </h2>
            <p className="leading-relaxed max-w-lg" style={{ color: T.textMuted }}>
              Sathish personally takes every initial consultation. Bring your site plan, your budget range, and your questions. No sales team, no upsell — just an honest conversation about what your build will actually cost and how long it will actually take.
            </p>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border p-10 flex flex-col gap-8"
            style={{ backgroundColor: T.cardBg, borderColor: T.border }}
          >
            {[
              { label: 'Response time',        value: 'Within 24 hours'   },
              { label: 'Site visit',           value: 'Included, no charge'},
              { label: 'Commitment required',  value: 'None at first call' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b pb-5 last:border-0 last:pb-0" style={{ borderColor: T.border }}>
                <span className="text-sm" style={{ color: T.textFaint }}>{label}</span>
                <span className="font-semibold text-sm" style={{ color: T.text }}>{value}</span>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/contact"
                className="rounded-2xl flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
                style={{ backgroundColor: BRAND_ORANGE }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Book a Free Consultation
              </Link>
              <a
                href="tel:+919876543210"
                className="rounded-2xl flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-all border"
                style={{ color: T.textMuted, borderColor: T.border }}
                onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: BRAND_ORANGE }} />
                Call Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
