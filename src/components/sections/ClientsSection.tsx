'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BRAND_ORANGE, LIGHT_SECTION, DARK_SECTION } from '@/lib/utils'

const T = LIGHT_SECTION
const TD = DARK_SECTION

const STATS = [
  { value: '40+',   label: 'Homes Built',       sub: 'Across Avadi, Thiruvallur & Pattibiram' },
  { value: '10+',   label: 'Years Active',       sub: 'In Chennai and surrounding districts'   },
  { value: '100%',  label: 'IS-Standard Tested', sub: 'Every batch, every pour, documented'   },
  { value: '0',     label: 'Subcontractors',     sub: 'All workers employed directly by CB9'  },
] as const

const VIDEOS = [
  {
    videoId: 'J29BaR9hESc',
    client: 'Client Review — Avadi',
    detail: 'Turnkey G+1 Home · CB9 Build',
  },
  {
    videoId: 'TScl3sVpoT4',
    client: 'Client Review — Thiruvallur',
    detail: 'New Construction · IS-Tested',
  },
  {
    videoId: 'qbwyn7jD9V0',
    client: 'Client Review — Pattibiram',
    detail: 'Video Handover Documented',
  },
] as const

function VideoCard({
  videoId,
  client,
  detail,
  index,
}: {
  videoId: string
  client: string
  detail: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col border overflow-hidden"
      style={{ backgroundColor: TD.cardBg, borderColor: TD.border }}
    >
      {/* Video wrapper — filter sits here so it captures iframe content */}
      <div
        className="relative w-full"
        style={{ paddingBottom: '56.25%' /* 16:9 */ }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="absolute inset-0"
          style={{
            filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
            transition: 'filter 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
            title={client}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>

        {/* Orange corner accent — visible only in grayscale state */}
        <div
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 100%)`,
            opacity: hovered ? 0 : 1,
          }}
        />
      </div>

      {/* Caption */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4 border-t"
        style={{ borderColor: TD.border }}
      >
        <div>
          <p className="font-semibold text-sm" style={{ color: TD.text }}>{client}</p>
          <p className="text-xs mt-0.5" style={{ color: TD.textFaint }}>{detail}</p>
        </div>
        <div
          className="w-6 h-6 shrink-0 flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: hovered ? `${BRAND_ORANGE}20` : `${BRAND_ORANGE}08` }}
        >
          <div
            className="w-1.5 h-1.5 transition-colors duration-300"
            style={{ backgroundColor: BRAND_ORANGE }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function ClientsSection() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16 flex flex-col gap-20">

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: BRAND_ORANGE }}>
            Track Record
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: T.border }}>
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="p-8 lg:p-10" style={{ backgroundColor: T.bg }}>
                <p className="font-bold text-5xl lg:text-6xl mb-1" style={{ color: T.text }}>{value}</p>
                <p className="font-semibold text-sm mb-2" style={{ color: T.text }}>{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: T.textFaint }}>{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Video testimonials */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <h2
              className="font-bold leading-tight"
              style={{ color: T.text, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              What Clients Say
              <br />
              <span style={{ color: BRAND_ORANGE }}>After Moving In.</span>
            </h2>
            <p className="text-sm max-w-xs" style={{ color: T.textFaint }}>
              Hover to see in colour. Click to play.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VIDEOS.map((v, i) => (
              <VideoCard key={v.videoId} {...v} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
