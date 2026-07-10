'use client'

import React, {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import './CardSwapScroll.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
  )
)
Card.displayName = 'Card'

export interface CardSwapScrollProps {
  children: React.ReactNode
  /** Element to pin while the cards swap. Falls back to the card stage. */
  pinTargetRef?: React.RefObject<HTMLElement>
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  skewAmount?: number
  /** How far a leaving card drops (px). */
  dropDistance?: number
  /** Scroll distance (px) consumed per card swap. */
  scrollPerCard?: number
  onActiveChange?: (index: number) => void
}

const CardSwapScroll = ({
  children,
  pinTargetRef,
  width = 440,
  height = 300,
  cardDistance = 56,
  verticalDistance = 64,
  skewAmount = 5,
  dropDistance = 620,
  scrollPerCard = 480,
  onActiveChange,
}: CardSwapScrollProps) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const childArr = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(
    () => childArr.map(() => createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  )

  useLayoutEffect(() => {
    const total = refs.length
    if (!total) return
    const els = refs.map(r => r.current).filter(Boolean) as HTMLDivElement[]
    if (els.length !== total) return

    let lastActive = -1
    const applyProgress = (progress: number) => {
      // Fractional "front position": 0 → card 0 at front, total-1 → last card at front
      const p = progress * (total - 1)

      els.forEach((el, i) => {
        const rel = i - p

        if (rel >= 0) {
          // Waiting in the stack (rel = depth). rel === 0 → resting at front.
          const depth = rel
          gsap.set(el, {
            x: depth * cardDistance,
            y: -depth * verticalDistance,
            z: -depth * cardDistance * 1.5,
            xPercent: -50,
            yPercent: -50,
            skewY: skewAmount,
            opacity: 1,
            zIndex: 100 - Math.round(depth),
            transformOrigin: 'center center',
            force3D: true,
          })
        } else {
          // Leaving: drop down and fade out, staying in front as it falls away
          const leave = Math.min(1, -rel)
          gsap.set(el, {
            x: 0,
            y: leave * dropDistance,
            z: 0,
            xPercent: -50,
            yPercent: -50,
            skewY: skewAmount,
            opacity: 1 - leave,
            zIndex: 200,
            transformOrigin: 'center center',
            force3D: true,
          })
        }
      })

      const active = Math.max(0, Math.min(total - 1, Math.round(p)))
      if (active !== lastActive) {
        lastActive = active
        onActiveChange?.(active)
      }
    }

    // Respect reduced-motion: show a static readable stack, no pin/scrub.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    applyProgress(0)

    if (prefersReduced) return

    const pinEl = pinTargetRef?.current ?? stageRef.current
    if (!pinEl) return

    const st = ScrollTrigger.create({
      trigger: pinEl,
      start: 'top top',
      end: `+=${(total - 1) * scrollPerCard}`,
      pin: pinEl,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => applyProgress(self.progress),
      onRefresh: self => applyProgress(self.progress),
    })

    return () => st.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.length, cardDistance, verticalDistance, skewAmount, dropDistance, scrollPerCard])

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
        } as CardProps & { ref: React.Ref<HTMLDivElement> })
      : child
  )

  return (
    <div ref={stageRef} className="card-swap-scroll-stage">
      {rendered}
    </div>
  )
}

export default CardSwapScroll
