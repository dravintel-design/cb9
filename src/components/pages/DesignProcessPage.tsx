'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import { ScrollTrigger } from '@/lib/gsap'
import { isPrintMode } from '@/components/ui/PrintMode'
import { getLenis } from '@/lib/lenis'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'
import DnaHelix from '@/components/ui/DnaHelix'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const STAGES = [
  { num: '01', title: 'Discover',                    body: 'Family, lifestyle, aspirations and future needs. Long conversations before any drawing — the brief starts from how you actually live.' },
  { num: '02', title: 'Understand the Site',         body: 'Plot, orientation, sunlight, wind, access, views, neighbours and regulations, measured and mapped before a line is drawn.' },
  { num: '03', title: 'Define the Brief',            body: 'Needs translated into a clear spatial and functional brief — room by room, with the trade-offs made explicit.' },
  { num: '04', title: 'Zoning',                      body: 'Public, semi-private, private, service, recreation and outdoor relationships resolved before form is considered.' },
  { num: '05', title: 'Concept Architecture',        body: 'Massing, circulation, light, ventilation and the relationship to the site. Two or three honest directions, each explained.' },
  { num: '06', title: 'Design Development',          body: 'Plans, elevations, sections, 3D and materials — iterated with you in the room for every major decision.' },
  { num: '07', title: 'Engineering',                 body: 'Soil testing, structural design and MEP coordination, running alongside the architecture rather than after it.' },
  { num: '08', title: 'Documentation & Approvals',   body: 'Construction documentation and specifications prepared, and every approval filed and tracked on your behalf.' },
  { num: '09', title: 'Elevation, Interiors & Landscape', body: 'The complete residence developed beyond the building shell — finishes, joinery, light, planting and outdoor rooms.' },
  { num: '10', title: 'Build',                       body: 'The approved design translated into reality, with one team accountable for every trade on site.' },
  { num: '11', title: 'Handover',                    body: 'Testing, snagging, documentation and a recorded walkthrough before the keys change hands.' },
] as const

const DNA = [
  { num: '01', principle: 'Light before luxury',            note: 'A well-lit modest room beats a dark expensive one.' },
  { num: '02', principle: 'Privacy before aesthetics',      note: 'The street never looks into your living room, however good the elevation.' },
  { num: '03', principle: 'Cross ventilation first',        note: 'Every habitable room breathes from two sides. Chennai demands it.' },
  { num: '04', principle: 'Engineering before decoration',  note: 'Structure is designed, never disguised.' },
  { num: '05', principle: 'Materials that age beautifully', note: 'Brick, stone, and timber that gain character — not cladding that peels.' },
  { num: '06', principle: 'Function before trends',         note: 'We skip what Instagram loves this year for what your family needs for thirty.' },
  { num: '07', principle: 'Timeless architecture',          note: 'Proportion and shadow over ornament. Homes that will not date.' },
  { num: '08', principle: 'Homes built around families',    note: 'The plan follows your rituals — morning coffee to festival cooking.' },
] as const

/** Degrees of helix twist between one principle and the next (nodes sit 72° apart). */
const DEG_PER_PRINCIPLE = 72
/** Scroll distance consumed per principle while the section is pinned. */
const SCROLL_PER_PRINCIPLE = 380

export default function DesignProcessPage() {
  const [activeDna, setActiveDna] = useState(0)
  const active = DNA[activeDna]!

  const dnaSectionRef = useRef<HTMLElement>(null)
  const dnaRotation = useMotionValue(0)
  const dnaStRef = useRef<InstanceType<typeof ScrollTrigger> | null>(null)
  const lastIdxRef = useRef(0)
  // Static capture shows all eight principles instead of the live single panel.
  const [printing, setPrinting] = useState(false)

  useEffect(() => {
    if (isPrintMode()) setPrinting(true)
  }, [])

  // Pin the Design DNA section and walk 01 -> 08 as the user scrolls,
  // twisting the helix so the active node turns to the front.
  useEffect(() => {
    if (isPrintMode()) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // On small screens the stacked layout is taller than the viewport —
    // keep tap-to-reveal there instead of pinning.
    if (window.innerWidth < 1024) return
    const el = dnaSectionRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${(DNA.length - 1) * SCROLL_PER_PRINCIPLE}`,
      pin: el,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => {
        dnaRotation.set(-self.progress * (DNA.length - 1) * DEG_PER_PRINCIPLE)
        const idx = Math.max(0, Math.min(DNA.length - 1, Math.round(self.progress * (DNA.length - 1))))
        if (idx !== lastIdxRef.current) {
          lastIdxRef.current = idx
          setActiveDna(idx)
        }
      },
    })
    dnaStRef.current = st

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => {})

    return () => {
      window.removeEventListener('load', refresh)
      st.kill()
      dnaStRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clicking a node/chip scrolls to that principle's position in the sequence.
  const selectDna = (i: number) => {
    const st = dnaStRef.current
    const lenis = getLenis()
    if (st && lenis) {
      lenis.scrollTo(st.start + (i / (DNA.length - 1)) * (st.end - st.start), { duration: 0.9 })
    } else {
      setActiveDna(i)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Design Process"
        lines={[
          'Eleven Stages.',
          <span key="l2" style={{ color: BRAND_ORANGE }}>No Shortcuts.</span>,
        ]}
        intro="Every CB9 residence moves through the same sequence: understand the family, understand the site, then design — with engineering, interiors and landscape developed as one complete residence rather than bolted on."
        meta={['Discovery → Handover', 'Engineering-led', 'Fully Documented']}
        image="/heroes/design-process.svg"
        imageAlt="Floor plan sketch with door swing arcs, furniture layout, dimensions, and a north arrow"
      />

      {/* Eleven stages — editorial list */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-16">
          {STAGES.map(({ num, title, body }, i) => (
            <motion.div
              key={num}
              className="grid grid-cols-12 gap-6 py-10 border-b"
              style={{ borderColor: L.border }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="col-span-12 sm:col-span-2">
                <span
                  className="font-bold tabular-nums leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: i === 0 ? BRAND_ORANGE : `${BRAND_ORANGE}55` }}
                >
                  {num}
                </span>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <h3 className="font-bold text-xl lg:text-2xl leading-snug" style={{ color: L.text }}>{title}</h3>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <p className="text-sm lg:text-base leading-relaxed" style={{ color: L.textMuted }}>{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Design DNA */}
      <section
        id="design-dna"
        ref={dnaSectionRef}
        className="min-h-screen flex items-center overflow-hidden scroll-mt-24"
        style={{ backgroundColor: D.bg }}
      >
        <div className="mx-auto max-w-7xl w-full px-6 lg:px-16 py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
                Design DNA
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-md"
                style={{ color: D.text }}
                amount={0.3}
                lines={[
                  'Eight Principles.',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>Every Project.</span>,
                ]}
              />
            </div>
            <p className="text-sm max-w-xs" style={{ color: D.textFaint }}>
              Keep scrolling — the strand turns and each principle reveals itself in order.
            </p>
          </div>

          {/* Static capture: every principle laid out for review */}
          {printing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {DNA.map(({ num, principle, note }) => (
                <div key={num} className="py-6 border-b flex items-start gap-6" style={{ borderColor: D.border }}>
                  <span className="text-xs font-bold tabular-nums pt-2" style={{ color: BRAND_ORANGE }}>{num}</span>
                  <div>
                    <h3 className="font-bold text-xl leading-snug mb-1.5" style={{ color: D.text }}>{principle}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>{note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={printing ? 'hidden' : 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center'}>
            {/* 3D helix — twists on scroll, nodes are clickable */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <DnaHelix
                principles={DNA}
                activeIndex={activeDna}
                onSelect={selectDna}
                rotation={dnaRotation}
              />
              <p className="text-center text-xs mt-2" style={{ color: D.textFaint }}>
                Scroll to move through the strand · tap a number to jump to its principle
              </p>
            </motion.div>

            {/* Reveal panel + all eight principles */}
            <div className="flex flex-col gap-8">
              {/* Active principle reveal */}
              <div className="relative min-h-[190px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-2xl border p-8 lg:p-10"
                    style={{ backgroundColor: D.cardBg, borderColor: `${BRAND_ORANGE}35` }}
                  >
                    <span
                      className="font-bold tabular-nums leading-none block mb-4"
                      style={{ fontSize: '2.6rem', color: `${BRAND_ORANGE}45` }}
                    >
                      {active.num}
                    </span>
                    <h3 className="font-bold text-2xl lg:text-3xl leading-snug mb-3" style={{ color: D.text }}>
                      {active.principle}
                    </h3>
                    <p className="text-sm lg:text-base leading-relaxed" style={{ color: D.textMuted }}>
                      {active.note}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* All eight — click to reveal */}
              <div className="grid grid-cols-2 gap-2">
                {DNA.map(({ num, principle }, i) => {
                  const isActive = i === activeDna
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => selectDna(i)}
                      aria-pressed={isActive}
                      className="rounded-xl flex items-center gap-3 px-4 py-3 border text-left transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${BRAND_ORANGE}12` : 'transparent',
                        borderColor: isActive ? BRAND_ORANGE : D.border,
                      }}
                    >
                      <span
                        className="text-[10px] font-bold tabular-nums shrink-0"
                        style={{ color: BRAND_ORANGE }}
                      >
                        {num}
                      </span>
                      <span
                        className="text-xs font-semibold leading-snug transition-colors duration-300"
                        style={{ color: isActive ? D.text : D.textMuted }}
                      >
                        {principle}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        lines={[
          'Begin at',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Stage One.</span>,
        ]}
        body="Discovery starts with a conversation about your family and your site — no fees, no commitment, no sales script."
        ctaLabel="Book a Discovery Call"
      />
    </>
  )
}
