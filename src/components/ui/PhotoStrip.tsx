'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import { isPrintMode } from '@/components/ui/PrintMode'

const D = DARK_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

export interface Shot {
  src: string
  caption: string
  location: string
}

/**
 * Instagram-style square tile strip that scrolls horizontally.
 *
 * Scrolls by wheel (vertical wheel is translated to horizontal), by drag, by
 * the arrow buttons, and by keyboard — all sharing the same smooth-scroll
 * path so the motion feels identical however it is driven.
 */
export default function PhotoStrip({ shots }: { shots: readonly Shot[] }) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  // Lazy tiles never load during a static capture, which would leave this
  // section blank in the approval PDF. Load them eagerly there.
  const [eager, setEager] = useState(false)
  useEffect(() => {
    if (isPrintMode()) setEager(true)
  }, [])

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [sync])

  // Vertical wheel over the strip should move it sideways, but only while the
  // strip still has room — otherwise the page scroll would feel trapped.
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
      e.preventDefault()
      el.scrollBy({ left: e.deltaY, behavior: 'auto' })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const step = (dir: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const el = railRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = railRef.current
    if (!el || !drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 3) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const el = railRef.current
    drag.current.active = false
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }

  return (
    <div className="relative">
      {/* Arrows */}
      {([['left', canLeft, -1], ['right', canRight, 1]] as const).map(([side, enabled, dir]) => (
        <button
          key={side}
          type="button"
          aria-label={side === 'left' ? 'Scroll to previous photographs' : 'Scroll to more photographs'}
          onClick={() => step(dir)}
          className={`hidden md:flex absolute ${side === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border transition-all duration-300`}
          style={{
            backgroundColor: '#171717',
            borderColor: 'rgba(255,255,255,0.18)',
            color: '#fff',
            opacity: enabled ? 1 : 0,
            pointerEvents: enabled ? 'auto' : 'none',
          }}
        >
          {side === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      ))}

      {/* Rail */}
      <div
        ref={railRef}
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory py-2 -my-2 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', touchAction: 'pan-y' }}
      >
        {shots.map((s, i) => (
          <motion.figure
            key={s.src}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
            className="group relative snap-start shrink-0 rounded-2xl overflow-hidden border w-[240px] sm:w-[280px] lg:w-[320px] aspect-square"
            style={{ borderColor: D.border, backgroundColor: D.cardBg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.caption}
              loading={eager ? 'eager' : 'lazy'}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />

            {/* Caption scrim, only as strong as the caption needs */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92), transparent)' }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white font-semibold text-sm leading-snug">{s.caption}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.62)' }}>{s.location}</p>
              <div className="mt-2 h-[2px] w-0 group-hover:w-10 transition-all duration-500" style={{ backgroundColor: BRAND_ORANGE }} />
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}
