'use client'

import { motion } from 'framer-motion'
import {
  ClipboardList, Drill, Building2, FlaskConical, Blocks, Zap,
  Droplets, Paintbrush, Trees, Camera, ListChecks, ShieldCheck,
} from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'
import CountUp from '@/components/ui/CountUp'
import StepSequence from '@/components/ui/StepSequence'

const D = DARK_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const STAGES = [
  {
    icon: ClipboardList, num: '01', title: 'Pre-Construction Planning',
    body: 'Sequence, procurement, site logistics and the stage-wise programme agreed before anyone breaks ground.',
    output: 'Construction programme + cost plan',
  },
  {
    icon: Drill, num: '02', title: 'Soil Testing & Site Preparation',
    body: 'Bore samples tested to IS 1888, then levelling, setting out and access established. The ground tells us what it can carry.',
    output: 'Soil report + setting-out drawings',
  },
  {
    icon: Building2, num: '03', title: 'Foundation & Structural Execution',
    body: 'Foundations, columns and slabs built to the approved structural design for your soil and your spans.',
    output: 'Stamped structural drawing set',
  },
  {
    icon: FlaskConical, num: '04', title: 'Rebar & Concrete Quality Control',
    body: 'Rebar layouts checked against the structural drawings before pouring, and concrete cube-tested to IS 456.',
    output: 'Cube test certificates',
  },
  {
    icon: Blocks, num: '05', title: 'Masonry & Envelope',
    body: 'Walls, openings and the external envelope built to line and level, with materials checked on delivery.',
    output: 'Envelope inspection records',
  },
  {
    icon: Zap, num: '06', title: 'MEP Execution',
    body: 'Electrical, plumbing and drainage installed to coordinated services drawings, every trade controlled through CB9 site management.',
    output: 'Coordinated MEP layouts',
  },
  {
    icon: Droplets, num: '07', title: 'Waterproofing & Testing',
    body: 'Terraces, bathrooms and sunken areas waterproofed, then flood-tested and signed off before finishes go on.',
    output: 'Flood test sign-off',
  },
  {
    icon: Paintbrush, num: '08', title: 'Interior Execution',
    body: 'Flooring, joinery, painting and fittings finished to the interior design, down to the shadow gaps.',
    output: 'Finish schedule with material records',
  },
  {
    icon: Trees, num: '09', title: 'Landscape Coordination',
    body: 'Courtyards, planting, drainage and hardscape completed with the building, not bolted on afterwards.',
    output: 'Landscape and drainage layout',
  },
  {
    icon: Camera, num: '10', title: 'Quality Inspections & Documentation',
    body: 'Stage inspections, weekly photographs and every test certificate collected into one project file you can open any day.',
    output: 'Complete project dossier',
  },
  {
    icon: ListChecks, num: '11', title: 'Snagging & Handover',
    body: 'A joint snag list closed out, then a recorded walkthrough of every system before the keys change hands.',
    output: 'Closed snag list + walkthrough',
  },
  {
    icon: ShieldCheck, num: '12', title: 'Warranty & Maintenance',
    body: 'A written warranty pack and a maintenance calendar, so the residence is looked after long after handover.',
    output: 'Warranty pack + maintenance calendar',
  },
] as const

/** Defensible proof points only — no unverified project counts. */
const STATS = [
  { value: 'IS',   label: 'Concrete cube-tested to IS 456' },
  { value: 'One',  label: 'Team accountable for every trade' },
  { value: 'Full', label: 'Handover recorded and documented' },
  { value: '10+',  label: 'Years building in Chennai' },
] as const

export default function BuildProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Build Process"
        lines={[
          'Engineering You',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Can Audit.</span>,
        ]}
        intro="Twelve stages between approved drawings and handed-over keys, each one inspected, photographed and filed. This is how a CB9 design survives contact with the real world, intact."
        meta={['IS 1888 Soil Testing', 'IS 456 Concrete', 'CB9 Site Management', 'Documented Handover']}
        image="/heroes/build-process.jpg"
        imageAlt="A concrete mixer being charged with water on a CB9 site, with aggregate stacked alongside"
      />

      {/* Stages, pinned, scroll-driven walkthrough */}
      <StepSequence
        steps={STAGES}
        eyebrow="How We Build"
        heading={<>Twelve Stages, <span style={{ color: BRAND_ORANGE }}>In Order.</span></>}
      />

      {/* Proof stats */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              The Record
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: D.text }}
              lines={[
                'Numbers We Can',
                <span key="l2" style={{ color: BRAND_ORANGE }}>Prove.</span>,
              ]}
            />
          </div>
          <div className="rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: D.border }}>
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="p-8 lg:p-10" style={{ backgroundColor: D.cardBg }}>
                <CountUp
                  value={value}
                  delay={i * 0.12}
                  className="block font-bold text-5xl lg:text-6xl mb-3"
                  style={{ color: D.text }}
                />
                <p className="text-xs leading-relaxed" style={{ color: D.textMuted }}>{label}</p>
              </div>
            ))}
          </div>
          <motion.p
            className="mt-10 text-sm max-w-xl"
            style={{ color: D.textFaint }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every figure above is backed by a document in a client&apos;s project file, ask any of them.
          </motion.p>
        </div>
      </section>

      <PageCTA
        lines={[
          'Watch Your Home',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Being Proven.</span>,
        ]}
        body="Walk a live CB9 site with us before you decide anything: see the drawings, the tests, and the people doing the work."
        ctaLabel="Book a Site Visit"
      />
    </>
  )
}
