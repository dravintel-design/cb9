'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, FileText, Compass, Ruler, Layers, Camera, Clock, Wrench, Boxes, Lightbulb } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'
import BeforeAfter from '@/components/ui/BeforeAfter'
import PreviewNote from '@/components/ui/PreviewNote'
import { FILTERS, PROJECTS, projectHref, statusLabel, type Filter } from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_LIVE } from '@/lib/site'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

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
        intro="Completed homes and clearly labelled concept studies. See our selected homes and how we approach design and construction."
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
                aria-pressed={active === f}
                className="rounded-xl text-xs font-semibold tracking-[0.16em] uppercase px-4 py-2 border transition-all duration-200"
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

          <PreviewNote className="mb-8">
            Project names, details and photographs are temporary. The final projects will replace them once supplied.
          </PreviewNote>

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
                  className="rounded-2xl group relative flex flex-col overflow-hidden border transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(23,23,23,0.35)] focus-within:ring-2 focus-within:ring-[#E8481C]"
                  style={{ backgroundColor: L.cardBg, borderColor: L.border }}
                >
                  {/* Visual: the project photograph, or a labelled slot until it is supplied */}
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: p.status === 'Completed' ? '#171717' : '#e8e3da' }}>
                    {p.cover ? (
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <span
                          className="absolute -right-2 -bottom-5 font-bold leading-none select-none pointer-events-none"
                          style={{ fontSize: '5.5rem', color: 'rgba(232,72,28,0.10)' }}
                          aria-hidden="true"
                        >
                          {p.year}
                        </span>
                        {!SITE_LIVE && (
                          <span
                            className="absolute inset-0 flex items-center justify-center text-xs font-semibold tracking-wide"
                            style={{ color: p.status === 'Completed' ? 'rgba(255,255,255,0.7)' : 'rgba(23,23,23,0.65)' }}
                          >
                            {p.status === 'Completed' ? 'Project photograph to be added' : 'Concept image to be added'}
                          </span>
                        )}
                      </>
                    )}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span
                        className="rounded-lg text-xs font-bold tracking-[0.14em] uppercase px-2.5 py-1"
                        style={{
                          backgroundColor: p.status === 'Completed' ? BRAND_ORANGE : 'rgba(23,23,23,0.88)',
                          color: '#ffffff',
                        }}
                      >
                        {statusLabel(p)}
                      </span>
                      {p.cover && p.cover.kind !== 'photo' && (
                        <span className="rounded-lg text-xs font-bold tracking-[0.14em] uppercase px-2.5 py-1" style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#171717' }}>
                          {p.cover.kind === 'concept' ? 'Concept Image' : 'Example Image'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-bold text-lg leading-snug" style={{ color: L.text }}>
                        {/* Stretched link: the whole card opens the project */}
                        <Link href={projectHref(p.id)} className="outline-none after:absolute after:inset-0 after:content-['']">
                          {p.title}
                        </Link>
                      </h3>
                      <span className="text-xs font-semibold tracking-[0.12em] uppercase shrink-0" style={{ color: L.textFaint }}>
                        {p.category}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs tracking-wide" style={{ color: L.textFaint }}>
                      <MapPin className="w-3 h-3 shrink-0" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                      {p.location} · {p.spec}
                    </p>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: L.textMuted }}>{p.note}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase mt-1" style={{ color: BRAND_ORANGE }} aria-hidden="true">
                      View Project <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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
            Showing {filtered.length} of {PROJECTS.length}. Unbuilt concept studies are labelled on every card and project page.
          </motion.p>
        </div>
      </section>

      {/* Construction progress, drag to compare */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bgDeep }}>
        <div className="mx-auto max-w-[1600px] px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                Construction Progress
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-lg"
                style={{ color: D.text }}
                lines={[
                  'From Ground',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>to Structure.</span>,
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
              Drag the handle to compare two stages of construction on a CB9 site, from levelling at
              plinth to the walls rising.
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
                alt: 'Excavation and levelling at plinth stage on a CB9 site',
                label: 'Plinth Stage',
              }}
              after={{
                src: '/heroes/projects.jpg',
                alt: 'Brick walls rising above the plinth on a CB9 site',
                label: 'Walls Rising',
              }}
            />
            <PreviewNote tone="dark" className="mt-5">
              These two photographs are not confirmed as the same home. Replace them with two stages of one home, or
              add a finished photograph of that home to make this a true before and after.
            </PreviewNote>
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
                  <span className="text-xs font-bold tabular-nums" style={{ color: D.textFaint }}>
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
