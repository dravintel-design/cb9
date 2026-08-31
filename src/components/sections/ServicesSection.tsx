'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, FlaskConical, DollarSign, Video, ArrowUpRight } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import TiltCard from '@/components/ui/TiltCard'
import TextReveal from '@/components/ui/TextReveal'
import CountUp from '@/components/ui/CountUp'

const T = LIGHT_SECTION

const DIFFERENTIATORS = [
  {
    icon: ShieldCheck,
    tag: 'Our #1 Differentiator',
    title: 'One Accountable Team',
    body: 'Architecture, engineering and construction answer to a single project team. Every trade on your site is controlled through CB9’s site management — you never chase a vendor we appointed.',
    stat: 'One',
    statLabel: 'Point of accountability',
    span: 'lg:col-span-3',
  },
  {
    icon: FlaskConical,
    tag: 'Engineering Rigour',
    title: 'IS-Standard Testing',
    body: 'Soil tests, concrete cube tests, and structural checks at foundation, slab, and roof — documented every pour.',
    stat: '100%',
    statLabel: 'Batches tested',
    span: 'lg:col-span-2',
  },
  {
    icon: DollarSign,
    tag: 'No Hidden Charges',
    title: 'Open-Cost Transparency',
    body: 'Itemised estimates shared before sign-off. Stage-wise payment locked upfront. No surprise bills at handover.',
    stat: '₹0',
    statLabel: 'Surprise costs',
    span: 'lg:col-span-2',
  },
  {
    icon: Video,
    tag: 'Post-Completion Proof',
    title: 'Video-Documented Handover',
    body: 'A full walkthrough of every completed system — plumbing, wiring, structure — recorded and handed over with the keys, test records and warranty pack.',
    stat: 'Every',
    statLabel: 'Home handed over on video',
    span: 'lg:col-span-3',
  },
] as const

export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
            Why Corner Brick 9
          </p>
          <TextReveal
            as="h2"
            className="font-bold leading-tight text-display-lg"
            style={{ color: T.text }}
            lines={[
              'Not What We Do.',
              <span key="l2" style={{ color: BRAND_ORANGE }}>How We Do It.</span>,
            ]}
          />
        </motion.div>

        {/* Interactive bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">
          {DIFFERENTIATORS.map(({ icon: Icon, tag, title, body, stat, statLabel, span }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={span}
            >
              <TiltCard
                className="rounded-2xl h-full min-h-[19rem] flex flex-col overflow-hidden border bg-white transition-shadow duration-300 hover:shadow-[0_28px_70px_-24px_rgba(232,72,28,0.45)]"
                style={{ borderColor: T.border }}
              >
                {/* Animated corner accent */}
                <div
                  className="absolute top-0 left-0 w-0 h-0 z-10 pointer-events-none transition-all duration-500 group-hover:w-16 group-hover:h-16"
                  style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 70%)` }}
                />

                {/* Content — sits above spotlight */}
                <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4" style={{ transform: 'translateZ(45px)' }}>
                    <div
                      className="rounded-xl w-14 h-14 flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}10` }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="rounded-lg text-[10px] font-semibold tracking-[0.2em] uppercase border px-2.5 py-1 mt-1"
                      style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}40`, backgroundColor: `${BRAND_ORANGE}06` }}
                    >
                      {tag}
                    </span>
                  </div>

                  {/* Title + body */}
                  <div className="mt-8 flex-1" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="font-bold text-2xl lg:text-[1.75rem] leading-tight mb-3" style={{ color: T.text }}>
                      {title}
                    </h3>
                    <p className="leading-relaxed text-sm max-w-md" style={{ color: T.textMuted }}>
                      {body}
                    </p>
                  </div>

                  {/* Stat footer */}
                  <div
                    className="mt-8 pt-6 border-t flex items-end justify-between gap-4"
                    style={{ borderColor: T.border, transform: 'translateZ(20px)' }}
                  >
                    <div>
                      <CountUp
                        value={stat}
                        className="block font-bold text-4xl lg:text-5xl leading-none tracking-tight"
                        style={{ color: BRAND_ORANGE }}
                      />
                      <p className="text-xs mt-2 font-medium tracking-wide" style={{ color: T.textFaint }}>
                        {statLabel}
                      </p>
                    </div>
                    <div
                      className="rounded-xl w-10 h-10 flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:bg-[#E8481C] group-hover:border-[#E8481C]"
                      style={{ borderColor: T.border }}
                    >
                      <ArrowUpRight
                        className="w-4 h-4 transition-colors duration-300 group-hover:text-white"
                        style={{ color: BRAND_ORANGE }}
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
