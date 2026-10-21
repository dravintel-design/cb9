import { Info } from 'lucide-react'
import { SITE_LIVE } from '@/lib/site'

/**
 * A visible marker for content still awaiting the client (photos, final
 * details). Shown on the review preview only; renders nothing once the site is live.
 */
export default function PreviewNote({
  children,
  tone = 'light',
  className = '',
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  if (SITE_LIVE) return null
  const dark = tone === 'dark'
  return (
    <p
      className={`rounded-xl inline-flex items-start gap-2 border border-dashed px-4 py-2.5 text-xs leading-relaxed ${className}`}
      style={{
        borderColor: dark ? 'rgba(255,255,255,0.35)' : 'rgba(23,23,23,0.35)',
        color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(23,23,23,0.75)',
        backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
      }}
    >
      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
      <span><strong className="font-semibold">Preview:</strong> {children}</span>
    </p>
  )
}

/** A dashed frame standing in for a photograph the client has not supplied yet. */
export function PhotoSlot({
  label,
  tone = 'light',
  className = '',
}: {
  label: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      role="img"
      aria-label={`${label}, to be added`}
      className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center p-6 ${className}`}
      style={{
        borderColor: dark ? 'rgba(255,255,255,0.22)' : 'rgba(23,23,23,0.2)',
        backgroundColor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(23,23,23,0.03)',
      }}
    >
      <span className="text-sm font-semibold" style={{ color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(23,23,23,0.8)' }}>
        {label}
      </span>
      <span className="text-xs" style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(23,23,23,0.62)' }}>
        To be added
      </span>
    </div>
  )
}
