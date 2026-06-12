'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { BRAND_ORANGE } from '@/lib/utils'

const STATS = [
  { value: '40+',    label: 'Homes Built'      },
  { value: '10+',    label: 'Years Active'      },
  { value: '₹2,600', label: 'Per sq.ft'        },
  { value: '0',      label: 'Subcontractors'   },
] as const

export default function HeroSection() {
  const videoRef     = useRef<HTMLVideoElement>(null)
  const [ended, setEnded]       = useState(false)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})

    const onEnded      = () => { setEnded(true); setVisible(true) }
    const onTimeUpdate = () => {
      if (video.duration && video.currentTime > video.duration * 0.6) setVisible(true)
    }
    const onCanPlay    = () => setTimeout(() => setVisible(true), 800)

    video.addEventListener('ended',      onEnded)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('canplay',    onCanPlay)

    return () => {
      video.removeEventListener('ended',      onEnded)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('canplay',    onCanPlay)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/CB9Hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-x-0 bottom-0 h-[75%]"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.55) 50%,transparent 100%)' }}
      />

      {/* Orange sweep bar */}
      <div
        className="absolute bottom-0 left-0 h-[3px] transition-[width] duration-[1200ms] ease-[var(--ease-cb9)]"
        style={{ width: ended ? '100%' : '0%', backgroundColor: BRAND_ORANGE }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-20 px-6 lg:px-16 max-w-[1400px] mx-auto left-0 right-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-5 max-w-4xl"
        >
          {/* Eyebrow + service areas */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: BRAND_ORANGE }}>
              Turnkey Construction
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/50 text-xs tracking-widest uppercase">
              Chennai · Avadi · Thiruvallur · Pattibiram
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white font-bold leading-[1.0] tracking-tight text-display-xl">
            We Build&nbsp;
            <span style={{ color: BRAND_ORANGE }}>End to End.</span>
            <br />
            You Move&nbsp;In.
          </h1>

          {/* Sub-copy */}
          <p className="text-white/80 max-w-2xl leading-relaxed text-base lg:text-lg">
            No subcontractors. IS-standard tested at every stage. Open-cost transparency from day one.
            Corner Brick 9 delivers fully finished homes — on time, on budget, documented on video.
          </p>

          {/* Tiered CTAs */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors"
              style={{ backgroundColor: BRAND_ORANGE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-wide text-white/80 hover:text-white border border-white/25 hover:border-white/50 transition-all"
            >
              <PlayCircle className="w-4 h-4" style={{ color: BRAND_ORANGE }} />
              See Completed Projects
            </Link>
          </div>

          {/* Trust micro-bar */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="font-bold text-white text-lg lg:text-xl">{value}</span>
                <span className="text-white/40 text-xs tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 rotate-90 origin-center">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
