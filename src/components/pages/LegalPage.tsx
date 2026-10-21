import { BRAND_ORANGE, LIGHT_SECTION } from '@/lib/utils'
import PreviewNote from '@/components/ui/PreviewNote'

const L = LIGHT_SECTION

export interface LegalSection {
  heading: string
  body: readonly string[]
}

/** Plain, readable layout for the privacy policy and terms of use. */
export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: readonly LegalSection[]
}) {
  return (
    <section className="pt-36 lg:pt-44 pb-24 lg:pb-32" style={{ backgroundColor: L.bg }}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5" style={{ color: BRAND_ORANGE }}>
          Corner Brick 9
        </p>
        <h1 className="font-bold leading-tight text-display-md" style={{ color: L.text }}>{title}</h1>
        <p className="mt-6 text-base lg:text-lg leading-relaxed" style={{ color: L.textMuted }}>{intro}</p>

        <PreviewNote className="mt-8">
          Draft wording for review. Please have this checked before the site starts collecting enquiries.
        </PreviewNote>

        <div className="mt-14 flex flex-col gap-12">
          {sections.map(({ heading, body }, i) => (
            <section key={heading} aria-labelledby={`legal-${i}`}>
              <h2 id={`legal-${i}`} className="font-bold text-xl mb-4" style={{ color: L.text }}>
                {heading}
              </h2>
              <div className="flex flex-col gap-4">
                {body.map((para, j) => (
                  <p key={j} className="text-base leading-relaxed" style={{ color: L.textMuted }}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
