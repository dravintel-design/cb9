'use client'

import { motion } from 'framer-motion'
import { Youtube, Award, GraduationCap } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'
import FounderPortrait from '@/components/ui/FounderPortrait'
import FounderAward from '@/components/ui/FounderAward'

const T = LIGHT_SECTION

const EASE = [0.22, 1, 0.36, 1] as const

const CREDENTIALS = [
  { icon: GraduationCap, text: 'B.E. + M.Tech Qualified Engineer' },
  { icon: Award,         text: '10+ Years Active Across Chennai and Tamil Nadu' },
  { icon: Youtube,       text: 'Educational YouTube Channel, Real Construction Insights' },
] as const

export default function FounderSection() {

  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <FounderPortrait />

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div>
              <motion.p
                className="text-sm font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: BRAND_ORANGE }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                The Founder
              </motion.p>
              <TextReveal
                as="h2"
                className="font-bold leading-tight text-display-md mb-6"
                style={{ color: T.text }}
                lines={[
                  'Built From the',
                  <span key="l2" style={{ color: BRAND_ORANGE }}>Ground Up.</span>,
                ]}
              />
              <motion.p
                className="leading-relaxed"
                style={{ color: T.textMuted }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              >
                Sathish founded Corner Brick 9 around a single principle: one team stays accountable for your home, from the first sketch to the final handover.
              </motion.p>
            </div>

            <motion.p
              className="leading-relaxed"
              style={{ color: T.textMuted }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              With a B.E. and an M.Tech behind him, Sathish leads the studio’s engineering and site management, and coordinates the architects and specialists who shape each residence. He also runs an educational YouTube channel documenting real construction lessons, because an informed client builds a better home.
            </motion.p>

            {/* Credentials, staggered slide-in */}
            <div className="flex flex-col gap-4">
              {CREDENTIALS.map(({ icon: Icon, text }, i) => (
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
                    style={{ borderColor: T.border, color: BRAND_ORANGE }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{text}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              className="border-l-2 pl-6 italic text-sm leading-relaxed"
              style={{ borderColor: BRAND_ORANGE, color: T.textMuted }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              &ldquo;A client should always know what was tested on their home, and why. We record project test results and share them with the client.&rdquo;
            </motion.blockquote>
          </div>
        </div>

        <FounderAward />
      </div>
    </section>
  )
}
