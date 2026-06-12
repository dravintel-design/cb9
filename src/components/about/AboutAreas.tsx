'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

const AREAS = [
  { name: 'Avadi',           tag: 'Primary',   note: 'Highest project density' },
  { name: 'Thiruvallur',     tag: 'Primary',   note: 'Full service coverage'   },
  { name: 'Thirunindravur',  tag: 'Primary',   note: 'Active build zone'       },
  { name: 'Pattibiram',      tag: 'Primary',   note: 'Multiple completed homes'},
  { name: 'Veppampattu',     tag: 'Secondary', note: 'Select projects'         },
  { name: 'Perumal Pattu',   tag: 'Secondary', note: 'Select projects'         },
] as const

export default function AboutAreas() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                Where We Build
              </p>
              <h2
                className="font-bold leading-tight"
                style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                North &amp; West
                <br />
                <span style={{ color: BRAND_ORANGE }}>Chennai.</span>
              </h2>
            </div>

            <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
              CB9 operates in the Tier-2 and peri-urban catchments of Chennai — Avadi, Thiruvallur, Thirunindravur, and Pattibiram as primary zones, with select projects in neighbouring areas. We know these localities, their soil conditions, their municipal approval processes, and their material supply chains.
            </p>
            <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
              If your plot is outside this geography, contact us with the location — we evaluate on a project-by-project basis.
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
                style={{ backgroundColor: BRAND_ORANGE }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Check Your Area
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Area list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col border"
            style={{ borderColor: T.border }}
          >
            {AREAS.map((area, i) => (
              <div
                key={area.name}
                className="flex items-center justify-between gap-4 px-6 py-5 border-b last:border-0 group"
                style={{ borderColor: T.border }}
              >
                <div className="flex items-center gap-4">
                  <MapPin
                    className="w-4 h-4 shrink-0"
                    style={{ color: area.tag === 'Primary' ? BRAND_ORANGE : T.textFaint }}
                  />
                  <div>
                    <p className="font-semibold text-base" style={{ color: T.text }}>{area.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: T.textFaint }}>{area.note}</p>
                  </div>
                </div>
                <span
                  className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 border"
                  style={{
                    color:            area.tag === 'Primary' ? BRAND_ORANGE : T.textFaint,
                    borderColor:      area.tag === 'Primary' ? `${BRAND_ORANGE}35` : T.border,
                    backgroundColor:  area.tag === 'Primary' ? `${BRAND_ORANGE}08` : 'transparent',
                  }}
                >
                  {area.tag}
                </span>
              </div>
            ))}

            {/* Footer note */}
            <div
              className="px-6 py-5 border-t"
              style={{ borderColor: T.border, backgroundColor: T.bgDeep }}
            >
              <p className="text-xs leading-relaxed" style={{ color: T.textFaint }}>
                CMDA and DTCP permit processes managed in-house for all primary zones. Approval timelines and costs included in your scope document.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
