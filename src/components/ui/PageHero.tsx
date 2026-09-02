'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { isPrintMode } from '@/components/ui/PrintMode'
import TextReveal from '@/components/ui/TextReveal'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Brand orange tops out at 5.38:1 even on pure black, which leaves small
 * uppercase text below WCAG AA over a photographic scrim. Over images we
 * use a lighter tint of the same hue (~7.5:1) for eyebrow and meta chips.
 */
const ORANGE_ON_IMAGE = '#FF8A5C'

interface PageHeroProps {
  eyebrow: string
  lines: React.ReactNode[]
  intro?: string
  /** Small meta row under the intro, e.g. scope tags. */
  meta?: readonly string[]
  /** Full-page hero image (path under /public). Renders a full-viewport
   *  hero with a dark scrim sized for WCAG AA text contrast. */
  image?: string
  imageAlt?: string
}

/** Shared minimal page hero — dark, editorial, large type. */
/** Scroll distance the hero holds before releasing to the page. */
const PIN_DISTANCE = 700

export default function PageHero({ eyebrow, lines, intro, meta, image, imageAlt }: PageHeroProps) {
  const accent = image ? ORANGE_ON_IMAGE : BRAND_ORANGE

  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)

  // Pin the hero, scrub the image and copy against scroll, then release
  // into the page. Skipped for static capture and reduced motion, where a
  // pinned section would either print half-built or fight the user.
  useEffect(() => {
    if (!image) return
    if (isPrintMode()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${PIN_DISTANCE}`,
      pin: section,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const p = self.progress
        if (imgRef.current) {
          gsap.set(imgRef.current, { scale: 1 + p * 0.16, yPercent: p * 6, force3D: true })
        }
        if (contentRef.current) {
          // Copy lifts and fades out over the first three-quarters of the pin.
          gsap.set(contentRef.current, {
            y: -p * 120,
            opacity: Math.max(0, 1 - p / 0.75),
            force3D: true,
          })
        }
        if (scrimRef.current) {
          gsap.set(scrimRef.current, { opacity: 0.45 + p * 0.4 })
        }
      },
    })

    // Layout above can settle after hydration (fonts, media) — re-measure.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', refresh)
      st.kill()
    }
  }, [image])

  const content = (
    <>
      <motion.p
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: accent }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {eyebrow}
      </motion.p>

      <TextReveal
        as="h1"
        show
        delay={0.08}
        stagger={0.12}
        className="font-bold leading-[1.02] tracking-tight text-display-xl max-w-5xl"
        style={{ color: '#ffffff' }}
        lines={lines}
      />

      {intro && (
        <motion.p
          className="mt-8 max-w-2xl text-base lg:text-lg leading-relaxed"
          style={{ color: image ? 'rgba(255,255,255,0.78)' : DARK_SECTION.textMuted }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        >
          {intro}
        </motion.p>
      )}

      {meta && meta.length > 0 && (
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          {meta.map(m => (
            <span
              key={m}
              className="rounded-lg text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border"
              style={{
                color: accent,
                borderColor: image ? 'rgba(255,138,92,0.45)' : `${BRAND_ORANGE}45`,
                backgroundColor: image ? 'rgba(10,10,10,0.72)' : `${BRAND_ORANGE}08`,
              }}
            >
              {m}
            </span>
          ))}
        </motion.div>
      )}
    </>
  )

  if (image) {
    return (
      <section
        ref={sectionRef}
        className="relative min-h-[100svh] flex items-end overflow-hidden"
        style={{ backgroundColor: '#101010' }}
      >
        {/* Full-page hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={image}
          alt={imageAlt ?? ''}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          fetchPriority="high"
        />

        {/* Contrast scrims, base wash + dense gradient behind the text.
            White copy sits over >= ~85% black, comfortably past WCAG AA. */}
        <div ref={scrimRef} aria-hidden className="absolute inset-0 bg-black" style={{ opacity: 0.45 }} />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[80%]"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.72) 40%, rgba(8,8,8,0.25) 75%, transparent 100%)' }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-16 pt-44 pb-20 lg:pb-24 will-change-transform"
        >
          {content}
        </div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-5 h-5 text-white/60" />
          </motion.div>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="pt-40 lg:pt-52 pb-16 lg:pb-24" style={{ backgroundColor: DARK_SECTION.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">{content}</div>
    </section>
  )
}
