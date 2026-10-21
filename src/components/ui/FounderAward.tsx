'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const D = DARK_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

/** Transcribed from the award plaque. Home and About both read from here. */
const AWARD = {
  title: 'WOW Award',
  event: 'Architecture Reconnect Summit',
  organiser: 'Global Business Reconnect',
  year: '2024',
  citation: 'In recognition of outstanding contribution, dedication and impact.',
} as const

/** Highlighted recognition band beneath the founder story. Dark on both light founder sections. */
export default function FounderAward() {
  const { title, event, organiser, year, citation } = AWARD

  return (
    <motion.aside
      aria-label="Award received by the founder"
      className="rounded-2xl relative border mt-16 lg:mt-20"
      style={{ backgroundColor: '#0f0f0f', borderColor: `${BRAND_ORANGE}55`, overflow: 'hidden' }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Decorative layers. The card clips with an inline overflow rather than the
          .overflow-hidden class, which print mode releases, so nothing bleeds in the PDF. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Warm glow behind the medallion */}
        <div
          className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full"
          style={{ background: `radial-gradient(circle, ${BRAND_ORANGE}38 0%, transparent 65%)` }}
        />
        {/* One-time light sweep as the band enters */}
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{ background: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)' }}
          initial={{ left: '-40%' }}
          whileInView={{ left: '120%' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-12 items-center p-8 md:p-10 lg:p-12">
        {/* Text */}
        <div>
          {/* Medallion with a slow turning ring */}
          <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-8">
            <div
              className="absolute inset-0 rounded-full motion-safe:animate-[spin_9s_linear_infinite]"
              style={{ background: `conic-gradient(from 0deg, ${BRAND_ORANGE}, transparent 35%, ${BRAND_ORANGE} 65%, transparent)` }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-[3px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#141414', color: BRAND_ORANGE, boxShadow: `inset 0 0 30px ${BRAND_ORANGE}26` }}
              initial={{ scale: 0.6, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              <Trophy className="w-9 h-9 lg:w-10 lg:h-10" strokeWidth={1.6} />
            </motion.div>
          </div>

          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: BRAND_ORANGE }}>
            Recognition · {year}
          </p>
          <h3 className="font-bold leading-tight text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            {title}
          </h3>
          <p className="mt-3 text-base font-semibold" style={{ color: D.text }}>
            {event}
          </p>
          <p className="mt-1 text-sm" style={{ color: D.textMuted }}>
            Presented by {organiser}
          </p>
          <blockquote
            className="mt-7 border-l-2 pl-5 italic text-base leading-relaxed"
            style={{ borderColor: BRAND_ORANGE, color: D.textMuted }}
          >
            &ldquo;{citation}&rdquo;
          </blockquote>
        </div>

        {/* Photographs: the stage presentation, with the plaque close-up inset */}
        <div className="relative pb-12 sm:pb-16">
          <motion.div
            className="rounded-2xl relative overflow-hidden aspect-[16/10] border"
            style={{ borderColor: D.border }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <Image
              src="/founder/award-01.jpg"
              alt={`M. Sathish Kumar receiving the ${title} on stage at the ${event}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: 'center 35%' }}
            />
          </motion.div>
          <motion.div
            className="rounded-xl absolute bottom-0 -left-2 sm:-left-6 w-[46%] aspect-[3/2] overflow-hidden"
            style={{ border: '4px solid #0f0f0f', boxShadow: '0 24px 50px -12px rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            <Image
              src="/founder/award-02.jpg"
              alt={`Sathish Kumar holding the ${title} plaque, dated ${year}`}
              fill
              sizes="(min-width: 1024px) 24vw, 46vw"
              className="object-cover"
              style={{ objectPosition: '30% center' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}
