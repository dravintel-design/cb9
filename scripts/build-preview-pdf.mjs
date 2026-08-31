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
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { launchChrome, mergePdfs, sleep } from './lib/chrome.mjs'

const BASE = process.env.BASE ?? 'http://localhost:3000'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'preview')
const OUT = join(OUT_DIR, 'cb9-website-pages.pdf')

const WIDTH = 1440
const CSS_PX_PER_IN = 96
const MAX_IN = 190 // PDF boxes cap at 200in; leave headroom.

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

async function capture(chrome, route) {
  const { session: s, dispose } = await chrome.newTab()

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
    await dispose()
  }
}

async function main() {
  const probe = await fetch(BASE).catch(() => null)
  if (!probe?.ok) {
    console.error(`No server responding at ${BASE} — start one first (npm run dev).`)
    process.exit(1)
  }

  const chrome = await launchChrome()

  try {
    mkdirSync(OUT_DIR, { recursive: true })
    console.log(`Capturing ${ROUTES.length} pages from ${BASE}  (one sheet each)`)

    // Each page is written as its own file for page-by-page review, then
    // merged into a single document for whoever wants the whole set.
    const parts = []
    for (const route of ROUTES) {
      const pdf = await capture(chrome, route)
      const n = String(parts.length + 1).padStart(2, '0')
      const slug = route.path === '' ? 'home' : route.path
      const f = join(OUT_DIR, `${n}-${slug}.pdf`)
      writeFileSync(f, pdf)
      parts.push(f)
    }

    console.log('Merging')
    const pageCount = await mergePdfs(OUT, parts)
    console.log(`  ${OUT}  (${pageCount} pages)`)

    console.log('\nDone.')
    console.log(`  Combined:     ${BASE}/preview/cb9-website-pages.pdf`)
    console.log('  Page by page:')
    for (const f of parts) {
      console.log(`    ${BASE}/preview/${f.split('/').pop()}`)
    }
  } finally {
    chrome.close()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
