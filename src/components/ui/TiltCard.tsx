'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionStyle,
} from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Max tilt in degrees. */
  maxTilt?: number
  /** Colour of the cursor-following spotlight glow. */
  glowColor?: string
  /** Radius of the spotlight in px. */
  glowRadius?: number
}

/**
 * Interactive card that tilts in 3D toward the cursor and renders a
 * soft spotlight glow that follows the pointer. Content placed inside
 * with `style={{ transform: 'translateZ(Npx)' }}` will pop in 3D.
 */
export default function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 9,
  glowColor = 'rgba(232,72,28,0.14)',
  glowRadius = 520,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const spring = { stiffness: 150, damping: 17, mass: 0.25 }
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring)

  const glowX = useTransform(px, v => `${v * 100}%`)
  const glowY = useTransform(py, v => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(${glowRadius}px circle at ${glowX} ${glowY}, ${glowColor}, transparent 65%)`

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        ...style,
      } as MotionStyle}
      className={`group relative ${className}`}
    >
      {/* Cursor-following spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  )
}
