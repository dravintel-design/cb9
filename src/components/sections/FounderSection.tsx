'use client'

import { motion } from 'framer-motion'
import { Youtube, Award, GraduationCap } from 'lucide-react'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION

export default function FounderSection() {

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: T.bgDeep }}
          >
            <div className="absolute inset-0 flex items-end p-8">
              <div className="h-1 w-16" style={{ backgroundColor: BRAND_ORANGE }} />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-[40%]"
              style={{ background: `linear-gradient(to top, ${T.bgDeep}, transparent)` }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-bold text-2xl" style={{ color: T.text }}>M. Sathish Kumar</p>
              <p className="text-sm mt-1" style={{ color: T.textMuted }}>Founder &amp; Chief Engineer</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
                The Founder
              </p>
              <h2 className="font-bold leading-tight text-display-md mb-6" style={{ color: T.text }}>
                Built From the
                <br />
                <span style={{ color: BRAND_ORANGE }}>Ground Up.</span>
              </h2>
              <p className="leading-relaxed" style={{ color: T.textMuted }}>
                Sathish grew up watching families in Avadi, Thiruvallur, and Pattibiram lose lakhs to middlemen and subcontractors they never met. He founded Corner Brick 9 to change one thing: when you hire us, you know exactly who is building your home, what they are testing, and why.
              </p>
            </div>

            <p className="leading-relaxed" style={{ color: T.textMuted }}>
              With a B.E. and M.Tech in Civil Engineering from an Anna University affiliated college, Sathish personally oversees every soil test, every concrete cube, every electrical layout. He also runs an educational YouTube channel documenting real construction mistakes — because an informed client builds a better home.
            </p>

            {/* Credentials */}
            <div className="flex flex-col gap-4">
              {[
                { icon: GraduationCap, text: 'B.E. + M.Tech Civil Engineering — Anna University Affiliated' },
                { icon: Award,         text: '10+ Years Active in Chennai, Avadi, Thiruvallur & Pattibiram' },
                { icon: Youtube,       text: 'Educational YouTube Channel — Real Construction Insights' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center border"
                    style={{ borderColor: T.border, color: BRAND_ORANGE }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: T.textMuted }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="border-l-2 pl-6 italic text-sm leading-relaxed"
              style={{ borderColor: BRAND_ORANGE, color: T.textMuted }}
            >
              "If you can't explain what was tested and why, you haven't earned the client's trust. Every report we file, we publish."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
