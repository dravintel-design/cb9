'use client'

import { motion } from 'framer-motion'
import {
  Grid3x3, Mountain, TreePine, Wrench, Boxes, AppWindow,
  DoorOpen, Paintbrush, Lightbulb, Droplets, Zap, Wind,
} from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const MATERIALS = [
  { icon: Grid3x3,   name: 'Tiles',        note: 'Vitrified for wear, anti-skid for wet areas, Athangudi where character matters. Batch numbers logged at laying.' },
  { icon: Mountain,  name: 'Stone',        note: 'Granite and Kota chosen slab by slab — sealed, edge-finished, and photographed before fixing.' },
  { icon: TreePine,  name: 'Wood',         note: 'Seasoned teak and engineered alternatives, moisture-checked before joinery begins.' },
  { icon: Wrench,    name: 'Steel',        note: 'Fe550D rebar from certified mills. Test certificates filed against every delivery.' },
  { icon: Boxes,     name: 'AAC Blocks',   note: 'Lighter walls, better insulation, straighter lines — laid with thin-bed adhesive, not guesswork mortar.' },
  { icon: AppWindow, name: 'Windows',      note: 'UPVC and aluminium systems specified for Chennai sun and monsoon — sealed, not just fitted.' },
  { icon: DoorOpen,  name: 'Doors',        note: 'Solid frames, honest cores, and hardware that still closes cleanly a decade in.' },
  { icon: Paintbrush, name: 'Paint',       note: 'Low-VOC interior systems and weather-grade exteriors, applied over properly cured surfaces.' },
  { icon: Lightbulb, name: 'Lighting',     note: 'Layered light — task, ambient, accent — planned on the drawing, not improvised on site.' },
  { icon: Droplets,  name: 'Sanitaryware', note: 'Fittings pressure-tested on installation. Every valve location recorded in your handover video.' },
  { icon: Zap,       name: 'Electrical',   note: 'FRLS wiring, ISI-marked switchgear, and circuit maps that match the as-built drawings.' },
  { icon: Wind,      name: 'HVAC',         note: 'Ventilation designed before air-conditioning — cross-breeze first, tonnage second.' },
] as const

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Materials Library"
        lines={[
          'Materials That',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Age Beautifully.</span>,
        ]}
        intro="Twelve categories, one standard: everything specified in a CB9 home is chosen for how it performs in year ten, documented at delivery, and logged in your project file."
        meta={['Specified by the Studio', 'Certified Sources', 'Logged per Project']}
        image="/heroes/materials.svg"
        imageAlt="Material sample board with twelve swatches showing brick coursing, stone, wood grain, steel section, and tile hatch patterns"
      />

      {/* Curation philosophy */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              How We Choose
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-md"
              style={{ color: L.text }}
              lines={[
                'Performance First.',
                <span key="l2" style={{ color: BRAND_ORANGE }}>Provenance Always.</span>,
              ]}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6 justify-center">
            <motion.p
              className="leading-relaxed text-base lg:text-lg"
              style={{ color: L.textMuted }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              We do not maintain a brand list to earn dealer margins — we maintain a standard. Every
              material that enters a CB9 site arrives with its certificate, gets checked against the
              specification, and is photographed into the project record before it is used.
            </motion.p>
          </div>
        </div>

        {/* Library grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {MATERIALS.map(({ icon: Icon, name, note }, i) => (
              <motion.div
                key={name}
                className="rounded-2xl group border p-7 lg:p-8 flex flex-col gap-4 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(23,23,23,0.35)]"
                style={{ backgroundColor: L.cardBg, borderColor: L.border }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="rounded-xl w-11 h-11 flex items-center justify-center border transition-colors duration-300 group-hover:bg-[#E8481C] group-hover:border-[#E8481C]"
                    style={{ borderColor: `${BRAND_ORANGE}45`, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-bold tabular-nums" style={{ color: L.textFaint }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold text-lg" style={{ color: L.text }}>{name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: L.textMuted }}>{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation note */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-16 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
            The Material Record
          </p>
          <TextReveal
            as="h2"
            className="font-bold leading-tight text-display-md"
            style={{ color: D.text }}
            lines={[
              'Every Delivery Certified.',
              <span key="l2" style={{ color: BRAND_ORANGE }}>Every Batch Logged.</span>,
            ]}
          />
          <motion.p
            className="mt-8 text-base lg:text-lg leading-relaxed"
            style={{ color: D.textMuted }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Your project file lists what went into your home — brand, batch, certificate, and the
            date it was used. Ten years from now, when you renovate or repair, you will know exactly
            what you are working with.
          </motion.p>
        </div>
      </section>

      <PageCTA
        lines={[
          'See the Palettes',
          <span key="l2" style={{ color: BRAND_ORANGE }}>in Person.</span>,
        ]}
        body="Visit the studio to handle the samples — stone, wood, and tile read differently in your hands than on a screen."
        ctaLabel="Visit the Studio"
      />
    </>
  )
}
