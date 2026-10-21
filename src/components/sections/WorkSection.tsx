'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION } from '@/lib/utils'
import TextReveal from '@/components/ui/TextReveal'
import PhotoStrip from '@/components/ui/PhotoStrip'
import PreviewNote, { PhotoSlot } from '@/components/ui/PreviewNote'
import { SITE_LIVE } from '@/lib/site'

const T = DARK_SECTION

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Finished-home photography, shown first. Empty until the client supplies it;
 * the section then leads with the homes and keeps site work below.
 */
const FINISHED: readonly { src: string; caption: string; location: string }[] = []

/** Real site photography only. Captions describe what is in the frame. */
const SITE_SHOTS = [
  { src: '/work/w1.jpg', caption: 'Brick and plinth walls going up',      location: 'Thiruvallur' },
  { src: '/work/w2.jpg', caption: 'Excavation and levelling at plinth',   location: 'Avadi, Chennai' },
  { src: '/work/w3.jpg', caption: 'Concrete mixed on site under control', location: 'Chennai' },
  { src: '/work/w4.jpg', caption: 'Plaster work reviewed with the team',  location: 'Avadi, Chennai' },
  { src: '/work/w5.jpg', caption: 'Face tiles set by hand and by eye',    location: 'Chennai' },
  { src: '/work/w6.jpg', caption: 'Brick cut to size for a clean course', location: 'Chennai' },
  { src: '/work/w7.jpg', caption: 'Structural steel frame in progress',   location: 'Chennai' },
] as const

export default function WorkSection() {
  const hasFinished = FINISHED.length > 0

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: T.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              className="text-sm font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: BRAND_ORANGE }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {hasFinished || !SITE_LIVE ? 'Our Work' : 'From Our Sites'}
            </motion.p>
            <TextReveal
              as="h2"
              className="font-bold leading-tight text-display-lg"
              style={{ color: T.text }}
              lines={
                hasFinished
                  ? ['Homes We’ve Built.', <span key="l2" style={{ color: BRAND_ORANGE }}>And How They Were Made.</span>]
                  : ['Work in Progress.', <span key="l2" style={{ color: BRAND_ORANGE }}>On Our Sites.</span>]
              }
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
          >
            <Link
              href="/projects"
              className="rounded-2xl group/link inline-flex items-center gap-2 text-sm font-semibold tracking-wide border px-6 py-3 transition-all"
              style={{ borderColor: T.border, color: T.textMuted }}
              onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.color = T.textMuted; e.currentTarget.style.borderColor = T.border }}
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Finished homes first */}
        {hasFinished ? (
          <>
            <PhotoStrip shots={FINISHED} />
            <p className="text-sm font-bold tracking-[0.2em] uppercase mt-16 mb-6" style={{ color: BRAND_ORANGE }}>
              From Our Sites
            </p>
          </>
        ) : !SITE_LIVE && (
          <div className="mb-14">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: T.textMuted }}>
              Finished Homes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Finished home: exterior', 'Finished home: living space', 'Finished home: detail'].map(l => (
                <PhotoSlot key={l} label={l} tone="dark" className="aspect-square" />
              ))}
            </div>
            <PreviewNote tone="dark" className="mt-5">
              Finished-home photographs will lead this section once supplied. Site photographs then follow below.
            </PreviewNote>
            <p className="text-sm font-bold tracking-[0.2em] uppercase mt-14 mb-6" style={{ color: BRAND_ORANGE }}>
              From Our Sites
            </p>
          </div>
        )}

        {/* Site work */}
        <PhotoStrip shots={SITE_SHOTS} />

      </div>
    </section>
  )
}
