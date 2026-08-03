'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, FileText, Clock } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'
import PageCTA from '@/components/ui/PageCTA'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const CATEGORIES = [
  'All',
  'Architecture Education',
  'Construction Guides',
  'Site Stories',
  'Engineering Insights',
  'Material Comparisons',
  'Budget Planning',
  'Video Articles',
] as const
type Category = (typeof CATEGORIES)[number]

interface Article {
  id: string
  title: string
  excerpt: string
  category: Exclude<Category, 'All'>
  kind: 'read' | 'video'
  readTime: string
}

const ARTICLES: readonly Article[] = [
  {
    id: 'why-soil-test',
    title: 'Why We Never Design a Foundation Before the Soil Report',
    excerpt: 'Two plots on the same street can carry very different loads. What IS 1888 testing actually tells us, and what it costs to skip it.',
    category: 'Engineering Insights',
    kind: 'read',
    readTime: '6 min read',
  },
  {
    id: 'aac-vs-red-brick',
    title: 'AAC Blocks vs Red Brick: An Honest Comparison',
    excerpt: 'Weight, insulation, cost per finished wall, and where each one genuinely wins — without the dealer spin.',
    category: 'Material Comparisons',
    kind: 'read',
    readTime: '8 min read',
  },
  {
    id: 'cross-ventilation',
    title: 'Designing for Chennai Heat: Cross Ventilation Before Air-Conditioning',
    excerpt: 'How window placement, court positions, and section heights cool a home before a single compressor switches on.',
    category: 'Architecture Education',
    kind: 'read',
    readTime: '7 min read',
  },
  {
    id: 'stage-wise-payments',
    title: 'Reading a Stage-Wise Payment Schedule Like an Engineer',
    excerpt: 'What each milestone should include, which line items hide escalation, and the questions to ask before signing.',
    category: 'Budget Planning',
    kind: 'read',
    readTime: '9 min read',
  },
  {
    id: 'cube-test-day',
    title: 'Site Story: The Day a Cube Test Failed',
    excerpt: 'What happens on a CB9 site when the 7-day strength comes back low — and why we tell the client the same afternoon.',
    category: 'Site Stories',
    kind: 'read',
    readTime: '5 min read',
  },
  {
    id: 'client-walkthrough-video',
    title: 'Inside a Video Handover: Full Client Walkthrough',
    excerpt: 'A complete recorded handover — every valve, every switch, every warranty document — exactly as our clients receive it.',
    category: 'Video Articles',
    kind: 'video',
    readTime: '12 min watch',
  },
  {
    id: 'permits-explained',
    title: 'CMDA vs DTCP Approvals: A Plain-Language Guide',
    excerpt: 'Which authority governs your plot, the documents each demands, and realistic timelines from filing to sanction.',
    category: 'Construction Guides',
    kind: 'read',
    readTime: '10 min read',
  },
  {
    id: 'common-mistakes-video',
    title: 'Five Construction Mistakes We Keep Seeing in Chennai',
    excerpt: 'From the founder’s educational channel — real defects filmed on real sites, and how each one should have been prevented.',
    category: 'Video Articles',
    kind: 'video',
    readTime: '15 min watch',
  },
] as const

export default function JournalPage() {
  const [active, setActive] = useState<Category>('All')
  const filtered = active === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === active)

  return (
    <>
      <PageHero
        eyebrow="Journal"
        lines={[
          'Building Knowledge,',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Openly.</span>,
        ]}
        intro="Essays, site stories, and video lessons from the studio — because an informed client builds a better home. No gated PDFs, no sales funnels."
        meta={['Education', 'Engineering', 'Site Stories', 'Video']}
        image="/heroes/journal.svg"
        imageAlt="Stacked architectural drawing sheets with a title block and a magnified construction detail callout"
      />

      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2 mb-12 pb-8 border-b"
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
                className="rounded-xl text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 border transition-all duration-200"
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
              {filtered.map((a, i) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE, y: { duration: 0.3, ease: EASE, delay: 0 } }}
                  className="rounded-2xl group flex flex-col border p-8 cursor-pointer transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(23,23,23,0.35)]"
                  style={{ backgroundColor: L.cardBg, borderColor: L.border }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="rounded-lg text-[9px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 border"
                      style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35`, backgroundColor: `${BRAND_ORANGE}06` }}
                    >
                      {a.category}
                    </span>
                    {a.kind === 'video'
                      ? <PlayCircle className="w-4 h-4" style={{ color: BRAND_ORANGE }} />
                      : <FileText className="w-4 h-4" style={{ color: L.textFaint }} />}
                  </div>

                  <h2 className="font-bold text-xl leading-snug mb-3 flex-1" style={{ color: L.text }}>
                    {a.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: L.textMuted }}>
                    {a.excerpt}
                  </p>

                  <div
                    className="flex items-center justify-between pt-5 border-t"
                    style={{ borderColor: L.border }}
                  >
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: L.textFaint }}>
                      <Clock className="w-3 h-3" /> {a.readTime}
                    </span>
                    <div
                      className="h-[2px] w-6 transition-all duration-500 group-hover:w-12"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    />
                  </div>
                </motion.article>
              ))}
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
            New essays and site stories are published as the work happens — not on a content calendar.
          </motion.p>
        </div>
      </section>

      <PageCTA
        eyebrow="Have a Question?"
        lines={[
          'Ask the Engineer,',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Not the Algorithm.</span>,
        ]}
        body="If a topic here raises questions about your own plot or project, write to us — real questions become future journal entries."
        ctaLabel="Write to the Studio"
      />
    </>
  )
}
