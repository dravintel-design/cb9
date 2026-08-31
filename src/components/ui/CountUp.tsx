'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { isPrintMode } from '@/components/ui/PrintMode'

interface CountUpProps {
  /** Display value, e.g. "10+", "100%", "One". Non-numeric values render as-is. */
  value: string
  duration?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Animated counter — parses prefix/number/suffix out of the display value
 * and counts the numeric part up when scrolled into view.
 */
export default function CountUp({
  value,
  duration = 1.6,
  delay = 0,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()

  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const numStr = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''
  const target = Number(numStr.replace(/,/g, ''))
  const grouped = numStr.includes(',')

  const [display, setDisplay] = useState(match ? `${prefix}0${suffix}` : value)

  // Static capture never runs the animation to completion, which would print
  // every stat as zero — show the final value straight away.
  useEffect(() => {
    if (isPrintMode()) setDisplay(value)
  }, [value])

  useEffect(() => {
    if (!inView) return
    if (reduce || !match || Number.isNaN(target)) {
      setDisplay(value)
      return
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => {
        const n = Math.round(v)
        setDisplay(`${prefix}${grouped ? n.toLocaleString('en-IN') : String(n)}${suffix}`)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
