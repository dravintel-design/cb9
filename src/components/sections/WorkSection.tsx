'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'

const T = DARK_SECTION

const EASE = [0.22, 1, 0.36, 1] as const

const PROJECTS = [
  {
    id: 'p1',
    label: 'Residential · Avadi',
    title: 'Lakshmi Villa — 3BHK',
    spec: '2,200 sq.ft · Ground + 1 Floor · ₹2,600/sq.ft',
    tags: ['IS-Tested', 'Video Handover', 'Zero Subcontractors'],
  },
  {
    id: 'p2',
    label: 'Residential · Thiruvallur',
    title: 'Murugan Nagar Duplex',
    spec: '1,850 sq.ft · Duplex · Open-Cost Contract',
    tags: ['Concrete Cube Tested', 'Open-Cost', 'On-Time Delivery'],
  },
  {
    id: 'p3',
    label: 'Residential · Pattibiram',
    title: 'Priya Enclave — G+2',
    spec: '4,100 sq.ft · 3 Floors · Stage-Wise Payments',
    tags: ['Structural Drawings', 'All Permits Handled', 'Full Handover Pack'],
  },
] as const

export default function WorkSection() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: BRAND_ORANGE }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Completed Projects
            </motion.p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: T.text }}
              lines={[
                'Homes We’ve Built.',
                <span key="l2" style={{ color: BRAND_ORANGE }}>Stories We&apos;re Proud Of.</span>,
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
          >
            <Link
              href="/work"
              className="group/link inline-flex items-center gap-2 text-sm font-semibold tracking-wide border px-6 py-3 transition-all"
              style={{ borderColor: T.border, color: T.textMuted }}
              onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border }}
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map(({ id, label, title, spec, tags }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE, y: { duration: 0.35, ease: EASE, delay: 0 } }}
              className="group flex flex-col overflow-hidden cursor-pointer border border-transparent transition-[border-color,box-shadow] duration-500 hover:border-white/10 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]"
              style={{ backgroundColor: T.cardBg }}
            >
              {/* Image placeholder with hover zoom */}
              <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ background: `radial-gradient(120% 100% at 30% 100%, ${BRAND_ORANGE}18 0%, transparent 55%), #1a1a1a` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}25, transparent)` }}
                />
                {/* Ghost project number */}
                <span
                  className="absolute -right-1 -bottom-5 font-bold leading-none select-none pointer-events-none transition-transform duration-700 group-hover:-translate-y-2"
                  style={{ fontSize: '6rem', color: 'rgba(232,72,28,0.08)' }}
                >
                  0{i + 1}
                </span>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 bg-black/60" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {label}
                  </span>
                </div>
                {/* Hover arrow */}
                <div
                  className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4 flex-1" style={{ backgroundColor: T.cardBg }}>
                <h3 className="font-bold text-lg" style={{ color: T.text }}>{title}</h3>
                <p className="text-xs tracking-wide" style={{ color: T.textFaint }}>{spec}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wide font-medium px-2.5 py-1 border"
                      style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}30` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
