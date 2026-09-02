'use client'

import { motion } from 'framer-motion'
import {
  Mountain, TreePine, Wrench, AppWindow,
  Lightbulb, DoorOpen, Droplets, Paintbrush,
} from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const MATERIALS = [
  { icon: Mountain,   name: 'Stone',        note: 'Granite, Kota and limestone selected slab by slab for grain and tone: sealed, edge-finished and laid to a drawing, not to a pattern book.' },
  { icon: TreePine,   name: 'Wood',         note: 'Seasoned teak and engineered timber for joinery, screens and ceilings, moisture-checked before a single piece is cut.' },
  { icon: Wrench,     name: 'Metal',        note: 'Steel, brass and blackened iron for railings, screens and slender structural moments where the detail should read as intentional.' },
  { icon: AppWindow,  name: 'Glass',        note: 'Glazing specified for Chennai light and heat: sightlines, spans and shading resolved with the elevation, not after it.' },
  { icon: Lightbulb,  name: 'Lighting',     note: 'Layered light, task, ambient and accent, planned on the reflected ceiling plan so fittings sit where the architecture wants them.' },
  { icon: DoorOpen,   name: 'Hardware',     note: 'Handles, hinges and closers chosen for how they feel in the hand and how they behave a decade in.' },
  { icon: Droplets,   name: 'Sanitaryware', note: 'Fixtures and fittings coordinated with the bathroom layout and pressure-tested on installation.' },
  { icon: Paintbrush, name: 'Finishes',     note: 'Plaster, paint, microtopping and textured surfaces, sampled on site under your own light before anything is approved.' },
] as const

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Materials & Craft"
        lines={[
          'Materials That',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Age Beautifully.</span>,
        ]}
        intro="Eight material families, one standard: everything specified in a CB9 residence is chosen for how it feels in the hand and how it looks in year ten, sampled with you, and logged in your project file."
        meta={['Curated by the Studio', 'Sampled On Site', 'Logged per Residence']}
        image="/heroes/materials.jpg"
        imageAlt="A mason setting a run of face tiles with a trowel, checking the line by eye"
      />

      {/* Curation philosophy */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
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
              We do not keep a brand list to earn dealer margins, we keep a standard. Materials are
              chosen for the residence in front of us: sampled under your own light, checked against
              the specification on delivery, and photographed into the project record before use.
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
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
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
            Your project file lists what went into your home: brand, batch, certificate, and the
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
        body="Visit the studio to handle the samples: stone, wood, and tile read differently in your hands than on a screen."
        ctaLabel="Visit the Studio"
      />
    </>
  )
}
