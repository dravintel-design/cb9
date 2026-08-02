'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn, BRAND_ORANGE } from '@/lib/utils'

const NAV = [
  { label: 'About',     href: '/about'          },
  { label: 'Projects',  href: '/projects'       },
  { label: 'Design',    href: '/design-process' },
  { label: 'Build',     href: '/build-process'  },
  { label: 'Services',  href: '/services'       },
  { label: 'Materials', href: '/materials'      },
  { label: 'Journal',   href: '/journal'        },
  { label: 'Contact',   href: '/contact'        },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[var(--z-sticky)] transition-all duration-400',
          scrolled
            ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10'
            : 'bg-transparent py-7'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-brand font-bold text-xl tracking-tight text-white group">
            Corner<span style={{ color: BRAND_ORANGE }}>Brick</span>9
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-[13px] font-medium tracking-wide transition-colors duration-200',
                  pathname === href ? 'text-[#E8481C]' : 'text-white/70 hover:text-white'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="rounded-2xl hidden xl:inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-widest uppercase text-white transition-colors"
              style={{ backgroundColor: BRAND_ORANGE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
            >
              <ArrowRight className="w-3 h-3" />
              Start a Project
            </Link>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="rounded-xl lg:hidden w-10 h-10 flex items-center justify-center text-white border border-white/20 hover:border-white/50 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[var(--z-overlay)] flex flex-col"
            style={{ backgroundColor: '#0d0d0d' }}
          >
            {/* Mobile header row */}
            <div className="flex items-center justify-between px-6 py-7 border-b border-white/10">
              <Link href="/" className="font-bold text-xl text-white tracking-tight">
                Corner<span style={{ color: BRAND_ORANGE }}>Brick</span>9
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl w-10 h-10 flex items-center justify-center text-white border border-white/20"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {NAV.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease: [0, 0, 0.2, 1] }}
                >
                  <Link
                    href={href}
                    className={cn(
                      'block text-4xl sm:text-5xl font-bold py-2.5 border-b border-white/8 transition-colors',
                      pathname === href ? 'text-[#E8481C]' : 'text-white/80 hover:text-white'
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-8 pb-12">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold tracking-widest uppercase text-white"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                <ArrowRight className="w-4 h-4" />
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
