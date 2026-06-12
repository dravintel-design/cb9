'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, CB9_DARK, CB9_DARKEST } from '@/lib/utils'

export default function WorkHero() {
  return (
    <section
      className="relative min-h-[52vh] flex items-end overflow-hidden"
      style={{ backgroundColor: CB9_DARKEST }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${CB9_DARKEST} 0%, transparent 100%)`,
        }}
      />

      {/* Orange top rule */}
      <motion.div
        className="absolute top-0 left-0 h-[3px]"
        style={{ backgroundColor: BRAND_ORANGE }}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Large ghost numeral */}
      <motion.span
        className="absolute right-6 lg:right-16 bottom-10 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: 'rgba(232,72,28,0.06)',
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      >
        CB9
      </motion.span>

      {/* Content */}
      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-16 pb-20 lg:pb-28 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-3xl"
        >
          <p
            className="text-xs font-semibold tracking-[0.28em] uppercase mb-7"
            style={{ color: BRAND_ORANGE }}
          >
            Our Portfolio
          </p>
          <h1
            className="font-bold text-white leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Homes We&apos;ve
            <br />
            <span style={{ color: BRAND_ORANGE }}>Built.</span>
          </h1>
          <motion.p
            className="mt-8 text-lg leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Every project here was built entirely in-house — our engineers, our workers, our materials. No subcontractors, no surprises. Documented from ground-breaking to handover.
          </motion.p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { value: '40+',     label: 'Homes Completed'   },
            { value: '₹2,600',  label: 'Per Sq.Ft Base'    },
            { value: '10–14',   label: 'Months to Handover' },
            { value: '100%',    label: 'In-House Workforce' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="pt-8 pr-8"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p
                className="font-bold leading-none mb-2"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: BRAND_ORANGE }}
              >
                {value}
              </p>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
