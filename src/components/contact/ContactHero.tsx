'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, CB9_DARKEST, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

export default function ContactHero() {
  return (
    <section
      className="rounded-2xl relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20"
      style={{ backgroundColor: CB9_DARKEST }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
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

      {/* Ghost watermark */}
      <motion.span
        className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          color: `${BRAND_ORANGE}06`,
          letterSpacing: '-0.02em',
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      >
        LET&apos;S TALK
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl"
        >
          <p
            className="text-xs font-semibold tracking-[0.28em] uppercase mb-7"
            style={{ color: BRAND_ORANGE }}
          >
            Start the Conversation
          </p>
          <h1
            className="font-bold text-white leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
          >
            Talk to Sathish.
            <br />
            <span style={{ color: BRAND_ORANGE }}>Directly.</span>
          </h1>
          <motion.p
            className="mt-7 text-lg leading-relaxed max-w-xl"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No sales team. No intake form that goes to a call centre. Sathish personally reviews every enquiry and personally attends every first site visit. Share your plot and budget below — he will be in touch within 24 hours.
          </motion.p>
        </motion.div>

        {/* Three trust chips */}
        <motion.div
          className="mt-12 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {[
            'Response within 24 hours',
            'Free site visit — no charge',
            'No commitment required',
          ].map(chip => (
            <span
              key={chip}
              className="text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-2 border"
              style={{ color: 'rgba(255,255,255,0.45)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
