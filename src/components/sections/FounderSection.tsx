'use client'

import { motion } from 'framer-motion'
import { Youtube, Award, GraduationCap } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'
import Parallax from '@/components/ui/Parallax'

const T = LIGHT_SECTION

const EASE = [0.22, 1, 0.36, 1] as const

const CREDENTIALS = [
  { icon: GraduationCap, text: 'B.E. + M.Tech Civil Engineering — Anna University Affiliated' },
  { icon: Award,         text: '10+ Years Active in Chennai, Avadi, Thiruvallur & Pattibiram' },
  { icon: Youtube,       text: 'Educational YouTube Channel — Real Construction Insights' },
] as const

export default function FounderSection() {

  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Portrait with parallax drift + clip reveal */}
          <motion.div
            initial={{ clipPath: 'inset(8% 8% 8% 8%)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Parallax speed={6} className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: T.bgDeep }}>
              <div className="absolute inset-0 flex items-end p-8">
                <motion.div
                  className="h-1 origin-left"
                  style={{ backgroundColor: BRAND_ORANGE }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[40%]"
                style={{ background: `linear-gradient(to top, ${T.bgDeep}, transparent)` }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-bold text-2xl" style={{ color: T.text }}>M. Sathish Kumar</p>
                <p className="text-sm mt-1" style={{ color: T.textMuted }}>Founder &amp; Chief Engineer</p>
              </div>
            </Parallax>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div>
              <motion.p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
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
                Sathish grew up watching families in Avadi, Thiruvallur, and Pattibiram lose lakhs to middlemen and subcontractors they never met. He founded Corner Brick 9 to change one thing: when you hire us, you know exactly who is building your home, what they are testing, and why.
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
              With a B.E. and M.Tech in Civil Engineering from an Anna University affiliated college, Sathish personally oversees every soil test, every concrete cube, every electrical layout. He also runs an educational YouTube channel documenting real construction mistakes — because an informed client builds a better home.
            </motion.p>

            {/* Credentials — staggered slide-in */}
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
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center border"
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
              &ldquo;If you can&apos;t explain what was tested and why, you haven&apos;t earned the client&apos;s trust. Every report we file, we publish.&rdquo;
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
