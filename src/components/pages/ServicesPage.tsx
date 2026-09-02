'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const SERVICES = [
  {
    num: '01',
    title: 'Bespoke Residential Design + Build',
    body: 'Our primary offering. One studio takes a family, a plot and a way of living and carries it through design, engineering and construction to a finished residence.',
    scope: ['Single accountability', 'Design through handover', 'Complete residence'],
  },
  {
    num: '02',
    title: 'Architecture',
    body: 'An individual architectural response to your site: massing, zoning, light and circulation, developed with our architect partners under CB9 coordination.',
    scope: ['Concept & massing', 'Plans, sections, elevations', '3D visualisation'],
  },
  {
    num: '03',
    title: 'Engineering',
    body: 'Soil testing, structural design and MEP coordination, developed alongside the architecture so the design and the structure resolve together.',
    scope: ['Soil & structural', 'MEP coordination', 'IS-standard testing'],
  },
  {
    num: '04',
    title: 'Interior Design',
    body: 'Interiors conceived with the architecture: light, storage, joinery and material palettes planned as one continuous idea, not applied afterwards.',
    scope: ['Space planning', 'Material palettes', 'Joinery detailing'],
  },
  {
    num: '05',
    title: 'Landscape',
    body: 'Courtyards, gardens and boundaries designed with the house, shade, drainage and planting that mature alongside the architecture.',
    scope: ['Courtyards & gardens', 'Hardscape detailing', 'Rainwater planning'],
  },
  {
    num: '06',
    title: 'Construction',
    body: 'Full build execution to the approved drawings, with every trade on site controlled through CB9 site management and documented at every stage.',
    scope: ['CB9 site management', 'Quality documentation', 'Stage-wise transparency'],
  },
  {
    num: '07',
    title: 'Project Management',
    body: 'One accountable team running programme, procurement, cost and quality, with photographic reporting so you always know where your residence stands.',
    scope: ['Programme control', 'Procurement', 'Weekly reporting'],
  },
] as const

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={[
          'One Bespoke Service.',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Every Discipline.</span>,
        ]}
        intro="Corner Brick 9 exists to deliver complete bespoke residences. Architecture, engineering, interiors, landscape and construction are the disciplines we bring to that one outcome, coordinated by a single accountable team."
        meta={['Design', 'Engineering', 'Interiors', 'Landscape', 'Build']}
        image="/heroes/services.jpg"
        imageAlt="Workers excavating and levelling at plinth height beside a finished plinth beam and rebar cages"
      />

      {/* Editorial service rows */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          {SERVICES.map(({ num, title, body, scope }, i) => (
            <motion.div
              key={num}
              className="group rounded-2xl grid grid-cols-12 gap-6 py-10 lg:py-12 border-b border-[rgba(0,0,0,0.08)] items-start -mx-4 px-4 lg:-mx-8 lg:px-8 transition-colors duration-500 hover:bg-[#171717] hover:border-transparent cursor-default"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="col-span-2 lg:col-span-1">
                <span className="text-sm font-bold tabular-nums" style={{ color: BRAND_ORANGE }}>{num}</span>
              </div>
              <div className="col-span-10 lg:col-span-4">
                <h2
                  className="font-bold leading-tight transition-colors duration-500 text-[#171717] group-hover:text-white"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                >
                  {title}
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-6">
                <p className="text-sm lg:text-base leading-relaxed transition-colors duration-500 text-[rgba(23,23,23,0.58)] group-hover:text-[rgba(255,255,255,0.6)]">
                  {body}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-3 flex lg:flex-col flex-wrap gap-2">
                {scope.map(s => (
                  <span
                    key={s}
                    className="rounded-lg text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 border self-start transition-colors duration-500 text-[#E8481C] border-[rgba(232,72,28,0.19)] bg-[rgba(232,72,28,0.02)] group-hover:border-[rgba(232,72,28,0.55)] group-hover:bg-[rgba(232,72,28,0.14)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How to engage */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              How to Engage
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-md mb-6"
              style={{ color: D.text }}
              lines={[
                'Whole Journey,',
                <span key="l2" style={{ color: BRAND_ORANGE }}>or One Stage.</span>,
              ]}
            />
            <motion.p
              className="text-base leading-relaxed"
              style={{ color: D.textMuted }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              Most families engage us end to end, discovery through handover, because that is
              where a bespoke residence works best. If you are further along and already hold an
              approved design, we can take it from there.
            </motion.p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Complete Residence',      note: 'Design, engineering, interiors, landscape and build, one contract, one accountable team.' },
              { label: 'Design & Engineering',    note: 'The full design and engineering package, developed to construction documentation.' },
              { label: 'Build to Approved Design', note: 'You already have drawings you believe in; we engineer, manage and build them.' },
            ].map(({ label, note }, i) => (
              <motion.div
                key={label}
                className="rounded-2xl border p-6 lg:p-8 flex items-start justify-between gap-6"
                style={{ backgroundColor: D.cardBg, borderColor: D.border }}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <div>
                  <h3 className="font-bold text-lg mb-1.5" style={{ color: D.text }}>{label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>{note}</p>
                </div>
                <Link
                  href="/contact"
                  aria-label={`Enquire about ${label}`}
                  className="rounded-xl w-10 h-10 shrink-0 flex items-center justify-center border transition-all duration-300 hover:bg-[#E8481C] hover:border-[#E8481C] group/arrow"
                  style={{ borderColor: D.border }}
                >
                  <ArrowUpRight className="w-4 h-4 transition-colors group-hover/arrow:text-white" style={{ color: BRAND_ORANGE }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        lines={[
          'Tell Us What',
          <span key="l2" style={{ color: BRAND_ORANGE }}>You Need.</span>,
        ]}
        body="Describe your project in a few lines, we'll reply with how we'd approach it and what engaging us would look like."
      />
    </>
  )
}
