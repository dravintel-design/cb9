'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE } from '@/lib/utils'

export default function ServicesHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">

      {/* ── Full-bleed hero image ── */}
      <Image
        src="/services/services-main.jpg"
        alt="Corner Brick 9 construction site — turnkey residential build in progress"
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Dark overlays ── */}
      {/* Base darkening */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Bottom-to-top gradient — ensures text is readable */}
      <div
        className="absolute inset-x-0 bottom-0 h-[80%]"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 45%, transparent 100%)',
        }}
      />
      {/* Left-to-right gradient — extra contrast for left headline */}
      <div
        className="absolute inset-y-0 left-0 w-[55%] hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)',
        }}
      />

      {/* ── Orange top rule ── */}
      <motion.div
        className="absolute top-0 left-0 h-[3px]"
        style={{ backgroundColor: BRAND_ORANGE }}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Content ── */}
      <div className="relative w-full mx-auto max-w-7xl px-6 lg:px-16 pb-20 lg:pb-28 pt-40 lg:pt-52">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

          {/* LEFT — Big headline */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="text-xs font-semibold tracking-[0.28em] uppercase mb-7"
              style={{ color: BRAND_ORANGE }}
            >
              Turnkey Construction Services
            </p>
            <h1
              className="font-bold text-white leading-[1.0] tracking-tight drop-shadow-lg"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
            >
              One Team.
              <br />
              <span style={{ color: BRAND_ORANGE }}>Every Stage.</span>
              <br />
              No&nbsp;Exceptions.
            </h1>
          </motion.div>

          {/* RIGHT — Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-8"
          >
            <p className="text-white/75 text-lg leading-relaxed drop-shadow-md">
              Corner Brick 9 handles design, approvals, structure, MEP, and finishing — all under one roof, with zero subcontractors. From the soil test to the video handover, every decision runs through our own engineers and workers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-colors"
                style={{ backgroundColor: BRAND_ORANGE }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
              >
                <ArrowRight className="w-4 h-4" />
                Let&apos;s Connect
              </Link>
            </div>

            {/* Anchor pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15">
              {[
                { label: 'Residential Design',   href: '#residential-design' },
                { label: 'New Construction',     href: '#new-construction'   },
                { label: 'Project Management',   href: '#project-management' },
                { label: 'Structural Eng.',      href: '#structural-engineering' },
                { label: 'Renovation',           href: '#renovation'         },
                { label: 'Consultation',         href: '#consultation'       },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border border-white/20 text-white/55 hover:border-white/50 hover:text-white transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
