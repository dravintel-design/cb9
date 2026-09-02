'use client'

import { motion } from 'framer-motion'
import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import VideoCarousel, { type VideoItem } from '@/components/ui/VideoCarousel'
import TextReveal from '@/components/ui/TextReveal'
import CountUp from '@/components/ui/CountUp'

const T = LIGHT_SECTION

/** Defensible proof points only — no unverified project counts. */
const STATS = [
  { value: '10+',   label: 'Years Active',        sub: 'Designing and building in Chennai'        },
  { value: '100%',  label: 'IS-Standard Tested',  sub: 'Every batch, every pour, documented'      },
  { value: 'One',   label: 'Accountable Team',    sub: 'Every trade under CB9 site management'    },
  { value: 'Every', label: 'Handover Documented', sub: 'Walkthrough, test records and warranty'   },
] as const

const VIDEOS: readonly VideoItem[] = [
  {
    videoId: 'J29BaR9hESc',
    client: 'Client Review, Avadi',
    detail: 'Turnkey G+1 Home · CB9 Build',
  },
  {
    videoId: 'TScl3sVpoT4',
    client: 'Client Review, Thiruvallur',
    detail: 'New Construction · IS-Tested',
  },
  {
    videoId: 'qbwyn7jD9V0',
    client: 'Client Review, Pattibiram',
    detail: 'Video Handover Documented',
  },
] as const

export default function ClientsSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16 flex flex-col gap-20">

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: BRAND_ORANGE }}>
            Track Record
          </p>
          <div className="rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: T.border }}>
            {STATS.map(({ value, label, sub }, i) => (
              <div key={label} className="p-8 lg:p-10" style={{ backgroundColor: T.bg }}>
                <CountUp
                  value={value}
                  delay={i * 0.12}
                  className="block font-bold text-5xl lg:text-6xl mb-1"
                  style={{ color: T.text }}
                />
                <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: T.textFaint }}>{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Netflix-style video carousel */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <TextReveal
              as="h2"
              className="font-bold leading-tight"
              style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
              lines={[
                'What Clients Say',
                <span key="l2" style={{ color: BRAND_ORANGE }}>After Moving In.</span>,
              ]}
            />
            <p className="text-sm max-w-xs" style={{ color: T.textFaint }}>
              Real homeowners, on camera. Hover to preview, click any story to play.
            </p>
          </motion.div>

          <VideoCarousel items={VIDEOS} />
        </div>
      </div>
    </section>
  )
}
