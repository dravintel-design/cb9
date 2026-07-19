'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

export default function AboutCTA() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
              See It for Yourself
            </p>
            <h2
              className="font-bold leading-tight mb-6"
              style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              The Firm CB9
              <br />
              <span style={{ color: BRAND_ORANGE }}>Has Already Become.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
              The substance is real: the engineering credentials, the no-subcontracting discipline, the IS-standard testing, the open-cost transparency, the post-completion video documentation. None of this needs to be created. All of it is already the way we work — on every project, every time.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="flex flex-col gap-5"
          >
            {/* Stat block */}
            <div
              className="rounded-2xl overflow-hidden grid grid-cols-2 gap-px border"
              style={{ borderColor: T.border, backgroundColor: T.border }}
            >
              {[
                { value: '40+',    label: 'Completed Homes'   },
                { value: '0',      label: 'Subcontractors'    },
                { value: '100%',   label: 'IS-Tested Builds'  },
                { value: '₹2,600', label: 'Per Sq.Ft — Base' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="p-7"
                  style={{ backgroundColor: T.cardBg }}
                >
                  <p
                    className="font-bold leading-none mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: BRAND_ORANGE }}
                  >
                    {value}
                  </p>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: T.textFaint }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/contact"
                className="rounded-2xl flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
                style={{ backgroundColor: BRAND_ORANGE }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Book Free Consultation
              </Link>
              <Link
                href="/work"
                className="rounded-2xl flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold tracking-widest uppercase border transition-all"
                style={{ color: T.textMuted, borderColor: T.border }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = T.text
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = T.textMuted
                  e.currentTarget.style.borderColor = T.border
                }}
              >
                See Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
