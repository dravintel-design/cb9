import { NextResponse } from 'next/server'
import { SERVICES } from '@/lib/site'

/**
 * Project enquiries. Delivery is configured entirely through environment
 * variables, so no credentials live in the repository:
 *
 *   RESEND_API_KEY + ENQUIRY_TO_EMAIL   email each enquiry to the studio (Resend)
 *   ENQUIRY_FROM_EMAIL                  optional verified sender, defaults to Resend's test sender
 *   ENQUIRY_WEBHOOK_URL                 and/or POST it as JSON (Zapier, Make, a Google Sheet script)
 *
 * With neither configured the route answers 503 rather than pretending to
 * succeed, so the form shows its failure state and keeps the customer's details.
 */

export const runtime = 'nodejs'

const SERVICE_LABELS = new Set<string>(SERVICES.map(s => s.label))
const MAX = { short: 120, long: 2000 }

/** Recently seen submission ids. Best effort per server instance; the form also guards repeats. */
const seen = new Map<string, number>()
const SEEN_TTL_MS = 10 * 60 * 1000

function remember(id: string) {
  const now = Date.now()
  for (const [k, t] of seen) if (now - t > SEEN_TTL_MS) seen.delete(k)
  if (seen.has(id)) return false
  seen.set(id, now)
  return true
}

type Enquiry = {
  submissionId: string
  name: string
  phone: string
  plotLocation: string
  service: string
  siteVisit: boolean
  plotSize: string
  builtUpArea: string
  budget: string
  startTime: string
  familySize: string
  requirements: string[]
  message: string
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function parse(body: Record<string, unknown>): { data?: Enquiry; errors?: Record<string, string> } {
  const data: Enquiry = {
    submissionId: str(body.submissionId, 64),
    name: str(body.name, MAX.short),
    phone: str(body.phone, 15).replace(/\D/g, ''),
    plotLocation: str(body.plotLocation, MAX.short),
    service: str(body.service, MAX.short),
    siteVisit: body.siteVisit === true,
    plotSize: str(body.plotSize, MAX.short),
    builtUpArea: str(body.builtUpArea, MAX.short),
    budget: str(body.budget, MAX.short),
    startTime: str(body.startTime, MAX.short),
    familySize: str(body.familySize, MAX.short),
    requirements: Array.isArray(body.requirements)
      ? body.requirements.filter((r): r is string => typeof r === 'string').slice(0, 20).map(r => r.slice(0, 60))
      : [],
    message: str(body.message, MAX.long),
  }
  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(data.phone)) errors.phone = 'Please enter a 10-digit mobile number.'
  if (data.plotLocation.length < 2) errors.plotLocation = 'Please tell us where the plot is.'
  if (data.service && !SERVICE_LABELS.has(data.service) && data.service !== 'Not sure yet') errors.service = 'Please choose a service.'
  if (!data.submissionId) errors.form = 'Missing submission id.'
  return Object.keys(errors).length ? { errors } : { data }
}

function asText(e: Enquiry) {
  const rows: [string, string][] = [
    ['Name', e.name],
    ['Phone / WhatsApp', `+91 ${e.phone}`],
    ['Plot location', e.plotLocation],
    ['Service', e.service || 'Not specified'],
    ['Site visit requested', e.siteVisit ? 'Yes' : 'No'],
    ['Plot size', e.plotSize],
    ['Built-up area', e.builtUpArea],
    ['Budget', e.budget],
    ['Expected start', e.startTime],
    ['Family / key users', e.familySize],
    ['Special requirements', e.requirements.join(', ')],
    ['Notes', e.message],
  ]
  return rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n')
}

async function deliver(e: Enquiry): Promise<boolean> {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL, ENQUIRY_WEBHOOK_URL } = process.env
  const jobs: Promise<boolean>[] = []

  if (RESEND_API_KEY && ENQUIRY_TO_EMAIL) {
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: ENQUIRY_FROM_EMAIL || 'Corner Brick 9 Website <onboarding@resend.dev>',
          to: ENQUIRY_TO_EMAIL.split(',').map(s => s.trim()),
          subject: `${e.siteVisit ? 'Site visit request' : 'New enquiry'}: ${e.name}, ${e.plotLocation}`,
          text: asText(e),
        }),
      }).then(r => r.ok),
    )
  }
  if (ENQUIRY_WEBHOOK_URL) {
    jobs.push(
      fetch(ENQUIRY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...e, receivedAt: new Date().toISOString() }),
      }).then(r => r.ok),
    )
  }
  if (jobs.length === 0) return false
  const results = await Promise.allSettled(jobs)
  // Delivered if any configured channel accepted it.
  return results.some(r => r.status === 'fulfilled' && r.value)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field.
  if (str(body.company, MAX.short)) return NextResponse.json({ ok: true })

  const { data, errors } = parse(body)
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 })

  // A repeated click or retry of an enquiry that already went through.
  if (!remember(data.submissionId)) return NextResponse.json({ ok: true, duplicate: true })

  const configured = Boolean(
    (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) || process.env.ENQUIRY_WEBHOOK_URL,
  )

  if (!configured) {
    seen.delete(data.submissionId)
    if (process.env.NODE_ENV !== 'production') {
      // Local development only: lets the form be exercised end to end without credentials.
      // eslint-disable-next-line no-console
      console.info('[enquiry] delivery not configured; local submission:\n' + asText(data))
      return NextResponse.json({ ok: true, delivered: false })
    }
    return NextResponse.json({ ok: false, error: 'Enquiries are not connected yet.' }, { status: 503 })
  }

  const ok = await deliver(data).catch(() => false)
  if (!ok) {
    // Allow the customer's retry to go through.
    seen.delete(data.submissionId)
    return NextResponse.json({ ok: false, error: 'We could not send your enquiry.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
