'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import { ScrollTrigger } from '@/lib/gsap'
import { isPrintMode } from '@/components/ui/PrintMode'
import { getLenis } from '@/lib/lenis'

const D = DARK_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

export interface Step {
  num: string
  icon: LucideIcon
  title: string
  body: string
  output: string
}

/** Scroll distance consumed per step while the section is pinned. */
const SCROLL_PER_STEP = 460

export default function StepSequence({
  steps,
  eyebrow,
  heading,
}: {
  steps: readonly Step[]
  eyebrow: string
  heading: React.ReactNode
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const stRef = useRef<InstanceType<typeof ScrollTrigger> | null>(null)
  const lastRef = useRef(0)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  // Static capture shows every stage at once instead of the single live panel.
  const [printing, setPrinting] = useState(false)

  useEffect(() => {
    if (isPrintMode()) setPrinting(true)
  }, [])

  useEffect(() => {
    if (isPrintMode()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 1024) return
    const el = sectionRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${(steps.length - 1) * SCROLL_PER_STEP}`,
      pin: el,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => {
        setProgress(self.progress)
        const i = Math.max(0, Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1))))
        if (i !== lastRef.current) {
          lastRef.current = i
          setActive(i)
        }
      },
    })
    stRef.current = st

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', refresh)
      st.kill()
      stRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length])

  const select = (i: number) => {
    const st = stRef.current
    const lenis = getLenis()
    if (st && lenis) {
      lenis.scrollTo(st.start + (i / (steps.length - 1)) * (st.end - st.start), { duration: 0.9 })
    } else {
      setActive(i)
    }
  }

  const step = steps[active]!
  const Icon = step.icon

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: D.bg }}
    >
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-16 py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
              {eyebrow}
            </p>
            <h2 className="font-bold leading-tight text-display-md" style={{ color: D.text }}>
              {heading}
            </h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: D.textFaint }}>
            Keep scrolling — each stage builds on the one before it.
          </p>
        </div>

        {/* Static capture: every stage laid out for review */}
        {printing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map(s => {
              const SIcon = s.icon
              return (
                <div
                  key={s.num}
                  className="rounded-2xl border p-8 flex flex-col gap-5"
                  style={{ backgroundColor: D.cardBg, borderColor: D.border }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="rounded-xl w-12 h-12 flex items-center justify-center border"
                      style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}12` }}
                    >
                      <SIcon className="w-5 h-5" />
                    </div>
                    <span
                      className="font-bold tabular-nums leading-none"
                      style={{ fontSize: '2.5rem', color: `${BRAND_ORANGE}33` }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2" style={{ color: D.text }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>{s.body}</p>
                  </div>
                  <span
                    className="rounded-lg inline-block self-start text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 border mt-auto"
                    style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}45`, backgroundColor: `${BRAND_ORANGE}0d` }}
                  >
                    Output → {s.output}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Progress rail */}
        <div className={printing ? 'hidden' : 'mb-10 lg:mb-12'}>
          <div className="relative h-[2px] w-full" style={{ backgroundColor: D.border }}>
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{ backgroundColor: BRAND_ORANGE, width: `${progress * 100}%` }}
            />
            {/* Step ticks */}
            <div className="absolute inset-0 flex justify-between items-center">
              {steps.map((s, i) => {
                const done = i <= active
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Go to stage ${s.num}: ${s.title}`}
                    aria-current={i === active}
                    className="relative flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 16 : 10,
                      height: i === active ? 16 : 10,
                      backgroundColor: done ? BRAND_ORANGE : '#2a2a2a',
                      border: `2px solid ${done ? BRAND_ORANGE : D.border}`,
                      boxShadow: i === active ? `0 0 0 6px ${BRAND_ORANGE}22` : 'none',
                    }}
                  />
                )
              })}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((s, i) => (
              <span
                key={s.num}
                className="text-[10px] font-bold tabular-nums transition-colors duration-300 hidden sm:block"
                style={{ color: i === active ? BRAND_ORANGE : D.textFaint }}
              >
                {s.num}
              </span>
            ))}
          </div>
        </div>

        {/* Stage panel */}
        <div className={printing ? 'hidden' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[300px]'}>
          {/* Giant ghost number */}
          <div className="lg:col-span-4 relative flex items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.span
                key={step.num}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-bold tabular-nums leading-none select-none block"
                style={{ fontSize: 'clamp(7rem, 16vw, 15rem)', color: `${BRAND_ORANGE}26` }}
              >
                {step.num}
              </motion.span>
            </AnimatePresence>
            {/* Icon badge riding on the number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step.num}-icon`}
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 12 }}
                transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                className="absolute rounded-2xl flex items-center justify-center border"
                style={{
                  width: 76,
                  height: 76,
                  right: '4%',
                  bottom: '8%',
                  borderColor: BRAND_ORANGE,
                  color: BRAND_ORANGE,
                  backgroundColor: '#0d0d0d',
                  boxShadow: `0 0 40px ${BRAND_ORANGE}30`,
                }}
              >
                <Icon className="w-8 h-8" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3
                  className="font-bold leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 3.6vw, 3rem)', color: D.text }}
                >
                  {step.title}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed max-w-2xl mb-6" style={{ color: D.textMuted }}>
                  {step.body}
                </p>
                <span
                  className="rounded-lg inline-block text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 border"
                  style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}45`, backgroundColor: `${BRAND_ORANGE}0d` }}
                >
                  Output → {step.output}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact stage index */}
        <div className={printing ? 'hidden' : 'mt-10 lg:mt-14 grid grid-cols-2 md:grid-cols-4 gap-2'}>
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                className="rounded-xl flex items-center gap-3 px-4 py-3 border text-left transition-all duration-300"
                style={{
                  backgroundColor: isActive ? `${BRAND_ORANGE}12` : 'transparent',
                  borderColor: isActive ? BRAND_ORANGE : D.border,
                }}
              >
                <span className="text-[10px] font-bold tabular-nums shrink-0" style={{ color: BRAND_ORANGE }}>
                  {s.num}
                </span>
                <span
                  className="text-xs font-semibold leading-snug transition-colors duration-300"
                  style={{ color: isActive ? D.text : D.textMuted }}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
