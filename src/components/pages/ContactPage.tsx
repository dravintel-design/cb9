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
  { icon: MapPin, label: 'Studio',  value: 'Avadi, Chennai, Tamil Nadu' },
  { icon: Clock,  label: 'Hours',   value: 'Mon to Sat · 9:30 AM to 6:30 PM' },
  { icon: Phone,  label: 'Phone',   value: PHONE_DISPLAY },
  { icon: Mail,   label: 'Email',   value: EMAIL },
] as const

type Status = 'idle' | 'sending' | 'sent'

/** Optional extras a bespoke residence commonly includes. */
const SPECIAL_REQUIREMENTS = [
  'Swimming Pool', 'Gym', 'Home Theatre', 'Bar',
  'Landscape', 'Home Office', 'Guest Suite', 'Service Areas',
] as const

const PROJECT_TYPES = [
  'New Bespoke Residence',
  'Full Interior',
  'Concept / Feasibility Study',
] as const

const INVESTMENT_RANGES = [
  'Under ₹2 crore',
  '₹2 to 3 crore',
  '₹3 to 5 crore',
  '₹5 crore +',
  'Not yet decided',
] as const

const START_TIMES = [
  'Within 3 months', '3 to 6 months', '6 to 12 months', 'Exploring only',
] as const

const INPUT =
  'w-full border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white'
const INPUT_STYLE = { borderColor: LIGHT_SECTION.border, color: LIGHT_SECTION.text }

function Field({
  id, label, required, children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide uppercase" style={{ color: LIGHT_SECTION.textMuted }}>
        {label}
        {!required && <span className="normal-case font-normal"> (optional)</span>}
      </label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState({
    name: '', phone: '',
    plotLocation: '', plotSize: '', builtUpArea: '',
    projectType: PROJECT_TYPES[0] as string,
    investment: INVESTMENT_RANGES[4] as string,
    startTime: START_TIMES[3] as string,
    familySize: '',
    requirements: [] as string[],
    message: '',
  })

  const toggleRequirement = (r: string) =>
    setFields(f => ({
      ...f,
      requirements: f.requirements.includes(r)
        ? f.requirements.filter(x => x !== r)
        : [...f.requirements, r],
    }))

  const canSubmit =
    fields.name.trim().length >= 2 &&
    /^[6-9]\d{9}$/.test(fields.phone.trim()) &&
    fields.plotLocation.trim().length >= 2

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
        eyebrow="Start a Project"
        lines={[
          'Tell Us About',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Your Site.</span>,
        ]}
        intro="Every CB9 residence is designed from scratch for one family and one site, so the first conversation matters. The more you can tell us about your plot and how you want to live, the more useful it will be."
        meta={['Reply within 24 hours', 'Initial Site Discussion', 'Founder-Led Conversation']}
      />

      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Qualification form */}
          <div>
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8" style={{ color: BRAND_ORANGE }}>
              Project Enquiry
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
                {/* You */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label="Name" required>
                    <input
                      id="name" type="text" value={fields.name}
                      onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                  <Field id="phone" label="Phone / WhatsApp" required>
                    <input
                      id="phone" type="tel" inputMode="numeric" value={fields.phone}
                      onChange={e => setFields(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      placeholder="10-digit mobile number" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                </div>

                {/* The plot */}
                <Field id="plotLocation" label="Plot Location" required>
                  <input
                    id="plotLocation" type="text" value={fields.plotLocation}
                    onChange={e => setFields(f => ({ ...f, plotLocation: e.target.value }))}
                    placeholder="Area, city, e.g. Thiruvallur, Chennai" className={INPUT} style={INPUT_STYLE}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="plotSize" label="Plot Size">
                    <input
                      id="plotSize" type="text" value={fields.plotSize}
                      onChange={e => setFields(f => ({ ...f, plotSize: e.target.value }))}
                      placeholder="e.g. 4,800 sq.ft" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                  <Field id="builtUpArea" label="Approx. Built-Up Area">
                    <input
                      id="builtUpArea" type="text" value={fields.builtUpArea}
                      onChange={e => setFields(f => ({ ...f, builtUpArea: e.target.value }))}
                      placeholder="e.g. 5,000 sq.ft" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                </div>

                {/* The project */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="projectType" label="Project Type">
                    <select
                      id="projectType" value={fields.projectType}
                      onChange={e => setFields(f => ({ ...f, projectType: e.target.value }))}
                      className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                    >
                      {PROJECT_TYPES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="investment" label="Investment Range">
                    <select
                      id="investment" value={fields.investment}
                      onChange={e => setFields(f => ({ ...f, investment: e.target.value }))}
                      className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                    >
                      {INVESTMENT_RANGES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="startTime" label="Expected Start">
                    <select
                      id="startTime" value={fields.startTime}
                      onChange={e => setFields(f => ({ ...f, startTime: e.target.value }))}
                      className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                    >
                      {START_TIMES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="familySize" label="Family Size / Key Users">
                    <input
                      id="familySize" type="text" value={fields.familySize}
                      onChange={e => setFields(f => ({ ...f, familySize: e.target.value }))}
                      placeholder="e.g. 2 adults, 2 children, grandparents" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                </div>

                {/* Special requirements */}
                <fieldset className="flex flex-col gap-3">
                  <legend className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: L.textMuted }}>
                    Special Requirements
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SPECIAL_REQUIREMENTS.map(r => {
                      const on = fields.requirements.includes(r)
                      return (
                        <button
                          key={r} type="button" onClick={() => toggleRequirement(r)}
                          aria-pressed={on}
                          className="rounded-xl text-[11px] font-semibold tracking-wide px-4 py-2 border transition-all duration-200"
                          style={{
                            backgroundColor: on ? BRAND_ORANGE : 'transparent',
                            color: on ? '#ffffff' : L.textMuted,
                            borderColor: on ? BRAND_ORANGE : L.border,
                          }}
                        >
                          {r}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <Field id="message" label="Additional Notes">
                  <textarea
                    id="message" rows={4} value={fields.message}
                    onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    placeholder="Anything else about the site, the brief, or how your family wants to live."
                    className={`${INPUT} resize-none`} style={INPUT_STYLE}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={!canSubmit || status === 'sending'}
                  className="rounded-2xl inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  {status === 'sending'
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                    : 'Start a Project'}
                </button>
                <p className="text-xs" style={{ color: L.textFaint }}>
                  Name, phone and plot location are all we need to begin. The rest helps us prepare
                  properly for the first conversation.
                </p>
              </form>
            )}
          </div>

          {/* Right column, direct channels */}
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
                orientation, free, and without obligation.
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
                title="Corner Brick 9 studio location, Avadi, Chennai"
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
