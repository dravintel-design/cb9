'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { BRAND_ORANGE } from '@/lib/utils'

/* Helix geometry */
const RUNGS = 22          // total base pairs
const STEP = 24           // degrees of twist per rung
const SPACING = 21        // px between rungs
const RADIUS = 108        // half-width of a rung

interface PrincipleNodeProps {
  num: string
  angle: number
  active: boolean
  rotation: MotionValue<number>
  onClick: () => void
  label: string
}

/** Clickable numbered node on the helix — counter-rotated to always face the viewer. */
function PrincipleNode({ num, angle, active, rotation, onClick, label }: PrincipleNodeProps) {
  const counter = useTransform(rotation, r => -(r + angle))

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Reveal principle: ${label}`}
      aria-pressed={active}
      className="absolute flex items-center justify-center rounded-full font-bold tabular-nums cursor-pointer select-none"
      style={{
        width: 36,
        height: 36,
        right: -18,
        top: -17,
        rotateY: counter,
        backgroundColor: active ? BRAND_ORANGE : '#171717',
        color: active ? '#ffffff' : BRAND_ORANGE,
        border: `1.5px solid ${active ? BRAND_ORANGE : `${BRAND_ORANGE}70`}`,
        boxShadow: active ? `0 0 24px ${BRAND_ORANGE}80` : 'none',
        fontSize: 11,
        zIndex: 10,
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {num}
    </motion.button>
  )
}

interface DnaHelixProps {
  principles: readonly { num: string; principle: string }[]
  activeIndex: number
  onSelect: (i: number) => void
}

/**
 * CSS-3D double helix that twists as the page scrolls. Every ~3rd rung
 * carries a numbered, clickable principle node.
 */
export default function DnaHelix({ principles, activeIndex, onSelect }: DnaHelixProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 480])
  const rotation = useSpring(raw, { stiffness: 55, damping: 18, mass: 0.4 })

  // Which rung indices carry a principle node (8 nodes over 22 rungs).
  const nodeRungs = principles.map((_, i) => i * 3)

  return (
    <div
      ref={sceneRef}
      className="relative flex items-center justify-center h-[420px] sm:h-[500px] select-none"
      style={{ perspective: 1100 }}
      aria-label="Interactive DNA helix of design principles"
    >
      <motion.div
        className="relative scale-[0.68] sm:scale-[0.85] lg:scale-100"
        style={{
          rotateY: rotation,
          transformStyle: 'preserve-3d',
          width: 0,
          height: RUNGS * SPACING,
        }}
      >
        {Array.from({ length: RUNGS }, (_, i) => {
          const angle = i * STEP
          const nodeIndex = nodeRungs.indexOf(i)
          const hasNode = nodeIndex !== -1
          const isActiveRung = hasNode && nodeIndex === activeIndex

          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: i * SPACING,
                left: -RADIUS,
                width: RADIUS * 2,
                height: 2,
                transform: `rotateY(${angle}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Rung bar */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: hasNode
                    ? `linear-gradient(to right, rgba(255,255,255,0.12), ${BRAND_ORANGE}${isActiveRung ? '' : '90'})`
                    : 'linear-gradient(to right, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                  opacity: hasNode ? 1 : 0.8,
                }}
              />

              {/* Left strand dot */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 7,
                  height: 7,
                  left: -3,
                  top: -2.5,
                  backgroundColor: 'rgba(255,255,255,0.35)',
                }}
              />

              {/* Right strand: principle node or plain dot */}
              {hasNode ? (
                <PrincipleNode
                  num={principles[nodeIndex]!.num}
                  label={principles[nodeIndex]!.principle}
                  angle={angle}
                  active={nodeIndex === activeIndex}
                  rotation={rotation}
                  onClick={() => onSelect(nodeIndex)}
                />
              ) : (
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    right: -3,
                    top: -2.5,
                    backgroundColor: `${BRAND_ORANGE}55`,
                  }}
                />
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Soft glow behind the helix */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(38% 55% at 50% 50%, ${BRAND_ORANGE}12, transparent 70%)`,
        }}
      />
    </div>
  )
}
