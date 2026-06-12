'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

const FAQS = [
  {
    q: 'What does "turnkey construction" actually mean?',
    a: 'It means we handle everything — from ground survey, structural drawings, and permits, all the way through to painting, fittings, and final handover. You hand us the land and budget; we hand you a fully finished, move-in ready home. One contract, one point of contact.',
  },
  {
    q: 'Do you use subcontractors on any part of the build?',
    a: 'No. Every worker on your site — mason, bar bender, electrician, plumber, painter — is a direct Corner Brick 9 employee on payroll. Most builders in Chennai hand off 60–80% of the work to subcontractors you never meet. We do not.',
  },
  {
    q: 'What is included in the ₹2,600 per sq.ft rate?',
    a: 'The rate covers structure, MEP (electrical, plumbing, drainage), internal plastering, basic flooring, painting (primer + 2 coats), and standard sanitary and CP fittings. Premium finishes are quoted separately. Your itemised estimate will show every line item before you sign.',
  },
  {
    q: 'How long does a typical home build take?',
    a: 'A standard G+1 or G+2 residential build (2,000–4,500 sq.ft) typically takes 10 to 14 months from ground-breaking to handover. Timeline is locked in your contract along with the stage-wise payment schedule.',
  },
  {
    q: 'What is the stage-wise payment schedule?',
    a: 'Payments are broken into defined construction milestones — foundation, slab, roof, rough finishing, and final handover. The schedule is agreed and signed before we start. You never pay for a stage that has not been completed and documented.',
  },
  {
    q: 'What IS-standard tests do you conduct?',
    a: 'We conduct soil bearing capacity tests (IS 1888), concrete cube tests at every pour to IS 456, and electrical wiring checks to IS 732. Test reports are shared at each stage and compiled into a folder you receive at handover.',
  },
  {
    q: 'Do you handle government approvals and permits?',
    a: 'Yes — fully. We manage CMDA or DTCP plan approval, local body building licence, and any other permits required in Chennai, Avadi, Thiruvallur, or Pattibiram. Cost and timeline for approvals are included in your scope document.',
  },
  {
    q: 'What warranty do you provide after handover?',
    a: 'We provide a 1-year structural warranty covering foundation, slab, columns, and beams, and a 6-month warranty on finishing work. The warranty terms and escalation process are included in the warranty pack handed to you on completion day.',
  },
  {
    q: 'What areas do you build in?',
    a: 'Our primary service areas are Chennai, Avadi, Thiruvallur, and Pattibiram. We take on select projects in neighbouring districts — contact us with your location and we will confirm availability.',
  },
  {
    q: 'What do I need to bring to the first consultation?',
    a: 'Ideally: your site plan or plot document, a rough idea of your budget, and any reference images of homes you like. Sathish personally takes every initial consultation — no sales team. The site visit is included at no charge.',
  },
] as const

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="border-b last:border-0 transition-colors duration-200"
      style={{ borderColor: T.border, backgroundColor: open ? T.cardBg : 'transparent' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 px-6 py-6 text-left"
        aria-expanded={open}
      >
        <span
          className="font-semibold text-base leading-snug transition-colors duration-200"
          style={{ color: open ? T.text : T.textMuted }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center border mt-0.5 transition-all duration-300"
          style={{
            borderColor: open ? BRAND_ORANGE : T.border,
            color: open ? BRAND_ORANGE : T.textFaint,
          }}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-7 text-sm leading-relaxed max-w-3xl" style={{ color: T.textMuted }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
            Before You Sign Anything
          </p>
          <h2
            className="font-bold leading-tight"
            style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Frequently
            <br />
            Asked Questions.
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border"
          style={{ backgroundColor: T.cardBg, borderColor: T.border }}
        >
          {FAQS.map(({ q, a }, i) => (
            <Item
              key={q}
              q={q}
              a={a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-sm text-center"
          style={{ color: T.textFaint }}
        >
          Still have a question?{' '}
          <a
            href="/contact"
            className="underline underline-offset-4 transition-colors"
            style={{ color: BRAND_ORANGE }}
          >
            Ask Sathish directly.
          </a>
        </motion.p>
      </div>
    </section>
  )
}
