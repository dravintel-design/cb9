'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { BRAND_ORANGE } from '@/lib/utils'

const COMPANY_LINKS = [
  { label: 'The Studio',       href: '/about'    },
  { label: 'Projects',         href: '/projects' },
  { label: 'Journal',          href: '/journal'  },
  { label: 'Contact',          href: '/contact'  },
]

const SERVICE_LINKS = [
  { label: 'Design Process',    href: '/design-process' },
  { label: 'Build Process',     href: '/build-process'  },
  { label: 'Services',          href: '/services'       },
  { label: 'Materials & Craft', href: '/materials'      },
]

const CONTACT = [
  { icon: Phone,  text: '+91 98765 43210'            },
  { icon: Mail,   text: 'hello@cornerbrick9.com'     },
  { icon: MapPin, text: 'Chennai · Avadi · Thiruvallur' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d0d0d' }} className="text-white">
      {/* CTA band */}
      <div className="py-16 border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2
            className="font-bold text-center lg:text-left text-display-md text-white"
            style={{ lineHeight: 1.2 }}
          >
            Let's Build Something
            <br />
            <span style={{ color: BRAND_ORANGE }}>Great Together.</span>
          </h2>
          <Link
            href="/contact"
            className="rounded-2xl inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold tracking-widest uppercase text-white shrink-0 transition-colors"
            style={{ backgroundColor: BRAND_ORANGE }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D03D14')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
          >
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Columns */}
      <div className="py-16 border-b border-white/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Corner Brick 9, home" className="inline-block">
              {/* Full lockup here: at this size the tagline is legible. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/cb9-logo.png"
                alt="Corner Brick 9, elegance in every corner"
                width={1100}
                height={177}
                className="w-full max-w-[340px] h-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              A residential architecture, engineering &amp; build studio. Every home designed for one family, one site, one story.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              {CONTACT.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/50 text-sm">
                  <Icon className="w-4 h-4 shrink-0" style={{ color: BRAND_ORANGE }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: BRAND_ORANGE }}>
              The Studio
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Positioning: the lockup already carries the tagline */}
          <div className="flex flex-col justify-between">
            <p className="text-4xl font-bold leading-tight select-none cursor-default">
              {['DESIGN.', 'ENGINEERING.', 'BUILD.'].map((word, i) => (
                <motion.span
                  key={word}
                  className="block transition-colors duration-500 hover:text-[#E8481C]"
                  style={{ color: 'rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
            <p className="text-white/25 text-xs tracking-widest uppercase mt-auto pt-8">
              Licensed &amp; Insured<br />IS-Standard Compliant
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Corner Brick 9. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
