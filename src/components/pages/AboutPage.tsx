'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Compass, FlaskConical, FileCheck, Users, Youtube, GraduationCap, Award } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import TextReveal from '@/components/ui/TextReveal'
import Parallax from '@/components/ui/Parallax'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const BELIEFS = [
  { num: '01', title: 'No Template Homes',            body: 'We do not repeat plans. A floor plan drawn for another family, on another plot, has no business shaping yours.' },
  { num: '02', title: 'Every Site Deserves a Unique Response', body: 'Sun path, soil, neighbours, breeze — the design begins with what the land already knows.' },
  { num: '03', title: 'Engineering Before Aesthetics', body: 'Structure is resolved first. Beauty that ignores load paths is decoration, not architecture.' },
  { num: '04', title: 'Quality Backed by Documentation', body: 'Every soil test, cube test, and inspection is recorded and shared. Claims are cheap; records are not.' },
  { num: '05', title: 'Honest Cost Transparency',      body: 'Itemised estimates before sign-off. The number we agree on is the number you pay.' },
  { num: '06', title: 'Design That Ages Gracefully',   body: 'We choose materials and proportions that look better at year ten than at handover.' },
] as const

const TEAM = [
  { icon: Compass,      role: 'Design Partners',    detail: 'We work with architects and specialist designers whose work suits your site and brief — coordinated by CB9, so you deal with one team.' },
  { icon: FlaskConical, role: 'Engineering',        detail: 'Civil and structural engineering, soil testing, rebar verification and concrete cube testing at every pour.' },
  { icon: Users,        role: 'Site Management',    detail: 'Every trade on your site — mason, electrician, plumber, finisher — is controlled and inspected through CB9 site management.' },
  { icon: FileCheck,    role: 'Documentation Cell', detail: 'Photographs, test reports and handover records maintained for every stage of every residence.' },
] as const

const VALUES = [
  { title: 'Integrity of Structure', body: 'What holds the house up is never compromised — not for speed, not for cost, not for looks.' },
  { title: 'Transparency of Cost',   body: 'You see every line item before you sign, and the record of every rupee after.' },
  { title: 'Proof Over Promises',    body: 'We publish what we test. Trust is earned in documents, not slogans.' },
  { title: 'Longevity by Design',    body: 'Homes planned for the family you will be in twenty years, not just the one you are today.' },
] as const

const DNA_PREVIEW = [
  'Light before luxury',
  'Cross ventilation first',
  'Engineering before decoration',
  'Homes built around families',
] as const

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Studio"
        lines={[
          <>Design. Engineering.</>,
          <span key="l2" style={{ color: BRAND_ORANGE }}>Build.</span>,
        ]}
        intro="Corner Brick 9 is a bespoke residential design, engineering and build studio in Chennai. We take a family, a plot and a way of living, develop an individual architectural response to it, and stay accountable for building it."
        meta={['Architecture', 'Engineering', 'Construction', 'Chennai']}
        image="/heroes/about.svg"
        imageAlt="Site plan drawing showing plot boundary, setbacks, house footprint with central courtyard, trees, and a north arrow"
      />

      {/* Vision — editorial statement */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              Vision
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-md"
              style={{ color: L.text }}
              lines={[
                'One Family.',
                'One Site.',
                <span key="l3" style={{ color: BRAND_ORANGE }}>One Story.</span>,
              ]}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6 justify-center">
            {[
              'Most construction in Chennai is copied — the same elevation, the same plan, the same shortcuts, sold plot after plot. We started Corner Brick 9 to do the opposite: to treat every home as a piece of architecture that answers to its site and its family, and to back that design with engineering you can audit.',
              'We are not a contractor with a portfolio. We are a studio that shapes the design, engineers it, and then stands behind its execution on site — because a drawing is only honoured when the people who drew it are still answerable when it is built.',
            ].map((p, i) => (
              <motion.p
                key={i}
                className="leading-relaxed text-base lg:text-lg"
                style={{ color: L.textMuted }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Design philosophy — six beliefs */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              Design Philosophy
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: D.text }}
              lines={[
                'What We Refuse',
                <span key="l2" style={{ color: BRAND_ORANGE }}>to Compromise.</span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {BELIEFS.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                className="rounded-2xl border p-8 flex flex-col gap-4"
                style={{ backgroundColor: D.cardBg, borderColor: D.border }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: EASE }}
              >
                <span className="font-bold text-sm tabular-nums" style={{ color: BRAND_ORANGE }}>{num}</span>
                <h3 className="font-bold text-lg leading-snug" style={{ color: D.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ clipPath: 'inset(8% 8% 8% 8%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Parallax speed={6} className="rounded-2xl relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: L.bgDeep }}>
              <div
                className="absolute bottom-0 left-0 right-0 h-[40%]"
                style={{ background: `linear-gradient(to top, ${L.bgDeep}, transparent)` }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-bold text-2xl" style={{ color: L.text }}>M. Sathish Kumar</p>
                <p className="text-sm mt-1" style={{ color: L.textMuted }}>Founder · Chief Engineer</p>
              </div>
            </Parallax>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                The Founder
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-md mb-6"
                style={{ color: L.text }}
                lines={[
                  'Built From the',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>Ground Up.</span>,
                ]}
              />
              <motion.p
                className="leading-relaxed"
                style={{ color: L.textMuted }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                Sathish grew up watching families in Avadi and Thiruvallur hand their savings to a chain of people none of them had met. He founded Corner Brick 9 around a single principle: one team stays accountable for your residence — for who designs it, who builds it, what gets tested, and why.
              </motion.p>
            </div>
            <motion.p
              className="leading-relaxed"
              style={{ color: L.textMuted }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              With a B.E. and M.Tech in Civil Engineering, he leads the studio’s engineering and site management and coordinates the architects and specialists behind each residence — and documents real construction lessons on an educational YouTube channel, because an informed client builds a better home.
            </motion.p>

            <div className="flex flex-col gap-4">
              {[
                { icon: GraduationCap, text: 'B.E. + M.Tech Civil Engineering — Anna University Affiliated' },
                { icon: Award,         text: '10+ years building across Chennai, Avadi, Thiruvallur & Pattibiram' },
                { icon: Youtube,       text: 'Educational YouTube channel — real construction insights' },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                >
                  <div
                    className="rounded-xl w-8 h-8 flex-shrink-0 flex items-center justify-center border"
                    style={{ borderColor: L.border, color: BRAND_ORANGE }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: L.textMuted }}>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team — honest, role-based */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                The Team
              </p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-lg"
                style={{ color: D.text }}
                lines={[
                  'One Studio.',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>Four Disciplines.</span>,
                ]}
              />
            </div>
            <p className="text-sm max-w-xs" style={{ color: D.textFaint }}>
              A founder-led studio with a partner network. You experience one integrated project team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {TEAM.map(({ icon: Icon, role, detail }, i) => (
              <motion.div
                key={role}
                className="rounded-2xl border p-8 flex flex-col gap-5"
                style={{ backgroundColor: D.cardBg, borderColor: D.border }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              >
                <div
                  className="rounded-xl w-12 h-12 flex items-center justify-center border"
                  style={{ borderColor: BRAND_ORANGE, color: BRAND_ORANGE, backgroundColor: `${BRAND_ORANGE}10` }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: D.text }}>{role}</h3>
                <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design DNA teaser */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              Design DNA
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-md mb-8"
              style={{ color: L.text }}
              lines={[
                'The Principles Behind',
                <span key="l2" style={{ color: BRAND_ORANGE }}>Every Drawing.</span>,
              ]}
            />
            <Link
              href="/design-process#design-dna"
              className="rounded-2xl inline-flex items-center gap-2 text-sm font-semibold tracking-wide border px-6 py-3 transition-all"
              style={{ borderColor: L.border, color: L.textMuted }}
              onMouseEnter={e => { e.currentTarget.style.color = L.text; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.color = L.textMuted; e.currentTarget.style.borderColor = L.border }}
            >
              Read the Full Design DNA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ul className="flex flex-col justify-center">
            {DNA_PREVIEW.map((p, i) => (
              <motion.li
                key={p}
                className="py-5 border-b flex items-baseline gap-6"
                style={{ borderColor: L.border }}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <span className="text-xs font-bold tabular-nums" style={{ color: BRAND_ORANGE }}>
                  0{i + 1}
                </span>
                <span className="font-bold text-xl lg:text-2xl" style={{ color: L.text }}>{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core values */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bgDeep }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
              Core Values
            </p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: L.text }}
              lines={['What We Stand On.']}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {VALUES.map(({ title, body }, i) => (
              <motion.div
                key={title}
                className="rounded-2xl border p-8 lg:p-10 flex flex-col gap-3"
                style={{ backgroundColor: L.cardBg, borderColor: L.border }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: EASE }}
              >
                <h3 className="font-bold text-xl" style={{ color: L.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: L.textMuted }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        lines={[
          'A Home Designed',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Only for You.</span>,
        ]}
        body="Tell us about your site and your family. The first conversation — and the first site visit — costs nothing."
      />
    </>
  )
}
