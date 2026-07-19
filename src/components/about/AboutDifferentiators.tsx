'use client'

import { motion } from 'framer-motion'
import { Users, FlaskConical, FileText, Video } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'

const T = DARK_SECTION

const PILLARS = [
  {
    num: '01',
    icon: Users,
    title: 'Zero Subcontractors',
    headline: 'Every worker is a Corner Brick 9 employee.',
    body: "Most construction firms in Chennai subcontract 60–80% of the actual build — masonry, electrical, plumbing — to workers you never meet and the firm cannot guarantee. At CB9, every person on your site is directly employed by us. That means accountability for quality runs all the way down, not just to the project manager's desk.",
    proof: 'Our direct payroll team handles all trades: masonry, bar bending, electrical, plumbing, drainage, plastering, and finishing.',
  },
  {
    num: '02',
    icon: FlaskConical,
    title: 'IS-Standard Testing',
    headline: 'Test reports at every pour. Not just at the end.',
    body: "We conduct soil bearing capacity tests to IS 1888 before foundation work begins. Concrete cube tests to IS 456 are conducted at every pour stage — not sampled, not assumed. Electrical wiring is verified to IS 732. Every test generates a report; every report goes into the client's handover folder.",
    proof: 'IS 1888 soil test · IS 456 cube test at every pour · IS 732 electrical verification — all reports handed to client.',
  },
  {
    num: '03',
    icon: FileText,
    title: 'Open-Cost Transparency',
    headline: 'The estimate you sign is the invoice you receive.',
    body: "CB9 provides an itemised estimate — material by material, stage by stage — before work begins. The stage-wise payment schedule is locked in the contract. We do not adjust costs mid-build because a material became expensive or a scope decision happened informally. Every change is discussed, written, and approved before it happens.",
    proof: 'Signed estimate = final invoice. Stage-wise payments locked upfront. No informal scope changes.',
  },
  {
    num: '04',
    icon: Video,
    title: 'Video-Documented Handover',
    headline: 'We walk you through your home on camera.',
    body: 'At handover, Sathish personally walks you through every room, every fitting, and every system on video. The recording, together with all IS test reports and warranty documentation, is compiled into a folder handed to you at completion. Most builders hand over keys. We hand over a dossier.',
    proof: 'Full video walkthrough at handover. Test reports + warranty pack included. Compiled into a client dossier.',
  },
] as const

export default function AboutDifferentiators() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              What Sets CB9 Apart
            </p>
            <h2
              className="font-bold leading-tight"
              style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Four Things
              <br />
              <span style={{ color: BRAND_ORANGE }}>We Don&apos;t Compromise.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
            These are not marketing statements. They are operating decisions — decisions that cost money, reduce margins, and take longer. We make them because the alternative is a business we would not want to run.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="flex flex-col gap-0">
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1.1fr] gap-8 lg:gap-16 border-b py-12 lg:py-14 last:border-0"
                style={{ borderColor: T.border }}
              >
                {/* Number + icon col */}
                <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-5 lg:w-16">
                  <span
                    className="font-bold tabular-nums leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: `${BRAND_ORANGE}20` }}
                  >
                    {p.num}
                  </span>
                  <div
                    className="rounded-xl w-10 h-10 flex items-center justify-center border shrink-0"
                    style={{ borderColor: `${BRAND_ORANGE}30`, backgroundColor: `${BRAND_ORANGE}08` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: BRAND_ORANGE }} />
                  </div>
                </div>

                {/* Title col */}
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-3 border-b pb-4"
                    style={{ color: BRAND_ORANGE, borderColor: T.border }}
                  >
                    {p.title}
                  </p>
                  <h3
                    className="font-bold leading-tight"
                    style={{ color: T.text, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
                  >
                    {p.headline}
                  </h3>
                </div>

                {/* Body + proof col */}
                <div className="flex flex-col gap-5">
                  <p className="text-base leading-relaxed" style={{ color: T.textMuted }}>
                    {p.body}
                  </p>
                  <div
                    className="border-l-2 pl-4 text-sm leading-relaxed italic"
                    style={{ borderColor: `${BRAND_ORANGE}50`, color: T.textFaint }}
                  >
                    {p.proof}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
