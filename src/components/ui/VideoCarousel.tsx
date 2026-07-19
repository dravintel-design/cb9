'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { BRAND_ORANGE } from '@/lib/utils'

export interface VideoItem {
  videoId: string
  client: string
  detail: string
}

function PosterCard({
  item,
  index,
  onPlay,
}: {
  item: VideoItem
  index: number
  onPlay: () => void
}) {
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`
  )

  return (
    <motion.button
      type="button"
      onClick={onPlay}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-2xl group relative snap-start shrink-0 w-[290px] sm:w-[360px] lg:w-[420px] aspect-video overflow-hidden border text-left transition-all duration-500 ease-out hover:z-20 hover:scale-[1.05] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)]"
      style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#0d0d0d' }}
    >
      {/* Poster */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={item.client}
        loading="lazy"
        onError={() => setSrc(`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`)}
        className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
      />

      {/* Bottom gradient scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)' }}
      />

      {/* Orange corner accent (fades on hover) */}
      <div
        className="absolute top-0 left-0 w-9 h-9 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
        style={{ background: `linear-gradient(135deg, ${BRAND_ORANGE} 0%, transparent 100%)` }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 backdrop-blur-sm transition-all duration-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          style={{ borderColor: '#ffffff', backgroundColor: 'rgba(232,72,28,0.85)' }}
        >
          <Play className="w-5 h-5 text-white translate-x-0.5" fill="white" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-semibold text-sm text-white leading-snug">{item.client}</p>
        <p
          className="text-xs mt-1 transition-colors duration-300"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {item.detail}
        </p>
        <div
          className="mt-3 h-[2px] w-0 transition-all duration-500 group-hover:w-12"
          style={{ backgroundColor: BRAND_ORANGE }}
        />
      </div>
    </motion.button>
  )
}

export default function VideoCarousel({ items }: { items: readonly VideoItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState<VideoItem | null>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows])

  // Close modal on Escape
  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlaying(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByDir(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-11 h-11 items-center justify-center rounded-full border transition-all duration-300"
        style={{
          backgroundColor: '#171717',
          borderColor: 'rgba(255,255,255,0.15)',
          color: '#fff',
          opacity: canLeft ? 1 : 0,
          pointerEvents: canLeft ? 'auto' : 'none',
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByDir(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-11 h-11 items-center justify-center rounded-full border transition-all duration-300"
        style={{
          backgroundColor: '#171717',
          borderColor: 'rgba(255,255,255,0.15)',
          color: '#fff',
          opacity: canRight ? 1 : 0,
          pointerEvents: canRight ? 'auto' : 'none',
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Track */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory py-8 -my-8 px-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item, i) => (
          <PosterCard key={item.videoId} item={item} index={i} onPlay={() => setPlaying(item)} />
        ))}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={() => setPlaying(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-white font-semibold">{playing.client}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{playing.detail}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setPlaying(null)}
                  className="rounded-xl w-10 h-10 flex items-center justify-center border transition-colors duration-200 hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video */}
              <div className="rounded-2xl overflow-hidden relative w-full aspect-video border" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${playing.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title={playing.client}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
