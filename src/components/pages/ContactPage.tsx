'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock, CalendarCheck, Check, Loader2 } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import PageHero from '@/components/ui/PageHero'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const PHONE_DISPLAY = '+91 98765 43210'
const PHONE_RAW = '919876543210'
const EMAIL = 'hello@cornerbrick9.com'

const OFFICE = [
  { icon: MapPin, label: 'Studio',  value: 'Avadi, Chennai — Tamil Nadu' },
  { icon: Clock,  label: 'Hours',   value: 'Mon–Sat · 9:30 AM – 6:30 PM' },
  { icon: Phone,  label: 'Phone',   value: PHONE_DISPLAY },
  { icon: Mail,   label: 'Email',   value: EMAIL },
] as const

type Status = 'idle' | 'sending' | 'sent'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState({ name: '', phone: '', interest: 'New Home', message: '' })

  const canSubmit =
    fields.name.trim().length >= 2 && /^[6-9]\d{9}$/.test(fields.phone.trim())

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || status !== 'idle') return
    setStatus('sending')
    // Enquiries are minimal by design — captured and followed up personally.
    setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={[
          'Start With a',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Conversation.</span>,
        ]}
        intro="No call centres, no sales scripts. Your enquiry lands with the studio and is answered by the engineer who would run your project."
        meta={['Reply within 24 hours', 'Free First Site Visit']}
      />

      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Minimal enquiry form */}
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-8" style={{ color: BRAND_ORANGE }}>
              Enquiry
            </p>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl border p-10 flex flex-col items-start gap-4"
                style={{ backgroundColor: L.cardBg, borderColor: `${BRAND_ORANGE}40` }}
              >
                <div
                  className="rounded-xl w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: `${BRAND_ORANGE}12`, color: BRAND_ORANGE }}
                >
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="font-bold text-2xl" style={{ color: L.text }}>Received.</h2>
                <p className="text-sm leading-relaxed" style={{ color: L.textMuted }}>
                  Thank you, {fields.name.split(' ')[0]}. Sathish or a studio engineer will call you
                  within one working day. If it&apos;s urgent, WhatsApp us directly.
                </p>
                <a
                  href={`https://wa.me/${PHONE_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white mt-2"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp the Studio
                </a>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold tracking-wide uppercase" style={{ color: L.textMuted }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={fields.name}
                    onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white"
                    style={{ borderColor: L.border, color: L.text }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-semibold tracking-wide uppercase" style={{ color: L.textMuted }}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={fields.phone}
                    onChange={e => setFields(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="10-digit mobile number"
                    className="border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white"
                    style={{ borderColor: L.border, color: L.text }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-xs font-semibold tracking-wide uppercase" style={{ color: L.textMuted }}>
                    I&apos;m thinking about
                  </label>
                  <select
                    id="interest"
                    value={fields.interest}
                    onChange={e => setFields(f => ({ ...f, interest: e.target.value }))}
                    className="border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white appearance-none"
                    style={{ borderColor: L.border, color: L.text }}
                  >
                    {['New Home', 'Renovation', 'Design & Engineering Only', 'Plot Appraisal', 'Something Else'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-semibold tracking-wide uppercase" style={{ color: L.textMuted }}>
                    A few lines about it <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={fields.message}
                    onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    placeholder="Plot location, size, timeline — whatever you know so far."
                    className="border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white resize-none"
                    style={{ borderColor: L.border, color: L.text }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || status === 'sending'}
                  className="rounded-2xl inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  {status === 'sending'
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                    : 'Send Enquiry'}
                </button>
                <p className="text-xs" style={{ color: L.textFaint }}>
                  Name and a valid mobile number are all we need — we&apos;ll ask the rest on the call.
                </p>
              </form>
            )}
          </div>

          {/* Right column — direct channels */}
          <div className="flex flex-col gap-5">
            {/* Book a site visit */}
            <motion.div
              className="rounded-2xl border p-8 lg:p-10 flex flex-col gap-4"
              style={{ backgroundColor: D.bg, borderColor: D.border }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div
                className="rounded-xl w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: `${BRAND_ORANGE}15`, color: BRAND_ORANGE }}
              >
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-2xl" style={{ color: D.text }}>Book a Site Visit</h2>
              <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>
                The most useful first step: we walk your plot together, talk soil, setbacks, and
                orientation — free, and without obligation.
              </p>
              <a
                href={`tel:+${PHONE_RAW}`}
                className="rounded-2xl inline-flex items-center gap-2 self-start px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                <Phone className="w-4 h-4" /> Call to Schedule
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${PHONE_RAW}?text=Hi%20Corner%20Brick%209%2C%20I%27d%20like%20to%20talk%20about%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl group border p-8 flex items-center justify-between gap-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(37,211,102,0.5)]"
              style={{ backgroundColor: L.cardBg, borderColor: L.border }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              <div>
                <h2 className="font-bold text-xl mb-1" style={{ color: L.text }}>WhatsApp the Studio</h2>
                <p className="text-sm" style={{ color: L.textMuted }}>Fastest reply during working hours.</p>
              </div>
              <div
                className="rounded-xl w-12 h-12 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
            </motion.a>

            {/* Office details */}
            <motion.div
              className="rounded-2xl border p-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
              style={{ backgroundColor: L.cardBg, borderColor: L.border }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            >
              {OFFICE.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRAND_ORANGE }} />
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: L.textFaint }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: L.text }}>{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: L.border }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
            >
              <iframe
                title="Corner Brick 9 studio location — Avadi, Chennai"
                src="https://www.google.com/maps?q=Avadi%2C+Chennai%2C+Tamil+Nadu&output=embed"
                className="w-full h-72 grayscale hover:grayscale-0 transition-all duration-700"
                style={{ border: 'none', borderRadius: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
