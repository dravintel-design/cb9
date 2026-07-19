'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, CB9_DARKEST, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

export default function AboutHero() {
  return (
    <section
      className="rounded-2xl relative min-h-[58vh] flex items-end overflow-hidden"
      style={{ backgroundColor: CB9_DARKEST }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${CB9_DARKEST} 0%, transparent 100%)` }}
      />

      {/* Orange top rule */}
      <motion.div
        className="absolute top-0 left-0 h-[3px]"
        style={{ backgroundColor: BRAND_ORANGE }}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Ghost "ABOUT" watermark */}
      <motion.span
        className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 16vw, 14rem)',
          color: `${BRAND_ORANGE}06`,
          letterSpacing: '-0.02em',
        }}
        initial={{ opacity: 0, x: 40 }}
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
            Who We Are
          </p>
          <h1
            className="font-bold text-white leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Built on Engineering.
            <br />
            <span style={{ color: BRAND_ORANGE }}>Not on Promises.</span>
          </h1>
        </motion.div>

        {/* Two-column statement */}
        <motion.div
          className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 border-t pt-12"
          style={{ borderColor: T.border }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.70)' }}
          >
            Corner Brick 9 is a Chennai-based turnkey construction firm that builds homes entirely in-house — our own engineers, our own workers, our own materials at every stage. No subcontractors. No exceptions.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            We were founded on a simple observation: Chennai&apos;s construction market was full of firms that made the same claims and none of the same receipts. CB9 was built to be the receipt.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
