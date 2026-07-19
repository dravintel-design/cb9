'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'

const SERVICES = [
  {
    id: 'residential-design',
    number: '01',
    category: 'Residential Design',
    title: 'Custom Architectural Designs Built Around Your Life.',
    body: 'We design homes that balance how you live with how the structure performs. Every floor plan is drawn by our in-house civil engineers — not outsourced — and verified against structural load requirements before a permit is filed.',
    deliverables: [
      'Custom floor plans tailored to your plot and lifestyle',
      'Modern architectural elevations and 3D layouts',
      'Structural drawings compliant with IS standards',
      'CMDA / DTCP submission-ready drawing set',
      'Design revisions included — no extra charge',
    ],
    tiles: [
      { label: 'Floor Plans',          sub: 'Custom to Your Plot'       },
      { label: 'Elevation Design',     sub: 'Modern Architecture'       },
      { label: '3D Layout',            sub: 'Room-by-Room Visualised'   },
      { label: 'Structural Drawings',  sub: 'IS-Standard Compliant'     },
    ],
    theme: 'dark',
  },
  {
    id: 'new-construction',
    number: '02',
    category: 'New Construction',
    title: 'Complete Turnkey Construction — Foundation to Handover.',
    body: 'From the first soil test to the final video walkthrough, we manage every phase of your new home build. One contract, one team, zero subcontractors. You know who is on your site every day.',
    deliverables: [
      'Soil test, foundation, structure, MEP, and finishing',
      'IS 456 concrete cube tested at every pour stage',
      'All materials as specified in signed estimate',
      'Stage-wise payment schedule — locked before work begins',
      'Video-documented handover with warranty pack',
    ],
    tiles: [
      { label: 'Foundation Works',   sub: 'Soil Tested to IS 1888'  },
      { label: 'Slab & Structure',   sub: 'Cube Tested Every Pour'  },
      { label: 'MEP Finishing',      sub: 'Zero Subcontractors'     },
      { label: 'Final Handover',     sub: 'Keys + Video + Warranty' },
    ],
    theme: 'light',
  },
  {
    id: 'project-management',
    number: '03',
    category: 'Project Management',
    title: 'End-to-End Oversight. No Surprises at Handover.',
    body: 'Sathish personally oversees every project milestone. Weekly site reports, photographic stage documentation, and proactive cost tracking mean you are never the last to know about a decision affecting your home.',
    deliverables: [
      'Dedicated site engineer present daily on your project',
      'Weekly progress reports with photos',
      'Budget tracking against signed estimate — every stage',
      'Quality checks at foundation, slab, MEP, and finishing',
      'Escalation directly to founder — no middleman',
    ],
    tiles: [
      { label: 'Site Engineer',      sub: 'Daily On-Site Presence'   },
      { label: 'Weekly Reports',     sub: 'Photo + Progress'         },
      { label: 'Budget Tracking',    sub: 'vs Signed Estimate'       },
      { label: 'Quality Checks',     sub: 'Every Stage Documented'   },
    ],
    theme: 'dark',
  },
  {
    id: 'structural-engineering',
    number: '04',
    category: 'Structural Engineering',
    title: 'IS-Standard Structural Analysis for Safe, Durable Homes.',
    body: 'Our structural engineers run full load calculations, design the reinforcement layout, and verify every concrete pour against IS 456. You receive the test reports at each stage — not just at the end.',
    deliverables: [
      'Soil bearing capacity test to IS 1888',
      'Full structural load calculations by qualified engineer',
      'Reinforcement bar layout design and site verification',
      'Concrete cube tests at every pour — IS 456 standard',
      'Stage-wise structural test reports handed to client',
    ],
    tiles: [
      { label: 'Soil Bearing Test',    sub: 'IS 1888 Certified'        },
      { label: 'Load Calculations',    sub: 'Licensed Structural Eng.'  },
      { label: 'Rebar Layout',         sub: 'Design + Site Verified'   },
      { label: 'Concrete Cube Test',   sub: 'IS 456 — Every Pour'      },
    ],
    theme: 'light',
  },
  {
    id: 'renovation',
    number: '05',
    category: 'Renovation & Remodeling',
    title: 'Transform Your Existing Home Without the Chaos.',
    body: 'Whether it is an aging structure, a change in layout, or a full interior upgrade — we assess the existing construction first, then plan a renovation that does not compromise the structure while improving how the space works for you.',
    deliverables: [
      'Existing structure assessment before any work begins',
      'Space optimisation plan with revised floor layout',
      'Modern amenities and finishes as per your specification',
      'MEP rerouting handled entirely by our own team',
      'Minimal disruption timeline — phased if occupied',
    ],
    tiles: [
      { label: 'Structure Assessment', sub: 'Before Work Starts'     },
      { label: 'Space Optimisation',   sub: 'Revised Floor Plan'     },
      { label: 'Modern Finishes',      sub: 'Per Your Specification' },
      { label: 'MEP Rerouting',        sub: 'In-House Only'          },
    ],
    theme: 'dark',
  },
  {
    id: 'consultation',
    number: '06',
    category: 'Consultation Services',
    title: 'Expert Guidance Before You Sign Anything.',
    body: 'First-generation homeowners often enter a build without knowing the right questions to ask. Sathish personally takes every initial consultation — reviewing your plot, estimating realistic costs, flagging risks, and explaining what IS-standard construction actually means for your family.',
    deliverables: [
      'Site visit and honest scope assessment — no charge',
      'Realistic cost estimation with material breakdown',
      'Material selection guidance — quality vs budget options',
      'Permit and approval process explained upfront',
      'No obligation to proceed after consultation',
    ],
    tiles: [
      { label: 'Free Site Visit',      sub: 'No Charge, No Pressure'  },
      { label: 'Cost Estimation',      sub: 'Itemised Breakdown'       },
      { label: 'Material Guidance',    sub: 'Quality vs Budget Options'},
      { label: 'Permit Advisory',      sub: 'CMDA / DTCP Explained'   },
    ],
    theme: 'light',
  },
] as const

function Panel({ s, index }: { s: (typeof SERVICES)[number]; index: number }) {
  const T      = s.theme === 'dark' ? DARK_SECTION : LIGHT_SECTION

  const tileBg = s.theme === 'dark'
    ? (index % 2 === 0 ? '#161616' : '#1c1c1c')
    : (index % 2 === 0 ? '#ede9e2' : '#e8e3db')

  return (
    <section
      id={s.id}
      className="border-b"
      style={{ backgroundColor: T.bg, borderColor: T.border }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">

          {/* LEFT — text */}
          <motion.div
            className="flex flex-col gap-7"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-4">
              <span
                className="font-bold text-6xl leading-none tabular-nums select-none"
                style={{ color: s.theme === 'dark' ? `${BRAND_ORANGE}18` : `${BRAND_ORANGE}25` }}
              >
                {s.number}
              </span>
              <span
                className="rounded-lg text-[10px] font-semibold tracking-[0.22em] uppercase border px-3 py-1.5"
                style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35` }}
              >
                {s.category}
              </span>
            </div>

            <h2
              className="font-bold leading-tight"
              style={{ color: T.text, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              {s.title}
            </h2>

            <p className="leading-relaxed text-base" style={{ color: T.textMuted }}>{s.body}</p>

            <ul className="flex flex-col gap-3">
              {s.deliverables.map(d => (
                <li key={d} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRAND_ORANGE }} />
                  <span className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{d}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="rounded-2xl inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
                style={{ backgroundColor: BRAND_ORANGE }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {index === 5 ? 'Book Free Consultation' : "Let's Connect"}
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — 2×2 visual grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.4, 0, 0.2, 1] }}
          >
            {s.tiles.map(tile => (
              <div
                key={tile.label}
                className="rounded-2xl relative aspect-[4/3] overflow-hidden border group"
                style={{ backgroundColor: tileBg, borderColor: T.border }}
              >
                <span
                  className="absolute -bottom-3 -right-2 font-bold leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: `${BRAND_ORANGE}09` }}
                >
                  {s.number}
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE}15, transparent)` }}
                />
                <div
                  className="absolute top-0 left-0 w-7 h-7"
                  style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 100%)` }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 border-t"
                  style={{ borderColor: T.border }}
                >
                  <p className="text-xs font-semibold leading-tight" style={{ color: T.text }}>{tile.label}</p>
                  <p className="text-[10px] tracking-wide mt-0.5" style={{ color: T.textFaint }}>{tile.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ServicePanels() {
  return (
    <div>
      {SERVICES.map((s, i) => (
        <Panel key={s.id} s={s} index={i} />
      ))}
    </div>
  )
}
