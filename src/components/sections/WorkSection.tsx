'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

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
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
              Completed Projects
            </p>
            <h2 className="font-bold leading-tight text-display-lg" style={{ color: T.text }}>
              Homes We&apos;ve Built.
              <br />
              <span style={{ color: BRAND_ORANGE }}>Stories We&apos;re Proud Of.</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide border px-6 py-3 transition-all"
              style={{ borderColor: T.border, color: T.textMuted }}
              onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border }}
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map(({ id, label, title, spec, tags }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden cursor-pointer"
              style={{ backgroundColor: T.cardBg }}
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}20, transparent)` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 bg-black/60" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {label}
                  </span>
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
