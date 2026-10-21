'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BRAND_ORANGE } from '@/lib/utils'
import Parallax from '@/components/ui/Parallax'

const EASE = [0.22, 1, 0.36, 1] as const

/** Founder portrait with clip reveal, parallax drift and name plate. Shared by Home and About. */
export default function FounderPortrait() {
  return (
    <motion.div
      initial={{ clipPath: 'inset(8% 8% 8% 8%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <Parallax speed={6} className="rounded-2xl relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: '#0d0d0d' }}>
        <Image
          src="/founder/sathish.jpg"
          alt="M. Sathish Kumar, founder of Corner Brick 9, in a black shirt against a dark studio backdrop"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Scrim so the name plate holds AA contrast over the photograph */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 45%, transparent 100%)' }}
        />
        <div className="absolute bottom-8 left-8 right-8">
          <motion.div
            className="h-1 mb-5 origin-left"
            style={{ backgroundColor: BRAND_ORANGE }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          />
          <p className="font-bold text-2xl text-white">M. Sathish Kumar</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Founder · Chief Engineer</p>
        </div>
      </Parallax>
    </motion.div>
  )
}
