'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, FileText, Clock } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'
import PreviewNote from '@/components/ui/PreviewNote'
import { SITE_LIVE } from '@/lib/site'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const CATEGORY_ORDER = [
  'Architecture Education',
  'Construction Guides',
  'Site Stories',
  'Engineering Insights',
  'Material Comparisons',
  'Budget Planning',
  'Video Articles',
] as const
type Category = 'All' | (typeof CATEGORY_ORDER)[number]

interface Entry {
  id: string
  title: string
  excerpt: string
  category: (typeof CATEGORY_ORDER)[number]
  kind: 'read' | 'video'
  /**
   * Where the card opens. An entry without one is a planned topic: it is not a
   * link, shows no reading time, and is hidden once the site goes live.
   */
  href?: string
  /** Only for written articles that exist, measured from the finished text. */
  readTime?: string
}

const ENTRIES: readonly Entry[] = [
  // Published: videos on the CB9 YouTube channel
  {
    id: 'stalled-build-video',
    title: 'Completing a Stalled Build',
    excerpt: 'A construction project that had stopped, picked up and taken through to completion by CB9.',
    category: 'Video Articles',
    kind: 'video',
    href: 'https://www.youtube.com/watch?v=TScl3sVpoT4',
  },
  {
    id: 'material-testing-video',
    title: 'Material Testing on a Client’s Site',
    excerpt: 'A live recording of materials being tested on site, and what each test tells the client.',
    category: 'Video Articles',
    kind: 'video',
    href: 'https://www.youtube.com/watch?v=qbwyn7jD9V0',
  },
  // Planned: topics awaiting finished articles
  {
    id: 'why-soil-test',
    title: 'Why We Never Design a Foundation Before the Soil Report',
    excerpt: 'Two plots on the same street can carry very different loads, and what soil testing tells us before a foundation is drawn.',
    category: 'Engineering Insights',
    kind: 'read',
  },
  {
    id: 'aac-vs-red-brick',
    title: 'AAC Blocks vs Red Brick: An Honest Comparison',
    excerpt: 'Weight, insulation, cost per finished wall, and where each one genuinely works best.',
    category: 'Material Comparisons',
    kind: 'read',
  },
  {
    id: 'cross-ventilation',
    title: 'Designing for Chennai Heat: Cross Ventilation Before Air-Conditioning',
    excerpt: 'How window placement, court positions and section heights cool a home before a single compressor switches on.',
    category: 'Architecture Education',
    kind: 'read',
  },
  {
    id: 'stage-wise-payments',
    title: 'Reading a Stage-Wise Payment Schedule',
    excerpt: 'What each milestone should include, and the questions to ask before signing.',
    category: 'Budget Planning',
    kind: 'read',
  },
  {
    id: 'permits-explained',
    title: 'CMDA vs DTCP Approvals: A Plain-Language Guide',
    excerpt: 'Which authority governs your plot, and the documents each one asks for.',
    category: 'Construction Guides',
    kind: 'read',
  },
] as const

/** Unfinished entries never reach the live site. */
const VISIBLE = SITE_LIVE ? ENTRIES.filter(e => e.href) : ENTRIES
/** Only categories that have something in them, so no filter leads to an empty grid. */
const CATEGORIES: readonly Category[] = ['All', ...CATEGORY_ORDER.filter(c => VISIBLE.some(e => e.category === c))]

export default function JournalPage() {
  const [active, setActive] = useState<Category>('All')
  const filtered = active === 'All' ? VISIBLE : VISIBLE.filter(a => a.category === active)

  return (
    <>
      <PageHero
        eyebrow="Journal"
        lines={[
          'Building Knowledge,',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Openly.</span>,
        ]}
        intro="Essays, site stories and video lessons from the studio, because an informed client builds a better home."
        meta={['Education', 'Engineering', 'Site Stories', 'Video']}
        image="/heroes/journal.jpg"
        imageAlt="A brick being cut to size with an angle grinder, tile spacers laid out ready for setting"
      />

      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2 mb-9 pb-8 border-b"
            style={{ borderColor: L.border }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className="rounded-xl text-xs font-semibold tracking-[0.14em] uppercase px-4 py-2 border transition-all duration-200"
                style={{
                  backgroundColor: active === c ? BRAND_ORANGE : 'transparent',
                  color:           active === c ? '#ffffff' : L.textMuted,
                  borderColor:     active === c ? BRAND_ORANGE : L.border,
                }}
              >
                {c}
              </button>
            ))}
          </motion.div>

          <PreviewNote className="mb-8">
            Cards marked &ldquo;In preparation&rdquo; are planned topics without a finished article yet. They are not links,
            and they will not appear on the live site until the article is written.
          </PreviewNote>

          {/* Article grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {filtered.map((a, i) => {
                const live = Boolean(a.href)
                return (
                  <motion.article
                    key={a.id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={live ? { y: -8 } : {}}
                    transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE, y: { duration: 0.3, ease: EASE, delay: 0 } }}
                    className={`rounded-2xl group relative flex flex-col border p-8 transition-shadow duration-500 ${
                      live ? 'hover:shadow-[0_28px_60px_-28px_rgba(23,23,23,0.35)] focus-within:ring-2 focus-within:ring-[#E8481C]' : 'border-dashed'
                    }`}
                    style={{ backgroundColor: live ? L.cardBg : 'transparent', borderColor: live ? L.border : 'rgba(23,23,23,0.22)' }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span
                        className="rounded-lg text-xs font-bold tracking-[0.12em] uppercase px-2.5 py-1 border"
                        style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}06` }}
                      >
                        {a.category}
                      </span>
                      {a.kind === 'video'
                        ? <PlayCircle className="w-4 h-4 shrink-0" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                        : <FileText className="w-4 h-4 shrink-0" style={{ color: L.textFaint }} aria-hidden="true" />}
                    </div>

                    <h2 className="font-bold text-xl leading-snug mb-3 flex-1" style={{ color: L.text }}>
                      {live ? (
                        <a
                          href={a.href}
                          target={a.href!.startsWith('http') ? '_blank' : undefined}
                          rel={a.href!.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="outline-none after:absolute after:inset-0 after:content-['']"
                        >
                          {a.title}
                          {a.href!.startsWith('http') && <span className="sr-only"> (opens YouTube in a new tab)</span>}
                        </a>
                      ) : a.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: L.textMuted }}>
                      {a.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: L.border }}>
                      {live ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: L.textMuted }}>
                          {a.kind === 'video'
                            ? <><PlayCircle className="w-3.5 h-3.5" aria-hidden="true" /> Watch on YouTube</>
                            : <><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {a.readTime ?? 'Read the article'}</>}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: L.textFaint }}>
                          In preparation
                        </span>
                      )}
                      {live && (
                        <div className="h-[2px] w-6 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: BRAND_ORANGE }} />
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>

          <motion.p
            className="mt-12 text-sm text-center"
            style={{ color: L.textFaint }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            New essays and site stories are published as the work happens.
          </motion.p>
        </div>
      </section>

      <PageCTA
        eyebrow="Have a Question?"
        lines={[
          'Ask the Engineer,',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Not the Algorithm.</span>,
        ]}
        body="If a topic here raises questions about your own plot or project, write to us, real questions become future journal entries."
        ctaLabel="Write to the Studio"
      />
    </>
  )
}
