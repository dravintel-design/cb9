'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import { isPrintMode } from '@/components/ui/PrintMode'

const D = DARK_SECTION

export interface BeforeAfterProps {
  /** Left of the handle: the site, the plot, or the design intent. */
  before: { src: string; alt: string; label: string }
  /** Right of the handle: the finished, built residence. */
  after: { src: string; alt: string; label: string }
  caption?: string
  /** Starting handle position, 0–100. */
  start?: number
}

/**
 * Drag-to-compare panel. The handle sits at the centre; dragging it left reveals
 * the "after" image to the far edge, dragging right reveals the "before" image.
 * Keyboard accessible via the slider role (arrows, Home/End).
 */
export default function BeforeAfter({ before, after, caption, start = 50 }: BeforeAfterProps) {
  const [pos, setPos] = useState(start)
  const [dragging, setDragging] = useState(false)
  // Mirrored in a ref: a fast drag can dispatch pointermove in the same tick as
  // pointerdown, before React has re-rendered with dragging = true.
  const draggingRef = useRef(false)
  const frameRef = useRef<HTMLDivElement>(null)
  // Static capture cannot be dragged, so it rests slightly off-centre and shows both labels.
  const [printing, setPrinting] = useState(false)

  useEffect(() => {
    if (isPrintMode()) setPrinting(true)
  }, [])

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    if (width === 0) return
    setPos(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)))
  }, [])

  // Pointer capture keeps the drag alive past the panel edges, so the user can
  // sweep all the way to either end without losing the handle.
  const onPointerDown = (e: React.PointerEvent) => {
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* capture is a nicety, not required */ }
    draggingRef.current = true
    setDragging(true)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    setFromClientX(e.clientX)
  }
  const endDrag = () => {
    draggingRef.current = false
    setDragging(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - step)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + step)) }
    else if (e.key === 'Home') { e.preventDefault(); setPos(0) }
    else if (e.key === 'End') { e.preventDefault(); setPos(100) }
  }

  const p = printing ? 46 : pos

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frameRef}
        className="rounded-2xl relative overflow-hidden select-none border"
        style={{
          borderColor: D.border,
          backgroundColor: D.cardBg,
          aspectRatio: '16 / 9',
          minHeight: 380,
          maxHeight: '78vh',
          cursor: dragging ? 'grabbing' : 'ew-resize',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* After, full bleed underneath */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="100vw"
          className="object-cover pointer-events-none"
          draggable={false}
          priority={printing}
        />

        {/* Before, clipped to the left of the handle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - p}% 0 0)`,
            transition: dragging ? 'none' : 'clip-path 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="100vw"
            className="object-cover"
            draggable={false}
            priority={printing}
          />
        </div>

        {/* Corner labels */}
        <span
          className="rounded-lg absolute top-5 left-5 text-xs font-semibold tracking-[0.16em] uppercase px-4 py-2 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"
          style={{
            color: '#fff',
            backgroundColor: 'rgba(8,8,8,0.6)',
            border: '1px solid rgba(255,255,255,0.18)',
            opacity: p < 14 ? 0 : 1,
          }}
        >
          {before.label}
        </span>
        <span
          className="rounded-lg absolute top-5 right-5 text-xs font-semibold tracking-[0.16em] uppercase px-4 py-2 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"
          style={{
            color: '#fff',
            backgroundColor: `${BRAND_ORANGE}d9`,
            border: `1px solid ${BRAND_ORANGE}`,
            opacity: p > 86 ? 0 : 1,
          }}
        >
          {after.label}
        </span>

        {/* Divider + handle */}
        <div
          className="absolute inset-y-0 pointer-events-none"
          style={{
            left: `${p}%`,
            transform: 'translateX(-50%)',
            transition: dragging ? 'none' : 'left 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px]" style={{ backgroundColor: '#fff', boxShadow: '0 0 18px rgba(0,0,0,0.55)' }} />
          <motion.div
            role="slider"
            tabIndex={0}
            aria-label={`Compare ${before.label} with ${after.label}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(p)}
            aria-valuetext={`${Math.round(p)}% ${before.label}`}
            onKeyDown={onKeyDown}
            animate={{ scale: dragging ? 1.08 : 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center pointer-events-auto outline-none focus-visible:ring-4"
            style={{
              width: 72,
              height: 72,
              backgroundColor: BRAND_ORANGE,
              color: '#fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
              cursor: dragging ? 'grabbing' : 'grab',
            }}
          >
            <MoveHorizontal className="w-8 h-8" />
          </motion.div>
        </div>
      </div>

      {caption && (
        <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>
          {caption}
        </p>
      )}
      <p className="text-[11px] tracking-wide" style={{ color: D.textFaint }} aria-hidden="true">
        Drag the handle to compare
      </p>
    </div>
  )
}
