/**
 * Builds the Corner Brick 9 client-approval deck — a single PDF containing
 * a cover, a contents sheet, and every page of the site rendered in full.
 *
 * Pages render with ?print=1, which forces scroll-animated content to its
 * resting visible state and unpins the scroll-driven sections; without it
 * the capture comes out blank or half-built.
 *
 * The per-page label band is composed onto each sheet in the PDF layer
 * rather than injected into the DOM: adding nodes to the live page knocked
 * the site's own fixed header out of its styling, so pages are captured
 * pristine and stamped afterwards. Everything stays vector, so text remains
 * selectable and the file stays small.
 *
 * Usage:  npm run approval:deck
 *         BASE=http://localhost:3001 node scripts/build-approval-deck.mjs
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { launchChrome, mergePdfs, sleep } from './lib/chrome.mjs'

const BASE = process.env.BASE ?? 'http://localhost:3000'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'preview')
const WORK_DIR = join(OUT_DIR, '_deck')
const OUT = join(OUT_DIR, 'cb9-design-approval.pdf')

const WIDTH = 1440
const HEADER_H = 150
const CSS_PX_PER_IN = 96
const MAX_IN = 190 // PDF boxes cap at 200in; leave headroom.

const ORANGE = '#E8481C'
const INK = '#0d0d0d'

const PAGES = [
  { path: '',               name: 'Home',              note: 'Studio positioning, philosophy, selected work and the enquiry route.' },
  { path: 'about',          name: 'The Studio',        note: 'Vision, design philosophy, founder, team model and core values.' },
  { path: 'projects',       name: 'Projects',          note: 'Built work and clearly labelled concept residences.' },
  { path: 'design-process', name: 'Design Process',    note: 'Eleven stages from discovery to handover, plus the Design DNA.' },
  { path: 'build-process',  name: 'Build Process',     note: 'Twelve construction stages with the quality record at each step.' },
  { path: 'services',       name: 'Services',          note: 'Bespoke residential design + build, and the disciplines behind it.' },
  { path: 'materials',      name: 'Materials & Craft', note: 'Eight curated material families and the specification standard.' },
  { path: 'journal',        name: 'Journal',           note: 'Architecture, engineering and site-story writing.' },
  { path: 'contact',        name: 'Start a Project',   note: 'Qualification enquiry, site visit booking and studio details.' },
]

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`

/** Standalone label band, printed separately and stamped onto the page. */
function headerHtml(index, total, name, route, note) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONT_LINK}
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${WIDTH}px;height:${HEADER_H}px;overflow:hidden}
  body{font-family:Inter,-apple-system,Helvetica,Arial,sans-serif;background:${INK};
       -webkit-print-color-adjust:exact;print-color-adjust:exact;
       border-bottom:3px solid ${ORANGE};display:flex;align-items:center;
       justify-content:space-between;padding:0 56px}
  .n{font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:${ORANGE}}
  .nm{font-size:32px;font-weight:700;color:#fff;margin-top:6px;letter-spacing:-.01em}
  .nt{font-size:13px;color:rgba(255,255,255,.5);margin-top:6px}
  .r{text-align:right}
  .r .b{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.42)}
  .r .s{font-size:11px;color:rgba(255,255,255,.32);margin-top:5px}
  .r .p{display:inline-block;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;
        color:${ORANGE};margin-top:9px;padding:5px 12px;border:1px solid rgba(232,72,28,.45);border-radius:8px}
</style></head><body>
  <div>
    <div class="n">${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}</div>
    <div class="nm">${esc(name)}</div>
    <div class="nt">${esc(note)}</div>
  </div>
  <div class="r">
    <div class="b">Corner Brick 9</div>
    <div class="s">Website Design · For Approval</div>
    <div class="p">${esc(route)}</div>
  </div>
</body></html>`
}

function coverHtml() {
  const rows = PAGES.map((p, i) => `
    <tr>
      <td class="n">${String(i + 1).padStart(2, '0')}</td>
      <td class="nm">${esc(p.name)}</td>
      <td class="rt">${esc('/' + p.path)}</td>
      <td class="nt">${esc(p.note)}</td>
    </tr>`).join('')

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return `<!doctype html><html><head><meta charset="utf-8">${FONT_LINK}
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Inter,-apple-system,Helvetica,Arial,sans-serif;background:${INK};color:#fff;
       width:${WIDTH}px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{padding:96px 88px;display:flex;flex-direction:column;justify-content:center;min-height:1020px}
  .brand{font-size:22px;font-weight:700;letter-spacing:-.01em}
  .brand span{color:${ORANGE}}
  .rule{height:3px;background:${ORANGE};width:96px;margin:48px 0 40px}
  h1{font-size:74px;line-height:1.02;font-weight:700;letter-spacing:-.02em}
  h1 em{font-style:normal;color:${ORANGE};display:block}
  .lede{margin-top:28px;font-size:17px;line-height:1.65;color:rgba(255,255,255,.62);max-width:640px}
  .meta{margin-top:72px;padding-top:40px;display:flex;gap:56px;border-top:1px solid rgba(255,255,255,.12)}
  .meta div span{display:block;font-size:11px;letter-spacing:.22em;text-transform:uppercase;
                 color:rgba(255,255,255,.38);margin-bottom:8px}
  .meta div strong{font-size:16px;font-weight:600}
  h2{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:${ORANGE};margin-bottom:32px}
  table{width:100%;border-collapse:collapse}
  td{padding:18px 0;border-bottom:1px solid rgba(255,255,255,.1);vertical-align:top}
  .n{width:60px;color:${ORANGE};font-weight:700;font-size:14px}
  .nm{width:220px;font-size:18px;font-weight:600}
  .rt{width:180px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
      font-size:12px;color:rgba(255,255,255,.42)}
  .nt{font-size:13px;line-height:1.6;color:rgba(255,255,255,.52)}
</style></head><body>
  <div class="sheet">
    <div class="brand">Corner<span>Brick</span>9</div>
    <div class="rule"></div>
    <h1>Website Design<em>For Approval.</em></h1>
    <p class="lede">
      The complete page set for the Corner Brick 9 website, presented for review.
      Each sheet that follows shows one page of the site in full, exactly as it is
      built: positioning, structure, content and interaction states included.
    </p>
    <div class="meta">
      <div><span>Prepared for</span><strong>Corner Brick 9</strong></div>
      <div><span>Date</span><strong>${today}</strong></div>
      <div><span>Pages</span><strong>${PAGES.length}</strong></div>
      <div><span>Status</span><strong>Draft for approval</strong></div>
    </div>
  </div>
  <div class="sheet" style="justify-content:flex-start">
    <h2>Contents</h2>
    <table>${rows}</table>
  </div>
</body></html>`
}

async function printUrl(chrome, url, { fixedHeight } = {}) {
  const { session: s, dispose } = await chrome.newTab()
  try {
    await s.send('Page.enable')
    await s.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: false,
    })

    const loaded = s.once('Page.loadEventFired')
    await s.send('Page.navigate', { url })
    await loaded
    // Let fonts settle and the print-mode effect run.
    await sleep(2500)

    let h = fixedHeight
    if (!h) {
      const { result } = await s.send('Runtime.evaluate', {
        expression: `Math.ceil(Math.max(
          document.documentElement.scrollHeight, document.body.scrollHeight
        ))`,
        returnByValue: true,
      })
      h = result.value
    }

    let wIn = WIDTH / CSS_PX_PER_IN
    let hIn = h / CSS_PX_PER_IN
    if (hIn > MAX_IN) {
      wIn *= MAX_IN / hIn
      hIn = MAX_IN
    }

    const { data } = await s.send('Page.printToPDF', {
      printBackground: true,
      paperWidth: wIn, paperHeight: hIn,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      scale: 1,
    })
    return { buf: Buffer.from(data, 'base64'), height: h }
  } finally {
    await dispose()
  }
}

/** Stamps each header above its page, producing one taller sheet per page. */
function composeSheets(pairs, outPaths) {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', ['-c', `
import sys, json
from pypdf import PdfReader, PdfWriter, PageObject, Transformation

pairs = json.loads(sys.argv[1])
for hdr_path, page_path, out_path in pairs:
    page = PdfReader(page_path).pages[0]
    hdr  = PdfReader(hdr_path).pages[0]
    W  = float(page.mediabox.width)
    Hp = float(page.mediabox.height)
    Hh = float(hdr.mediabox.height)
    sheet = PageObject.create_blank_page(width=W, height=Hp + Hh)
    # PDF origin is bottom-left: page sits at y=0, header stacks above it.
    sheet.merge_transformed_page(page, Transformation().translate(0, 0))
    sheet.merge_transformed_page(hdr,  Transformation().translate(0, Hp))
    w = PdfWriter()
    w.add_page(sheet)
    with open(out_path, 'wb') as f:
        w.write(f)
print('ok')
`, JSON.stringify(pairs)], { stdio: ['ignore', 'pipe', 'inherit'] })
    py.on('exit', c => (c === 0 ? resolve(outPaths) : reject(new Error('compose failed'))))
  })
}

async function main() {
  const probe = await fetch(BASE).catch(() => null)
  if (!probe?.ok) {
    console.error(`No server responding at ${BASE} — start one first (npm run dev).`)
    process.exit(1)
  }

  mkdirSync(WORK_DIR, { recursive: true })
  writeFileSync(join(WORK_DIR, 'cover.html'), coverHtml())
  PAGES.forEach((p, i) => {
    writeFileSync(
      join(WORK_DIR, `h${i}.html`),
      headerHtml(i + 1, PAGES.length, p.name, '/' + p.path, p.note)
    )
  })

  const chrome = await launchChrome()
  const parts = []

  try {
    console.log(`Building approval deck from ${BASE}`)

    console.log('  -> Cover & contents')
    const cover = await printUrl(chrome, `${BASE}/preview/_deck/cover.html`)
    const coverPath = join(WORK_DIR, '00-cover.pdf')
    writeFileSync(coverPath, cover.buf)
    parts.push(coverPath)

    const pairs = []
    for (const [i, p] of PAGES.entries()) {
      // Page captured pristine — no DOM injection.
      const page = await printUrl(chrome, `${BASE}/${p.path}?print=1`)
      const pagePath = join(WORK_DIR, `p${i}.pdf`)
      writeFileSync(pagePath, page.buf)

      const hdr = await printUrl(chrome, `${BASE}/preview/_deck/h${i}.html`, { fixedHeight: HEADER_H })
      const hdrPath = join(WORK_DIR, `h${i}.pdf`)
      writeFileSync(hdrPath, hdr.buf)

      const sheetPath = join(WORK_DIR, `s${String(i + 1).padStart(2, '0')}.pdf`)
      pairs.push([hdrPath, pagePath, sheetPath])
      parts.push(sheetPath)
      console.log(`  -> ${String(i + 1).padStart(2, '0')} ${p.name.padEnd(18)} ${WIDTH}x${page.height}`)
    }

    await composeSheets(pairs)
    const pageCount = await mergePdfs(OUT, parts)
    console.log(`\nDone. ${pageCount} sheets`)
    console.log(`  ${BASE}/preview/cb9-design-approval.pdf`)
  } finally {
    chrome.close()
    if (existsSync(WORK_DIR)) rmSync(WORK_DIR, { recursive: true, force: true })
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
