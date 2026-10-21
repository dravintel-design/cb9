'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock, CalendarCheck, Check, Loader2, AlertCircle, RotateCcw } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import { CONTACT, PROMISES, SERVICES } from '@/lib/site'
import PageHero from '@/components/ui/PageHero'

const D = DARK_SECTION
const L = LIGHT_SECTION
const EASE = [0.22, 1, 0.36, 1] as const

const OFFICE = [
  { icon: MapPin, label: 'Studio', value: CONTACT.area },
  { icon: Clock,  label: 'Hours',  value: CONTACT.hours },
  { icon: Phone,  label: 'Phone',  value: CONTACT.phoneDisplay, href: `tel:+${CONTACT.phoneRaw}` },
  { icon: Mail,   label: 'Email',  value: CONTACT.email, href: `mailto:${CONTACT.email}` },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Optional extras a bespoke residence commonly includes. */
const SPECIAL_REQUIREMENTS = [
  'Swimming Pool', 'Gym', 'Home Theatre', 'Bar',
  'Landscape', 'Home Office', 'Guest Suite', 'Service Areas',
] as const

const NOT_SURE = 'Not sure yet'

const BUDGET_RANGES = [
  'Under ₹2 crore',
  '₹2 to 3 crore',
  '₹3 to 5 crore',
  '₹5 crore +',
  'Not yet decided',
] as const

const START_TIMES = [
  'Within 3 months', '3 to 6 months', '6 to 12 months', 'Exploring only',
] as const

const DRAFT_KEY = 'cb9-enquiry-draft'

const INPUT =
  'rounded-2xl w-full border px-5 py-4 text-sm outline-none transition-colors focus:border-[#E8481C] bg-white'
const INPUT_STYLE = { borderColor: LIGHT_SECTION.border, color: LIGHT_SECTION.text }
const INPUT_ERROR_STYLE = { borderColor: '#C2410C', color: LIGHT_SECTION.text }

const EMPTY = {
  name: '', phone: '', plotLocation: '',
  service: NOT_SURE as string,
  siteVisit: false,
  plotSize: '', builtUpArea: '',
  budget: BUDGET_RANGES[4] as string,
  startTime: START_TIMES[3] as string,
  familySize: '',
  requirements: [] as string[],
  message: '',
  company: '', // honeypot
}
type Fields = typeof EMPTY
type Errors = Partial<Record<'name' | 'phone' | 'plotLocation', string>>

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = 'Please enter a 10-digit mobile number.'
  if (f.plotLocation.trim().length < 2) e.plotLocation = 'Please tell us where the plot is.'
  return e
}

function newSubmissionId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function Field({
  id, label, required, hint, error, children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string | undefined
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide uppercase" style={{ color: LIGHT_SECTION.textMuted }}>
        {label}
        {required
          ? <span aria-hidden="true" style={{ color: BRAND_ORANGE }}> *</span>
          : <span className="normal-case font-normal"> (optional)</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs leading-relaxed" style={{ color: LIGHT_SECTION.textFaint }}>{hint}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium flex items-center gap-1.5" style={{ color: '#C2410C' }}>
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [serverError, setServerError] = useState('')
  const submissionId = useRef('')
  // Synchronous in-flight guard: rapid clicks land before React re-renders with status 'sending'.
  const inFlight = useRef(false)
  const hydrated = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Restore an unsent draft, then apply whatever the visitor clicked to get here
  // (?service=<id>&visit=1). Read from window.location: search params are not
  // populated on a statically prerendered route.
  useEffect(() => {
    let next: Fields = EMPTY
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY)
      if (saved) next = { ...EMPTY, ...JSON.parse(saved), company: '' }
    } catch { /* storage unavailable: start clean */ }

    const q = new URLSearchParams(window.location.search)
    const svc = SERVICES.find(s => s.id === q.get('service'))
    if (svc) next = { ...next, service: svc.label }
    if (q.get('visit') === '1') next = { ...next, siteVisit: true }

    setFields(next)
    hydrated.current = true
  }, [])

  // Keep the draft so a failed send, or an accidental reload, never loses it.
  useEffect(() => {
    if (!hydrated.current || status === 'sent') return
    try {
      const { company: _hp, ...draft } = fields
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch { /* storage unavailable */ }
  }, [fields, status])

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields(f => ({ ...f, [k]: v }))
    // Editing the content makes it a new enquiry, not a retry of the last one.
    submissionId.current = ''
    if (k in errors) setErrors(e => ({ ...e, [k]: undefined }))
  }

  const toggleRequirement = (r: string) =>
    set('requirements', fields.requirements.includes(r)
      ? fields.requirements.filter(x => x !== r)
      : [...fields.requirements, r])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inFlight.current) return // repeated clicks while a send is in flight

    const found = validate(fields)
    setErrors(found)
    const first = (['name', 'phone', 'plotLocation'] as const).find(k => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus()
      return
    }

    // Same id across retries of the same content, so the server can drop duplicates.
    if (!submissionId.current) submissionId.current = newSubmissionId()
    inFlight.current = true
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, submissionId: submissionId.current }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || 'We could not send your enquiry.')
      try { sessionStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
      submissionId.current = ''
      setStatus('sent')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'We could not send your enquiry.')
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  const requestVisit = () => {
    set('siteVisit', true)
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 600)
  }

  const describedBy = (id: keyof Errors, hint?: boolean) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <>
      <PageHero
        eyebrow="Start a Project"
        lines={[
          'Tell Us About',
          <span key="l2" style={{ color: BRAND_ORANGE }}>Your Site.</span>,
        ]}
        intro="Every CB9 residence is designed for one family and one site, so the first conversation matters. The more you can tell us about your plot and how you want to live, the more useful it will be."
        meta={[...(PROMISES.replyTime ? [PROMISES.replyTime] : []), 'Request a Site Visit', 'Founder-Led Conversation']}
      />

      <section className="py-24 lg:py-32" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Enquiry form */}
          <div id="enquiry" className="scroll-mt-28">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8" style={{ color: BRAND_ORANGE }}>
              Project Enquiry
            </p>

            {status === 'sent' ? (
              <motion.div
                role="status"
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
                <h2 className="font-bold text-2xl" style={{ color: L.text }}>Thank you, your enquiry has been sent.</h2>
                <p className="text-sm leading-relaxed" style={{ color: L.textMuted }}>
                  {fields.name.split(' ')[0]}, we have your details
                  {fields.siteVisit ? ' and your request for a site visit' : ''}.
                  {' '}The studio will contact you on {`+91 ${fields.phone}`}
                  {PROMISES.replyTime ? ` (${PROMISES.replyTime.toLowerCase()})` : ''} to arrange a conversation.
                </p>
                <a
                  href={`https://wa.me/${CONTACT.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white mt-2"
                  style={{ backgroundColor: '#17793F' }}
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp the Studio
                </a>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={submit} className="flex flex-col gap-5" noValidate aria-describedby="required-note">
                <p id="required-note" className="text-xs" style={{ color: L.textMuted }}>
                  Fields marked <span style={{ color: BRAND_ORANGE }}>*</span> are required.
                </p>

                {/* Honeypot: hidden from people and assistive tech, catches bots */}
                <div className="absolute w-px h-px overflow-hidden -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" tabIndex={-1} autoComplete="off" value={fields.company} onChange={e => set('company', e.target.value)} />
                </div>

                {/* You */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label="Name" required error={errors.name}>
                    <input
                      id="name" type="text" autoComplete="name" value={fields.name}
                      onChange={e => set('name', e.target.value)}
                      aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')}
                      placeholder="Your name" className={INPUT} style={errors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    />
                  </Field>
                  <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                    <input
                      id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={fields.phone}
                      onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('phone')}
                      placeholder="10-digit mobile number" className={INPUT} style={errors.phone ? INPUT_ERROR_STYLE : INPUT_STYLE}
                    />
                  </Field>
                </div>

                {/* The plot */}
                <Field id="plotLocation" label="Plot Location" required error={errors.plotLocation}>
                  <input
                    id="plotLocation" type="text" value={fields.plotLocation}
                    onChange={e => set('plotLocation', e.target.value)}
                    aria-required="true" aria-invalid={Boolean(errors.plotLocation)} aria-describedby={describedBy('plotLocation')}
                    placeholder="Area and city" className={INPUT} style={errors.plotLocation ? INPUT_ERROR_STYLE : INPUT_STYLE}
                  />
                </Field>

                {/* Service + site visit */}
                <Field id="service" label="Service">
                  <select
                    id="service" value={fields.service}
                    onChange={e => set('service', e.target.value)}
                    className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                  >
                    {SERVICES.map(s => <option key={s.id}>{s.label}</option>)}
                    <option>{NOT_SURE}</option>
                  </select>
                </Field>

                <label
                  htmlFor="siteVisit"
                  className="rounded-2xl flex items-start gap-4 border p-5 cursor-pointer transition-colors"
                  style={{
                    borderColor: fields.siteVisit ? BRAND_ORANGE : L.border,
                    backgroundColor: fields.siteVisit ? `${BRAND_ORANGE}0a` : L.cardBg,
                  }}
                >
                  <input
                    id="siteVisit" type="checkbox" checked={fields.siteVisit}
                    onChange={e => set('siteVisit', e.target.checked)}
                    className="mt-0.5 w-5 h-5 shrink-0 accent-[#E8481C]"
                  />
                  <span>
                    <span className="block text-sm font-semibold" style={{ color: L.text }}>I would like to request a site visit</span>
                    <span className="block text-xs mt-1 leading-relaxed" style={{ color: L.textMuted }}>
                      This is a request, not a booking. We will call you to agree a date that suits you.
                    </span>
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="plotSize" label="Plot Size">
                    <input
                      id="plotSize" type="text" value={fields.plotSize}
                      onChange={e => set('plotSize', e.target.value)}
                      placeholder="e.g. 4,800 sq.ft" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                  <Field id="builtUpArea" label="Approx. Built-Up Area">
                    <input
                      id="builtUpArea" type="text" value={fields.builtUpArea}
                      onChange={e => set('builtUpArea', e.target.value)}
                      placeholder="e.g. 5,000 sq.ft" className={INPUT} style={INPUT_STYLE}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="budget" label="Total Budget" hint="Includes design fees, construction and interiors. Excludes the cost of land.">
                    <select
                      id="budget" value={fields.budget}
                      onChange={e => set('budget', e.target.value)}
                      aria-describedby="budget-hint"
                      className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                    >
                      {BUDGET_RANGES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="startTime" label="Expected Start">
                    <select
                      id="startTime" value={fields.startTime}
                      onChange={e => set('startTime', e.target.value)}
                      className={`${INPUT} appearance-none`} style={INPUT_STYLE}
                    >
                      {START_TIMES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>

                <Field id="familySize" label="Family Size / Key Users">
                  <input
                    id="familySize" type="text" value={fields.familySize}
                    onChange={e => set('familySize', e.target.value)}
                    placeholder="e.g. 2 adults, 2 children, grandparents" className={INPUT} style={INPUT_STYLE}
                  />
                </Field>

                {/* Special requirements */}
                <fieldset className="flex flex-col gap-3">
                  <legend className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: L.textMuted }}>
                    Special Requirements <span className="normal-case font-normal">(optional)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SPECIAL_REQUIREMENTS.map(r => {
                      const on = fields.requirements.includes(r)
                      return (
                        <button
                          key={r} type="button" onClick={() => toggleRequirement(r)}
                          aria-pressed={on}
                          className="rounded-xl text-xs font-semibold tracking-wide px-4 py-2 border transition-all duration-200"
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
                    onChange={e => set('message', e.target.value)}
                    placeholder="Anything else about the site, the brief, or how your family wants to live."
                    className={`${INPUT} resize-none`} style={INPUT_STYLE}
                  />
                </Field>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="rounded-2xl border p-5 flex items-start gap-3"
                    style={{ borderColor: '#C2410C55', backgroundColor: '#FFF4ED' }}
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#C2410C' }} aria-hidden="true" />
                    <div className="text-sm leading-relaxed" style={{ color: L.text }}>
                      <p className="font-semibold">{serverError}</p>
                      <p className="mt-1" style={{ color: L.textMuted }}>
                        Your details are still here. Please try again, or{' '}
                        <a className="underline font-medium" href={`https://wa.me/${CONTACT.whatsappRaw}`} target="_blank" rel="noopener noreferrer">
                          message us on WhatsApp
                        </a>.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-disabled={status === 'sending'}
                  className="rounded-2xl inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase text-white transition-all disabled:opacity-60 disabled:cursor-wait"
                  style={{ backgroundColor: BRAND_ORANGE }}
                >
                  {status === 'sending' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending</>
                  ) : status === 'error' ? (
                    <><RotateCcw className="w-4 h-4" aria-hidden="true" /> Try Again</>
                  ) : fields.siteVisit ? 'Request a Site Visit' : 'Send Enquiry'}
                </button>
                <p className="text-xs leading-relaxed" style={{ color: L.textFaint }}>
                  Name, phone and plot location are all we need to begin. The rest helps us prepare
                  properly for the first conversation. See how we handle your details in our{' '}
                  <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>

          {/* Right column, direct channels */}
          <div className="flex flex-col gap-5">
            {/* Request a site visit */}
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
              <h2 className="font-bold text-2xl" style={{ color: D.text }}>Request a Site Visit</h2>
              <p className="text-sm leading-relaxed" style={{ color: D.textMuted }}>
                A useful first step: we walk your plot together and talk through soil, setbacks and
                orientation. Send a request and we will call you to agree a date.
              </p>
              <button
                type="button"
                onClick={requestVisit}
                className="rounded-2xl inline-flex items-center gap-2 self-start px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                <CalendarCheck className="w-4 h-4" /> Request a Site Visit
              </button>
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${CONTACT.whatsappRaw}?text=Hi%20Corner%20Brick%209%2C%20I%27d%20like%20to%20talk%20about%20a%20project.`}
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
                <p className="text-sm" style={{ color: L.textMuted }}>Message us during working hours.</p>
              </div>
              <div
                className="rounded-xl w-12 h-12 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: '#17793F' }}
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
              {OFFICE.map(o => {
                const Icon = o.icon
                return (
                  <div key={o.label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: L.textFaint }}>
                        {o.label}
                      </p>
                      {'href' in o ? (
                        <a href={o.href} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: L.text }}>{o.value}</a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: L.text }}>{o.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* Map, only once the exact office pin is confirmed */}
            {CONTACT.mapQuery ? (
              <motion.div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: L.border }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
              >
                <iframe
                  title={`Corner Brick 9 studio location, ${CONTACT.area}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`}
                  className="w-full h-72"
                  style={{ border: 'none', borderRadius: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            ) : (
              <div className="rounded-2xl border p-8 flex items-start gap-4" style={{ backgroundColor: L.bgDeep, borderColor: L.border }}>
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                <div>
                  <h2 className="font-bold text-lg" style={{ color: L.text }}>Studio visits by appointment</h2>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: L.textMuted }}>
                    Please call or send an enquiry first, and we will share directions with your appointment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
