'use client'

import { motion } from 'framer-motion'
import { Drill, FlaskConical, Building2, Zap, Paintbrush, Camera, Video, ShieldCheck } from 'lucide-react'
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
    icon: Drill,
    num: '01',
    title: 'Pre-Construction & Soil Testing',
    body: 'Bore samples tested to IS 1888 before the foundation is designed. The ground tells us what it can carry; we do not guess.',
    output: 'Soil report filed in your project record',
  },
  {
    icon: Building2,
    num: '02',
    title: 'Structural Engineering',
    body: 'Foundations, columns, and slabs designed in-house against IS 456 and IS 875 — sized for your soil and your spans, not copied from the last site.',
    output: 'Stamped structural drawing set',
  },
  {
    icon: FlaskConical,
    num: '03',
    title: 'Quality Testing',
    body: 'Concrete cube-tested at every pour. Rebar layouts photographed and verified against drawings before a single bucket of concrete goes in.',
    output: 'Cube test certificates, every batch',
  },
  {
    icon: Zap,
    num: '04',
    title: 'MEP Execution',
    body: 'Electrical, plumbing, and drainage run by CB9 employees — FRLS wiring, pressure-tested lines, and conduit routes that match the drawings.',
    output: 'As-built MEP layout drawings',
  },
  {
    icon: Paintbrush,
    num: '05',
    title: 'Interior Execution',
    body: 'Flooring, joinery, painting, and fittings finished by the same accountable team — the interior design honoured down to the shadow gaps.',
    output: 'Finish schedule with material records',
  },
  {
    icon: Camera,
    num: '06',
    title: 'Documentation',
    body: 'Weekly photographs, stage-completion reports, and every test certificate organised into one project file you can open any day.',
    output: 'Complete project dossier',
  },
  {
    icon: Video,
    num: '07',
    title: 'Video Handover',
    body: 'Before the keys, a recorded walkthrough of every system — where the valves are, what the switches do, how the house works.',
    output: 'Walkthrough video + keys, together',
  },
  {
    icon: ShieldCheck,
    num: '08',
    title: 'Warranty',
    body: 'A written warranty pack and a maintenance calendar. When we say we stand behind the house, it is on paper.',
    output: 'Warranty pack + maintenance calendar',
  },
] as const

const STATS = [
  { value: '100%', label: 'Concrete batches cube-tested' },
  { value: '0',    label: 'Subcontractors, ever' },
  { value: '40+',  label: 'Homes handed over on video' },
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
        intro="Eight stages between drawings and keys — each one tested, photographed, and filed. This is how a CB9 design survives contact with the real world, intact."
        meta={['IS 1888 Soil Testing', 'IS 456 Concrete', 'Zero Subcontractors', 'Video Handover']}
        image="/heroes/build-process.svg"
        imageAlt="Structural section drawing with column grid, slabs, rebar lines, and footings"
      />

      {/* Stages — pinned, scroll-driven walkthrough */}
      <StepSequence
        steps={STAGES}
        eyebrow="How We Build"
        heading={<>Eight Stages, <span style={{ color: BRAND_ORANGE }}>In Order.</span></>}
      />

      {/* Proof stats */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
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
            Every figure above is backed by a document in a client&apos;s project file — ask any of them.
          </motion.p>
        </div>
      </section>

      <PageCTA
        lines={[
          'Watch Your Home',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Being Proven.</span>,
        ]}
        body="Walk a live CB9 site with us before you decide anything — see the drawings, the tests, and the people doing the work."
        ctaLabel="Book a Site Visit"
      />
    </>
  )
}
