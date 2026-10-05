'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, FileText, Compass, Ruler, Layers, Camera, Clock, Wrench, Boxes, Lightbulb } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'
import BeforeAfter from '@/components/ui/BeforeAfter'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const FILTERS = ['All', 'Residences', 'Concept Studies', 'Interiors'] as const
type Filter = (typeof FILTERS)[number]

interface Project {
  id: string
  title: string
  location: string
  category: Exclude<Filter, 'All'>
  status: 'Completed' | 'Concept Study'
  spec: string
  note: string
  year: string
}

const PROJECTS: readonly Project[] = [
  {
    id: 'lakshmi-villa',
    title: 'Lakshmi Villa',
    location: 'Avadi, Chennai',
    category: 'Residences',
    status: 'Completed',
    spec: '2,200 sq.ft · G+1 · 3BHK',
    note: 'A corner-plot family home designed around a central light well, with concrete cube-tested at each pour and a recorded handover walkthrough.',
    year: '2024',
  },
  {
    id: 'murugan-nagar-duplex',
    title: 'Murugan Nagar Duplex',
    location: 'Thiruvallur',
    category: 'Residences',
    status: 'Completed',
    spec: '1,850 sq.ft · Duplex',
    note: 'A stage-wise contract with an open cost sheet, so every line item was visible before it was approved.',
    year: '2024',
  },
  {
    id: 'priya-enclave',
    title: 'Priya Enclave',
    location: 'Pattibiram, Chennai',
    category: 'Residences',
    status: 'Completed',
    spec: '4,100 sq.ft · G+2',
    note: 'Three floors engineered on a narrow footprint, structural drawings, permits and handover pack coordinated end to end by CB9.',
    year: '2023',
  },
  {
    id: 'courtyard-villa-concept',
    title: 'Courtyard Villa Study',
    location: 'Poonamallee corridor',
    category: 'Concept Studies',
    status: 'Concept Study',
    spec: '5,400 sq.ft · Single family',
    note: 'A west-facing plot answered with a shaded central courtyard: sun-path study, massing model, and material palette.',
    year: '2025',
  },
  {
    id: 'mango-farmhouse-concept',
    title: 'Mango Orchard Farmhouse',
    location: 'Thiruvallur outskirts',
    category: 'Concept Studies',
    status: 'Concept Study',
    spec: '2,800 sq.ft · Weekend home',
    note: 'Load-bearing brick, deep verandahs, and rainwater capture, designed to sit quietly inside an existing orchard.',
    year: '2025',
  },
  {
    id: 'avadi-interior-study',
    title: 'Heritage-Modern Interior',
    location: 'Avadi, Chennai',
    category: 'Interiors',
    status: 'Concept Study',
    spec: '3BHK · Full interior',
    note: 'Athangudi tile, cane, and teak against clean white volumes, a palette study for a completed CB9 shell.',
    year: '2025',
  },
] as const

const ANATOMY = [
  { icon: FileText,  label: 'Client Brief' },
  { icon: Compass,   label: 'Site Analysis' },
  { icon: Lightbulb, label: 'Concept' },
  { icon: Ruler,     label: 'Plans' },
  { icon: Layers,    label: '3D Views' },
  { icon: Camera,    label: 'Construction Photos' },
  { icon: Camera,    label: 'Final Photography' },
  { icon: Boxes,     label: 'Materials' },
  { icon: Clock,     label: 'Timeline' },
  { icon: Wrench,    label: 'Challenges & Solutions' },
] as const

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <>
      <PageHero
        eyebrow="Projects"
        lines={[
          'Built One Story',
          <span key="l2" style={{ color: BRAND_ORANGE }}>at a Time.</span>,
        ]}
        intro="Completed homes and honest concept studies, never staged luxury. What you see here is real work and real thinking: site analysis, detailing, documentation, and the houses that came out of them."
        meta={['Residences', 'Concept Studies', 'Interiors', 'Chennai']}
        image="/heroes/projects.jpg"
        imageAlt="Two workers lifting a pan of mortar as the brick and plinth walls of a CB9 residence rise"
      />

      {/* Grid with filters */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          {/* Filter bar */}
          <motion.div
            className="flex flex-wrap gap-2 mb-9 pb-8 border-b"
            style={{ borderColor: L.border }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="rounded-xl text-[11px] font-semibold tracking-[0.16em] uppercase px-4 py-2 border transition-all duration-200"
                style={{
                  backgroundColor: active === f ? BRAND_ORANGE : 'transparent',
                  color:           active === f ? '#ffffff' : L.textMuted,
                  borderColor:     active === f ? BRAND_ORANGE : L.border,
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {filtered.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE, y: { duration: 0.3, ease: EASE, delay: 0 } }}
                  className="rounded-2xl group flex flex-col overflow-hidden border transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(23,23,23,0.35)]"
                  style={{ backgroundColor: L.cardBg, borderColor: L.border }}
                >
                  {/* Visual */}
                  <div className="relative h-44 overflow-hidden" style={{ backgroundColor: p.status === 'Completed' ? '#171717' : '#e8e3da' }}>
                    <span
                      className="absolute -right-2 -bottom-5 font-bold leading-none select-none pointer-events-none transition-transform duration-700 group-hover:-translate-y-1"
                      style={{ fontSize: '5.5rem', color: 'rgba(232,72,28,0.10)' }}
                    >
                      {p.year}
                    </span>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className="rounded-lg text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1"
                        style={{
                          backgroundColor: p.status === 'Completed' ? BRAND_ORANGE : 'rgba(23,23,23,0.85)',
                          color: '#ffffff',
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" style={{ color: BRAND_ORANGE }} />
                      <span
                        className="text-xs tracking-wide"
                        style={{ color: p.status === 'Completed' ? 'rgba(255,255,255,0.65)' : 'rgba(23,23,23,0.6)' }}
                      >
                        {p.location}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-bold text-lg leading-snug" style={{ color: L.text }}>{p.title}</h3>
                      <span className="text-[10px] font-semibold tracking-[0.14em] uppercase shrink-0" style={{ color: L.textFaint }}>
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs tracking-wide" style={{ color: L.textFaint }}>{p.spec}</p>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: L.textMuted }}>{p.note}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.p
            className="mt-12 text-sm text-center"
            style={{ color: L.textFaint }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Showing {filtered.length} of {PROJECTS.length}. Concept studies are marked honestly. We never present renders as built work.
          </motion.p>
        </div>
      </section>

      {/* Site to residence, drag to compare */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bgDeep }}>
        <div className="mx-auto max-w-[1600px] px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                Site to Residence
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-lg"
                style={{ color: D.text }}
                lines={[
                  'What the Plot Was.',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>What It Became.</span>,
                ]}
              />
            </div>
            <motion.p
              className="leading-relaxed text-base max-w-sm"
              style={{ color: D.textMuted }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Every CB9 residence begins as bare ground and a set of constraints. Drag the handle to
              see how the site was read, and what the finished architecture made of it.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <BeforeAfter
              before={{
                src: '/work/w2.jpg',
                alt: 'The plot at excavation and plinth-levelling stage before construction began',
                label: 'Site',
              }}
              after={{
                src: '/heroes/projects.jpg',
                alt: 'The completed residence on the same plot after handover',
                label: 'Residence',
              }}
              caption="Lakshmi Villa, Chennai. Corner plot, read for sun path and street privacy, then built around a central light well."
            />
          </motion.div>
        </div>
      </section>

      {/* Anatomy of a project */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                Documentation Standard
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-lg"
                style={{ color: D.text }}
                lines={[
                  'Every Project,',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>Fully Documented.</span>,
                ]}
              />
            </div>
            <p className="text-sm max-w-xs" style={{ color: D.textFaint }}>
              Ten records we keep for every home, from first brief to final photograph.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {ANATOMY.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                className="rounded-2xl border p-6 flex flex-col gap-4"
                style={{ backgroundColor: D.cardBg, borderColor: D.border }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 5) * 0.07, ease: EASE }}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4" style={{ color: BRAND_ORANGE }} />
                  <span className="text-[10px] font-bold tabular-nums" style={{ color: D.textFaint }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="font-semibold text-sm leading-snug" style={{ color: D.text }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        lines={[
          'Your Site Could Be',
          <span key="l2" style={{ color: BRAND_ORANGE }}>the Next Story.</span>,
        ]}
        body="Walk us through your plot and your brief, we'll show you how we'd think about it before you commit to anything."
      />
    </>
  )
}
