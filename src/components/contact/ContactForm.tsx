'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { BRAND_ORANGE, LIGHT_SECTION, DARK_SECTION } from '@/lib/utils'

const TL = LIGHT_SECTION
const TD = DARK_SECTION

const AREAS = [
  'Avadi',
  'Thiruvallur',
  'Thirunindravur',
  'Pattibiram',
  'Veppampattu',
  'Perumal Pattu',
  'Other — I will specify in my message',
] as const

const PROJECT_TYPES = [
  'New Construction (Ground-up build)',
  'Renovation & Remodeling',
  'Structural Engineering Consultation',
  'Residential Design Only',
  'General Consultation — Not Sure Yet',
] as const

type FieldState = { value: string; touched: boolean; error: string }

type FormFields = {
  name: FieldState
  phone: FieldState
  email: FieldState
  area: FieldState
  projectType: FieldState
  plotSize: FieldState
  message: FieldState
}

function makeField(value = ''): FieldState {
  return { value, touched: false, error: '' }
}

function validate(fields: FormFields): Record<string, string> {
  const errs: Record<string, string> = {}
  if (!fields.name.value.trim()) errs.name = 'Your name is required.'
  if (!fields.phone.value.trim()) {
    errs.phone = 'A phone number is required — Sathish will call you directly.'
  } else if (!/^[6-9]\d{9}$/.test(fields.phone.value.replace(/\s/g, ''))) {
    errs.phone = 'Enter a valid 10-digit Indian mobile number.'
  }
  if (fields.email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value)) {
    errs.email = 'Enter a valid email address.'
  }
  if (!fields.area.value) errs.area = 'Please select your location.'
  if (!fields.projectType.value) errs.projectType = 'Please select a project type.'
  return errs
}

export default function ContactForm() {

  const [fields, setFields] = useState<FormFields>({
    name:        makeField(),
    phone:       makeField(),
    email:       makeField(),
    area:        makeField(),
    projectType: makeField(),
    plotSize:    makeField(),
    message:     makeField(),
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function update(key: keyof typeof fields, value: string) {
    setFields(f => ({ ...f, [key]: { ...f[key], value, touched: true, error: '' } }))
  }

  function touch(key: keyof typeof fields) {
    const errs = validate(fields)
    setFields(f => ({ ...f, [key]: { ...f[key], touched: true, error: errs[key] ?? '' } }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(fields)
    // Mark all touched with errors
    setFields(f => {
      const next = { ...f }
      for (const k of Object.keys(next) as (keyof typeof next)[]) {
        next[k] = { ...next[k], touched: true, error: errs[k] ?? '' }
      }
      return next
    })
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    // Simulate network — replace with actual API call
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const inputBase = {
    backgroundColor: TL.cardBg,
    borderColor: TL.border,
    color: TL.text,
  }

  const inputClass =
    'w-full border px-4 py-3.5 text-sm outline-none transition-all duration-200 placeholder:text-sm'

  function Field({
    id,
    label,
    required,
    children,
  }: {
    id: keyof typeof fields
    label: string
    required?: boolean
    children: React.ReactNode
  }) {
    const f = fields[id]
    const hasError = f.touched && f.error
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="text-xs font-semibold tracking-[0.16em] uppercase"
          style={{ color: TL.textMuted }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: BRAND_ORANGE }}>*</span>
          )}
        </label>
        {children}
        <AnimatePresence>
          {hasError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs"
              style={{ color: '#d03d14' }}
            >
              {f.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section className="py-0" style={{ backgroundColor: TL.bg }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 lg:gap-16 items-start">

          {/* ── LEFT — FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            className="py-16 lg:py-24"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border p-10 flex flex-col gap-6"
                  style={{ backgroundColor: TL.cardBg, borderColor: TL.border }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: `${BRAND_ORANGE}12` }}
                  >
                    <CheckCircle2 className="w-6 h-6" style={{ color: BRAND_ORANGE }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl mb-3" style={{ color: TL.text }}>
                      Message received.
                    </h2>
                    <p className="text-base leading-relaxed" style={{ color: TL.textMuted }}>
                      Sathish will review your project details and reach out within 24 hours — usually sooner. If you need to speak today, call directly.
                    </p>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: BRAND_ORANGE }}
                  >
                    <Phone className="w-4 h-4" />
                    Call Sathish directly
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
                      style={{ color: BRAND_ORANGE }}
                    >
                      Project Enquiry
                    </p>
                    <h2
                      className="font-bold leading-tight"
                      style={{ color: TL.text, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                    >
                      Tell Us About
                      <br />
                      <span style={{ color: BRAND_ORANGE }}>Your Home.</span>
                    </h2>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="name" label="Full Name" required>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. R. Venkataraman"
                        value={fields.name.value}
                        onChange={e => update('name', e.target.value)}
                        onBlur={() => touch('name')}
                        className={inputClass}
                        style={{
                          ...inputBase,
                          borderColor: fields.name.touched && fields.name.error
                            ? '#d03d14'
                            : TL.border,
                        }}
                      />
                    </Field>
                    <Field id="phone" label="Phone Number" required>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="98765 43210"
                        value={fields.phone.value}
                        onChange={e => update('phone', e.target.value)}
                        onBlur={() => touch('phone')}
                        className={inputClass}
                        style={{
                          ...inputBase,
                          borderColor: fields.phone.touched && fields.phone.error
                            ? '#d03d14'
                            : TL.border,
                        }}
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field id="email" label="Email Address">
                    <input
                      id="email"
                      type="email"
                      placeholder="optional — phone is enough"
                      value={fields.email.value}
                      onChange={e => update('email', e.target.value)}
                      onBlur={() => touch('email')}
                      className={inputClass}
                      style={{
                        ...inputBase,
                        borderColor: fields.email.touched && fields.email.error
                          ? '#d03d14'
                          : TL.border,
                      }}
                    />
                  </Field>

                  {/* Area + Project type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="area" label="Your Location" required>
                      <select
                        id="area"
                        value={fields.area.value}
                        onChange={e => update('area', e.target.value)}
                        onBlur={() => touch('area')}
                        className={inputClass}
                        style={{
                          ...inputBase,
                          borderColor: fields.area.touched && fields.area.error
                            ? '#d03d14'
                            : TL.border,
                          appearance: 'none',
                        }}
                      >
                        <option value="">Select area…</option>
                        {AREAS.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="projectType" label="Project Type" required>
                      <select
                        id="projectType"
                        value={fields.projectType.value}
                        onChange={e => update('projectType', e.target.value)}
                        onBlur={() => touch('projectType')}
                        className={inputClass}
                        style={{
                          ...inputBase,
                          borderColor: fields.projectType.touched && fields.projectType.error
                            ? '#d03d14'
                            : TL.border,
                          appearance: 'none',
                        }}
                      >
                        <option value="">Select type…</option>
                        {PROJECT_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Plot size */}
                  <Field id="plotSize" label="Plot / Built-up Area (optional)">
                    <input
                      id="plotSize"
                      type="text"
                      placeholder="e.g. 1,200 sq.ft plot, planning G+1"
                      value={fields.plotSize.value}
                      onChange={e => update('plotSize', e.target.value)}
                      className={inputClass}
                      style={inputBase}
                    />
                  </Field>

                  {/* Message */}
                  <Field id="message" label="Anything Else Sathish Should Know">
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Budget range, timeline, specific concerns, or anything else on your mind…"
                      value={fields.message.value}
                      onChange={e => update('message', e.target.value)}
                      className={inputClass}
                      style={{ ...inputBase, resize: 'vertical' }}
                    />
                  </Field>

                  {/* Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ backgroundColor: BRAND_ORANGE }}
                      onMouseEnter={e => {
                        if (!submitting) e.currentTarget.style.backgroundColor = '#D03D14'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = BRAND_ORANGE
                      }}
                    >
                      {submitting ? (
                        <>
                          <span
                            className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-3.5 h-3.5" />
                          Send Enquiry
                        </>
                      )}
                    </button>
                    <p className="text-xs" style={{ color: TL.textFaint }}>
                      Sathish responds personally — usually same day.
                    </p>
                  </div>

                  {/* Data note */}
                  <p className="text-[10px] leading-relaxed" style={{ color: TL.textFaint }}>
                    Your contact details are used only to respond to this enquiry. We do not share or sell personal information.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT — CONTACT DETAILS ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="py-16 lg:py-24 flex flex-col gap-8"
          >

            {/* What to expect block */}
            <div
              className="border flex flex-col"
              style={{ backgroundColor: TD.cardBg, borderColor: TD.border }}
            >
              <div
                className="px-7 py-5 border-b"
                style={{ borderColor: TD.border }}
              >
                <p
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: BRAND_ORANGE }}
                >
                  What Happens Next
                </p>
              </div>
              {[
                { step: '01', title: 'Review within 24 hrs', body: 'Sathish reads every enquiry himself. Expect a personal call or WhatsApp — not an automated reply.' },
                { step: '02', title: 'Free site visit', body: 'He visits your plot at no charge to understand the soil, boundaries, and what the build will actually require.' },
                { step: '03', title: 'Honest cost estimate', body: 'You receive an itemised estimate — material by material, stage by stage — before any commitment is asked.' },
              ].map(({ step, title, body }, i, arr) => (
                <div
                  key={step}
                  className="flex gap-5 px-7 py-6 border-b last:border-0"
                  style={{ borderColor: TD.border }}
                >
                  <span
                    className="font-bold text-2xl tabular-nums leading-none shrink-0 pt-0.5"
                    style={{ color: `${BRAND_ORANGE}30` }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-sm mb-1.5" style={{ color: TD.text }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: TD.textMuted }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div
              className="border flex flex-col"
              style={{ backgroundColor: TL.cardBg, borderColor: TL.border }}
            >
              <div
                className="px-7 py-5 border-b"
                style={{ borderColor: TL.border }}
              >
                <p
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: BRAND_ORANGE }}
                >
                  Reach Sathish Directly
                </p>
              </div>
              <div className="flex flex-col">
                {[
                  {
                    icon: Phone,
                    label: 'Phone / WhatsApp',
                    value: '+91 98765 43210',
                    href: 'tel:+919876543210',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'sathish@cornerbrick9.com',
                    href: 'mailto:sathish@cornerbrick9.com',
                  },
                  {
                    icon: MapPin,
                    label: 'Service Areas',
                    value: 'Avadi · Thiruvallur · Pattibiram · Thirunindravur',
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 px-7 py-5 border-b last:border-0"
                    style={{ borderColor: TL.border }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${BRAND_ORANGE}12` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: BRAND_ORANGE }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: TL.textFaint }}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-semibold transition-colors"
                          style={{ color: TL.text }}
                          onMouseEnter={e => (e.currentTarget.style.color = BRAND_ORANGE)}
                          onMouseLeave={e => (e.currentTarget.style.color = TL.text)}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm" style={{ color: TL.textMuted }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ nudge */}
            <div
              className="border px-7 py-6 flex items-start justify-between gap-4"
              style={{ borderColor: TL.border, backgroundColor: TL.cardBg }}
            >
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: TL.text }}>
                  Have questions first?
                </p>
                <p className="text-xs leading-relaxed" style={{ color: TL.textFaint }}>
                  Read the most common homeowner questions — pricing, timeline, IS testing, and permits — answered in full.
                </p>
              </div>
              <Link
                href="/services#faq"
                className="shrink-0 text-[10px] font-semibold tracking-[0.18em] uppercase px-4 py-2 border transition-all"
                style={{ color: BRAND_ORANGE, borderColor: `${BRAND_ORANGE}35` }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${BRAND_ORANGE}10`)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Read FAQ
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
