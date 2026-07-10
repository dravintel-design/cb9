'use client'

import { useRef, useState } from 'react'
import { MapPin, PencilRuler, Building2, Wrench, Video } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import CardSwapScroll, { Card } from '@/components/ui/CardSwapScroll'

const T = DARK_SECTION

const STEPS = [
  {
    num: '01',
    icon: MapPin,
    title: 'Site Visit & Honest Scope',
    body: 'We walk the site, run soil checks, and give you a realistic scope — no inflated estimates to win the deal.',
    badge: 'Stage-wise payment schedule locked upfront',
  },
  {
    num: '02',
    icon: PencilRuler,
    title: 'Design & Permits',
    body: 'Our in-house civil engineers produce structural drawings and handle every government approval.',
    badge: 'Structural drawings + all approvals handled',
  },
  {
    num: '03',
    icon: Building2,
    title: 'Foundation & Structure',
    body: 'Concrete is cube-tested to IS standards. Every pour is recorded. Nothing is skipped for speed.',
    badge: 'Soil test + concrete cube tested to IS standards',
  },
  {
    num: '04',
    icon: Wrench,
    title: 'MEP & Interior Finishing',
    body: 'Mechanical, electrical, and plumbing work done entirely by our own team — zero outsourcing.',
    badge: 'All our workers — zero subcontractors',
  },
  {
    num: '05',
    icon: Video,
    title: 'Video-Documented Handover',
    body: 'You get the keys, a walkthrough video of every system, and a full warranty pack.',
    badge: 'Keys + walkthrough video + warranty pack',
  },
] as const

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: T.bg }}
    >
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left — copy + live step index */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
              How We Build
            </p>
            <h2 className="font-bold leading-tight text-display-lg mb-6" style={{ color: T.text }}>
              Precision Is a Process,
              <br />
              <span style={{ color: BRAND_ORANGE }}>Not a Promise.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: T.textMuted }}>
              Five stages, one accountable team. Scroll through each stage — from the first
              soil test to the final walkthrough on video.
            </p>

            {/* Step index list — highlights the active card */}
            <ul className="flex flex-col gap-2">
              {STEPS.map(({ num, title }, i) => {
                const isActive = i === active
                return (
                  <li
                    key={num}
                    className="flex items-center gap-4 py-1.5 transition-all duration-300"
                    style={{ opacity: isActive ? 1 : 0.45 }}
                  >
                    <span
                      className="text-xs font-bold tabular-nums w-8 h-8 flex items-center justify-center border shrink-0 transition-all duration-300"
                      style={{
                        color: isActive ? '#ffffff' : BRAND_ORANGE,
                        borderColor: isActive ? BRAND_ORANGE : `${BRAND_ORANGE}30`,
                        backgroundColor: isActive ? BRAND_ORANGE : `${BRAND_ORANGE}08`,
                      }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-sm font-medium transition-all duration-300"
                      style={{ color: isActive ? T.text : T.textMuted }}
                    >
                      {title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right — scroll-driven swapping cards */}
          <div className="relative h-[420px] lg:h-[520px] w-full">
            <CardSwapScroll
              pinTargetRef={sectionRef}
              width={440}
              height={300}
              cardDistance={56}
              verticalDistance={60}
              skewAmount={5}
              scrollPerCard={480}
              onActiveChange={setActive}
            >
              {STEPS.map(({ num, icon: Icon, title, body, badge }) => (
                <Card key={num}>
                  <div className="w-full h-full flex flex-col p-8">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-12 h-12 flex items-center justify-center border shrink-0"
                        style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}12` }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="font-bold tabular-nums leading-none select-none"
                        style={{ fontSize: '3rem', color: 'rgba(232,72,28,0.18)' }}
                      >
                        {num}
                      </span>
                    </div>

                    {/* Title + body */}
                    <h3 className="font-bold text-xl mb-2" style={{ color: '#ffffff' }}>{title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{body}</p>

                    {/* Output badge */}
                    <span
                      className="inline-block self-start text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 border mt-4"
                      style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}08` }}
                    >
                      Output → {badge}
                    </span>
                  </div>
                </Card>
              ))}
            </CardSwapScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
