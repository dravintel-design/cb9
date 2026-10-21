import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Ruler, CalendarDays, Check } from 'lucide-react'
import { BRAND_ORANGE, DARK_SECTION, LIGHT_SECTION } from '@/lib/utils'
import { SITE_LIVE, enquiryHref } from '@/lib/site'
import { statusLabel, type Project } from '@/data/projects'
import PreviewNote, { PhotoSlot } from '@/components/ui/PreviewNote'
import PageCTA from '@/components/ui/PageCTA'

const D = DARK_SECTION
const L = LIGHT_SECTION

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
      {children}
    </p>
  )
}

/**
 * One project, laid out for the material the client will supply: requirements,
 * scope, plans, photographs and the design credit. Missing material shows as a
 * labelled slot on the preview and is left out entirely on the live site.
 */
export default function ProjectDetailPage({ project: p }: { project: Project }) {
  const concept = p.status === 'Concept Study'
  const showSlots = !SITE_LIVE

  return (
    <>
      {/* Header */}
      <section className="pt-36 lg:pt-44 pb-16 lg:pb-20" style={{ backgroundColor: D.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase mb-10 hover:text-white transition-colors"
            style={{ color: D.textMuted }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="rounded-lg text-xs font-bold tracking-[0.14em] uppercase px-3 py-1.5"
              style={{ backgroundColor: concept ? 'rgba(255,255,255,0.92)' : BRAND_ORANGE, color: concept ? '#171717' : '#fff' }}
            >
              {statusLabel(p)}
            </span>
            <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: D.textMuted }}>{p.category}</span>
          </div>

          <h1 className="font-bold leading-tight text-display-lg text-white max-w-4xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed" style={{ color: D.textMuted }}>{p.note}</p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { icon: MapPin, label: 'Location', value: p.location },
              { icon: Ruler, label: 'Size', value: p.spec },
              { icon: CalendarDays, label: concept ? 'Study' : 'Completed', value: p.year },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: D.textFaint }}>{label}</dt>
                  <dd className="text-sm font-medium text-white mt-1">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {concept && (
            <p className="rounded-2xl mt-10 border px-5 py-4 text-sm leading-relaxed max-w-3xl" style={{ borderColor: 'rgba(255,255,255,0.2)', color: D.textMuted }}>
              <strong className="text-white">This is an unbuilt concept study.</strong> The images show a design
              proposal, not a completed home{p.credit ? `, and were produced by ${p.credit.name}` : ''}.
            </p>
          )}

          <div className="mt-12">
            {p.cover ? (
              <div className="rounded-2xl relative overflow-hidden aspect-[16/9]">
                <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="100vw" className="object-cover" />
                {p.cover.kind !== 'photo' && (
                  <span className="rounded-lg absolute top-5 left-5 text-xs font-bold tracking-[0.14em] uppercase px-3 py-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#171717' }}>
                    {p.cover.kind === 'concept' ? 'Concept Image' : 'Example Image'}
                  </span>
                )}
              </div>
            ) : showSlots && (
              <PhotoSlot label={concept ? 'Main concept image' : 'Main project photograph'} tone="dark" className="aspect-[16/9]" />
            )}
          </div>
        </div>
      </section>

      {/* Requirements, scope and credit */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: L.bg }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>The Client&rsquo;s Requirements</Eyebrow>
            {p.brief ? (
              <p className="text-lg leading-relaxed" style={{ color: L.text }}>{p.brief}</p>
            ) : showSlots && (
              <PreviewNote>The family&rsquo;s brief for this home, in a few sentences: who lives there, what they needed, and what mattered most.</PreviewNote>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-12">
            <div>
              <Eyebrow>Work CB9 Handled</Eyebrow>
              {p.scope?.length ? (
                <ul className="flex flex-col gap-3">
                  {p.scope.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: L.textMuted }}>
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRAND_ORANGE }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : showSlots && (
                <PreviewNote>The scope CB9 delivered, for example design, structural engineering, approval coordination, construction and interiors.</PreviewNote>
              )}
            </div>

            {(p.credit || showSlots) && (
              <div>
                <Eyebrow>Design Credit</Eyebrow>
                {p.credit ? (
                  <p className="text-sm" style={{ color: L.textMuted }}>
                    <span className="block text-xs font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: L.textFaint }}>{p.credit.role}</span>
                    <span className="text-base font-semibold" style={{ color: L.text }}>{p.credit.name}</span>
                  </p>
                ) : (
                  <PreviewNote>The architect or design partner who led the design, credited by name where they did.</PreviewNote>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Plans and photographs */}
      {showSlots && (
        <section className="py-20 lg:py-28" style={{ backgroundColor: L.bgDeep }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-16">
            <Eyebrow>Plans</Eyebrow>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              <PhotoSlot label="Ground floor plan" className="aspect-[4/3]" />
              <PhotoSlot label="First floor plan" className="aspect-[4/3]" />
            </div>

            <div className="mt-16 lg:mt-20">
              <Eyebrow>{concept ? 'Concept Images' : 'Finished Photographs'}</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {(concept
                  ? ['Concept view: exterior', 'Concept view: interior', 'Concept view: detail']
                  : ['Finished home: exterior', 'Finished home: living space', 'Finished home: detail']
                ).map(l => <PhotoSlot key={l} label={l} className="aspect-[4/3]" />)}
              </div>
              {concept && (
                <p className="mt-5 text-sm" style={{ color: L.textMuted }}>
                  Every concept image on this page will carry an &ldquo;Unbuilt Concept&rdquo; label.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <PageCTA
        lines={[
          'A Home Designed',
          <span key="l2" style={{ color: BRAND_ORANGE }}>for Your Family.</span>,
        ]}
        body="Tell us about your plot and how you want to live, and we will call you to arrange a site visit."
        ctaLabel="Request a Site Visit"
        href={enquiryHref({ visit: true })}
      />
    </>
  )
}
