/**
 * Minimal Chrome DevTools Protocol helpers shared by the PDF scripts.
 *
 * Chrome's `--print-to-pdf` CLI flag always paginates to Letter and gives no
 * way to set `preferCSSPageSize`, so both scripts drive Chrome over CDP and
 * pass explicit paper dimensions instead.
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const CHROME_PATH =
  process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

export const sleep = ms => new Promise(r => setTimeout(r, ms))

/** CDP client over a single page target's WebSocket. */
export class Session {
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

/**
 * Launches a headless Chrome on a random debugging port.
 * Returns { port, newTab, close }.
 */
export async function launchChrome() {
  // Randomised so a Chrome left over from an interrupted run can't block us.
  const port = 9300 + Math.floor(Math.random() * 400)
  const profile = mkdtempSync(join(tmpdir(), 'cb9-pdf-'))

  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { stdio: 'ignore' })

  // Chrome holds its profile lock briefly after exit; retry the cleanup
  // rather than failing a run that already produced good output.
  const close = () => {
    proc.kill()
    for (let i = 0; i < 20; i++) {
      try {
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
        return
      } catch {
        /* keep trying */
      }
    }
  }
  process.on('exit', close)

  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (r.ok) {
        // Fresh tab per capture keeps state from bleeding between pages.
        const newTab = async () => {
          const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
          const target = await res.json()
          const session = await Session.open(target.webSocketDebuggerUrl)
          return {
            session,
            dispose: async () => {
              session.close()
              await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`).catch(() => {})
            },
          }
        }
        return { port, newTab, close }
      }
    } catch {}
    await sleep(250)
  }

  close()
  throw new Error('Chrome did not expose a debugging port')
}

/** Merges PDF buffers on disk into one document via pypdf. */
export function mergePdfs(outPath, partPaths) {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', ['-c', `
import sys
from pypdf import PdfWriter
out, *parts = sys.argv[1:]
w = PdfWriter()
for p in parts:
    w.append(p)
with open(out, 'wb') as f:
    w.write(f)
print(len(w.pages))
`, outPath, ...partPaths], { stdio: ['ignore', 'pipe', 'inherit'] })
    let out = ''
    py.stdout.on('data', d => { out += d })
    py.on('exit', c => (c === 0 ? resolve(Number(out.trim())) : reject(new Error('merge failed'))))
  })
}
