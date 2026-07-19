'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Layers } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'

const FILTERS = ['All', 'New Build', 'Renovation', 'G+1', 'G+2', 'Commercial'] as const
type Filter = (typeof FILTERS)[number]

const PROJECTS = [
  {
    id: 'avadi-g2-2024',
    title: 'Avadi G+2 Residence',
    location: 'Avadi, Chennai',
    type: 'New Build',
    floors: 'G+2',
    area: '3,800 sq.ft',
    duration: '13 months',
    year: '2024',
    tags: ['New Build', 'G+2'],
    accent: BRAND_ORANGE,
    highlight: 'IS 456 cube tested at all 9 pours. Zero structural deviations.',
  },
  {
    id: 'thiruvallur-g1-2024',
    title: 'Thiruvallur G+1 Home',
    location: 'Thiruvallur',
    type: 'New Build',
    floors: 'G+1',
    area: '2,200 sq.ft',
    duration: '10 months',
    year: '2024',
    tags: ['New Build', 'G+1'],
    accent: BRAND_ORANGE,
    highlight: 'DTCP-approved drawings. Owner moved in under budget.',
  },
  {
    id: 'pattibiram-renovation-2023',
    title: 'Pattibiram Full Renovation',
    location: 'Pattibiram, Chennai',
    type: 'Renovation',
    floors: 'G+1',
    area: '1,600 sq.ft',
    duration: '5 months',
    year: '2023',
    tags: ['Renovation', 'G+1'],
    accent: BRAND_ORANGE,
    highlight: 'Existing structure retained. Full MEP reroute by our team.',
  },
  {
    id: 'chennai-north-g2-2023',
    title: 'Chennai North Villa',
    location: 'Ambattur, Chennai',
    type: 'New Build',
    floors: 'G+2',
    area: '4,400 sq.ft',
    duration: '14 months',
    year: '2023',
    tags: ['New Build', 'G+2'],
    accent: BRAND_ORANGE,
    highlight: 'Open-cost estimate — final invoice matched signed amount.',
  },
  {
    id: 'avadi-commercial-2023',
    title: 'Avadi Mixed-Use Ground Floor',
    location: 'Avadi, Chennai',
    type: 'Commercial',
    floors: 'G',
    area: '2,800 sq.ft',
    duration: '7 months',
    year: '2023',
    tags: ['Commercial'],
    accent: BRAND_ORANGE,
    highlight: 'Commercial occupancy certificate obtained 2 weeks ahead of schedule.',
  },
  {
    id: 'thiruvallur-g1-2022',
    title: 'Thiruvallur Family Home',
    location: 'Thiruvallur',
    type: 'New Build',
    floors: 'G+1',
    area: '2,600 sq.ft',
    duration: '11 months',
    year: '2022',
    tags: ['New Build', 'G+1'],
    accent: BRAND_ORANGE,
    highlight: 'Stage-wise payment. No cost escalation from signed estimate.',
  },
  {
    id: 'pattibiram-g2-2022',
    title: 'Pattibiram Corner Plot G+2',
    location: 'Pattibiram, Chennai',
    type: 'New Build',
    floors: 'G+2',
    area: '3,200 sq.ft',
    duration: '12 months',
    year: '2022',
    tags: ['New Build', 'G+2'],
    accent: BRAND_ORANGE,
    highlight: 'Corner plot — custom foundation design for irregular boundary.',
  },
  {
    id: 'ambattur-renovation-2022',
    title: 'Ambattur Gut Renovation',
    location: 'Ambattur, Chennai',
    type: 'Renovation',
    floors: 'G',
    area: '1,200 sq.ft',
    duration: '4 months',
    year: '2022',
    tags: ['Renovation'],
    accent: BRAND_ORANGE,
    highlight: 'Occupied during Phase 1. Phased timeline delivered on schedule.',
  },
] as const

type Project = (typeof PROJECTS)[number]

function ProjectCard({ p, index, theme }: { p: Project; index: number; theme: 'dark' | 'light' }) {
  const T      = theme === 'dark' ? DARK_SECTION : LIGHT_SECTION

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-2xl group relative flex flex-col border overflow-hidden"
      style={{ backgroundColor: T.cardBg, borderColor: T.border }}
    >
      {/* Visual placeholder — orange triangle corner + service number */}
      <div
        className="rounded-2xl relative h-48 flex items-end overflow-hidden"
        style={{ backgroundColor: theme === 'dark' ? '#141414' : '#e8e3da' }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 left-0 w-10 h-10"
          style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 100%)` }}
        />
        {/* Ghost year watermark */}
        <span
          className="absolute -right-2 -bottom-4 font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            color: theme === 'dark' ? 'rgba(232,72,28,0.07)' : 'rgba(232,72,28,0.09)',
          }}
        >
          {p.year}
        </span>
        {/* Floor tag */}
        <div className="absolute top-3 right-3">
          <span
            className="rounded-lg text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 border"
            style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}40`, backgroundColor: `${BRAND_ORANGE}10` }}
          >
            {p.floors}
          </span>
        </div>
        {/* Area */}
        <div className="relative p-5">
          <p
            className="font-bold leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: BRAND_ORANGE }}
          >
            {p.area}
          </p>
          <p className="text-xs mt-1 font-semibold tracking-[0.14em] uppercase" style={{ color: T.textFaint }}>
            built area
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <h3
            className="font-bold text-lg leading-snug mb-2 group-hover:opacity-80 transition-opacity"
            style={{ color: T.text }}
          >
            {p.title}
          </h3>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: BRAND_ORANGE }} />
            <span className="text-xs tracking-wide" style={{ color: T.textFaint }}>{p.location}</span>
          </div>
        </div>

        {/* Highlight stat */}
        <p
          className="text-sm leading-relaxed border-l-2 pl-3 italic"
          style={{ color: T.textMuted, borderColor: `${BRAND_ORANGE}50` }}
        >
          {p.highlight}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center justify-between pt-4 mt-auto border-t text-xs"
          style={{ borderColor: T.border }}
        >
          <div className="flex items-center gap-1.5">
            <Layers className="w-3 h-3" style={{ color: T.textFaint }} />
            <span style={{ color: T.textFaint }}>{p.type}</span>
          </div>
          <span style={{ color: T.textFaint }}>{p.duration}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkGrid() {
  const [active, setActive] = useState<Filter>('All')

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(active as never))

  // Alternate: even index projects use dark card, odd use light — within the LIGHT section bg
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: LIGHT_SECTION.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
            Built by CB9
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-bold leading-tight"
              style={{ color: LIGHT_SECTION.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Project
              <br />
              <span style={{ color: BRAND_ORANGE }}>Showcase.</span>
            </h2>
            <p className="text-base max-w-md" style={{ color: LIGHT_SECTION.textMuted }}>
              Real homes, real clients, real numbers. Every project listed here was completed entirely by our own team — no subcontractors at any stage.
            </p>
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12 pb-8 border-b"
          style={{ borderColor: LIGHT_SECTION.border }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200"
              style={{
                backgroundColor: active === f ? BRAND_ORANGE : 'transparent',
                color:           active === f ? '#ffffff' : LIGHT_SECTION.textMuted,
                borderColor:     active === f ? BRAND_ORANGE : LIGHT_SECTION.border,
              }}
              onMouseEnter={e => {
                if (active !== f) {
                  e.currentTarget.style.color = LIGHT_SECTION.text
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)'
                }
              }}
              onMouseLeave={e => {
                if (active !== f) {
                  e.currentTarget.style.color = LIGHT_SECTION.textMuted
                  e.currentTarget.style.borderColor = LIGHT_SECTION.border
                }
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                theme={i % 2 === 0 ? 'light' : 'dark'}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-sm text-center"
          style={{ color: LIGHT_SECTION.textFaint }}
        >
          Showing {filtered.length} of {PROJECTS.length} completed projects
        </motion.p>
      </div>
    </section>
  )
}
