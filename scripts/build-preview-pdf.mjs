/**
 * Builds a client-approval PDF of every Corner Brick 9 page —
 * one site page per PDF sheet, in navigation order.
 *
 * Pages render with ?print=1, which forces scroll-animated content to its
 * resting visible state and unpins the scroll-driven sections; without it
 * the capture comes out blank or half-built.
 *
 * Chrome's `--print-to-pdf` CLI flag always paginates to Letter (it gives no
 * way to set `preferCSSPageSize`), so this drives Chrome over the DevTools
 * Protocol instead and passes the measured document height as the paper
 * height. Output stays vector, so text is selectable and the file is small.
 *
 * Usage:  npm run preview:pdf
 *         BASE=http://localhost:3001 node scripts/build-preview-pdf.mjs
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.BASE ?? 'http://localhost:3000'
const CHROME =
  process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'preview')
const OUT = join(OUT_DIR, 'cb9-website-pages.pdf')

const WIDTH = 1440
const CSS_PX_PER_IN = 96
const MAX_IN = 190 // PDF boxes cap at 200in; leave headroom.
// Randomised so a Chrome left over from an interrupted run can't block us.
const PORT = 9300 + Math.floor(Math.random() * 400)

const ROUTES = [
  { path: '', label: 'Home' },
  { path: 'about', label: 'About' },
  { path: 'projects', label: 'Projects' },
  { path: 'design-process', label: 'Design Process' },
  { path: 'build-process', label: 'Build Process' },
  { path: 'services', label: 'Services' },
  { path: 'materials', label: 'Materials & Craft' },
  { path: 'journal', label: 'Journal' },
  { path: 'contact', label: 'Contact' },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

/** Minimal CDP client over a page target's WebSocket. */
class Session {
  #ws
  #id = 0
  #pending = new Map()
  #listeners = new Map()

  static async open(wsUrl) {
    const s = new Session()
    s.#ws = new WebSocket(wsUrl)
    await new Promise((res, rej) => {
      s.#ws.addEventListener('open', res, { once: true })
      s.#ws.addEventListener('error', rej, { once: true })
    })
    s.#ws.addEventListener('message', e => {
      const msg = JSON.parse(e.data)
      if (msg.id !== undefined) {
        const p = s.#pending.get(msg.id)
        if (!p) return
        s.#pending.delete(msg.id)
        msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result)
      } else {
        s.#listeners.get(msg.method)?.forEach(fn => fn(msg.params))
      }
    })
    return s
  }

  send(method, params = {}) {
    const id = ++this.#id
    this.#ws.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject }))
  }

  once(method) {
    return new Promise(resolve => {
      const list = this.#listeners.get(method) ?? []
      const fn = p => {
        this.#listeners.set(method, (this.#listeners.get(method) ?? []).filter(f => f !== fn))
        resolve(p)
      }
      this.#listeners.set(method, [...list, fn])
    })
  }

  close() {
    this.#ws.close()
  }
}

async function waitForChrome() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (r.ok) return
    } catch {}
    await sleep(250)
  }
  throw new Error('Chrome did not expose a debugging port')
}

async function capture(route) {
  // Fresh tab per page keeps state from bleeding between captures.
  const created = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })
  const target = await created.json()
  const s = await Session.open(target.webSocketDebuggerUrl)

  try {
    await s.send('Page.enable')
    await s.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })

    const loaded = s.once('Page.loadEventFired')
    await s.send('Page.navigate', { url: `${BASE}/${route.path}?print=1` })
    await loaded
    // Let fonts settle and the print-mode effect publish the height.
    await sleep(2500)

    const { result } = await s.send('Runtime.evaluate', {
      expression: `Math.ceil(Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ))`,
      returnByValue: true,
    })
    const heightPx = result.value

    let wIn = WIDTH / CSS_PX_PER_IN
    let hIn = heightPx / CSS_PX_PER_IN
    if (hIn > MAX_IN) {
      const k = MAX_IN / hIn
      wIn *= k
      hIn = MAX_IN
      console.warn(`     ${route.label} is very tall; scaled to fit one sheet`)
    }

    const { data } = await s.send('Page.printToPDF', {
      printBackground: true,
      paperWidth: wIn,
      paperHeight: hIn,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      pageRanges: '1',
      scale: 1,
    })
    console.log(`  -> ${route.label.padEnd(16)} ${WIDTH}x${heightPx}`)
    return Buffer.from(data, 'base64')
  } finally {
    s.close()
    await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`).catch(() => {})
  }
}

async function main() {
  const probe = await fetch(BASE).catch(() => null)
  if (!probe?.ok) {
    console.error(`No server responding at ${BASE} — start one first (npm run dev).`)
    process.exit(1)
  }

  const profile = mkdtempSync(join(tmpdir(), 'cb9-pdf-'))
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { stdio: 'ignore' })

  // Chrome needs a moment to release its profile lock before the directory
  // will delete; retry briefly rather than failing after a good build.
  const cleanup = () => {
    chrome.kill()
    for (let i = 0; i < 20; i++) {
      try {
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
        return
      } catch {
        /* keep trying */
      }
    }
  }
  process.on('exit', cleanup)

  try {
    await waitForChrome()
    mkdirSync(OUT_DIR, { recursive: true })
    console.log(`Capturing ${ROUTES.length} pages from ${BASE}  (one sheet each)`)

    const parts = []
    for (const route of ROUTES) {
      const pdf = await capture(route)
      const f = join(profile, `${parts.length}.pdf`)
      writeFileSync(f, pdf)
      parts.push(f)
    }

    console.log('Merging')
    const merge = spawn('python3', ['-c', `
import sys
from pypdf import PdfWriter
out, *parts = sys.argv[1:]
w = PdfWriter()
for p in parts:
    w.append(p)
with open(out, 'wb') as f:
    w.write(f)
print(f"  {out}  ({len(w.pages)} pages)")
`, OUT, ...parts], { stdio: 'inherit' })
    await new Promise((res, rej) =>
      merge.on('exit', c => (c === 0 ? res() : rej(new Error('merge failed'))))
    )

    console.log(`\nDone. Open: ${BASE}/preview/cb9-website-pages.pdf`)
  } finally {
    cleanup()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
