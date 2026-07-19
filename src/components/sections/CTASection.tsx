'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, Eye } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'

const T = DARK_SECTION

const TIERS = [
  {
    icon: Eye,
    label: 'Just Exploring',
    heading: "See What We've Built",
    body: 'Browse completed projects with specs, materials, and costs — no sign-up required.',
    cta: 'View Portfolio',
    href: '/work',
    variant: 'ghost',
  },
  {
    icon: Download,
    label: 'Comparing Builders',
    heading: 'Download the Checklist',
    body: '12 questions every Chennai home buyer should ask their builder — before signing anything.',
    cta: 'Download Free Checklist',
    href: '/checklist',
    variant: 'outline',
  },
  {
    icon: ArrowRight,
    label: 'Ready to Build',
    heading: 'Book a Free Consultation',
    body: 'Speak directly with Sathish. Site visit included. No pressure, no sales team.',
    cta: 'Book Consultation',
    href: '/contact',
    variant: 'filled',
  },
] as const

export default function CTASection() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: BRAND_ORANGE }}>
            Chennai · Avadi · Thiruvallur · Pattibiram
          </p>
          <TextReveal
            as="h2"
            className="font-bold leading-tight text-display-lg"
            style={{ color: T.text }}
            lines={[
              'Where Are You in',
              <span key="l2" style={{ color: BRAND_ORANGE }}>Your Build Journey?</span>,
            ]}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(({ icon: Icon, label, heading, body, cta, href, variant }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1], y: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0 } }}
              className="rounded-2xl flex flex-col gap-6 p-10 border transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(232,72,28,0.25)]"
              style={{
                borderColor: variant === 'filled' ? `${BRAND_ORANGE}30` : T.border,
                backgroundColor: variant === 'filled' ? `${BRAND_ORANGE}08` : T.cardBg,
              }}
            >
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: BRAND_ORANGE }}>
                  {label}
                </span>
                <h3 className="font-bold text-xl mt-3 mb-3" style={{ color: T.text }}>{heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{body}</p>
              </div>

              <Link
                href={href}
                className="rounded-2xl mt-auto inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all"
                style={
                  variant === 'filled'
                    ? { backgroundColor: BRAND_ORANGE, color: '#fff' }
                    : variant === 'outline'
                    ? { border: `1px solid ${T.border}`, color: T.textMuted }
                    : { color: T.textFaint }
                }
                onMouseEnter={e => {
                  if (variant === 'filled') e.currentTarget.style.backgroundColor = '#D03D14'
                  else { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }
                }}
                onMouseLeave={e => {
                  if (variant === 'filled') e.currentTarget.style.backgroundColor = BRAND_ORANGE
                  else if (variant === 'outline') { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border }
                  else e.currentTarget.style.color = T.textFaint
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
