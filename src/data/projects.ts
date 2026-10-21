/**
 * Projects shown on /projects and /projects/[id].
 *
 * PLACEHOLDERS: names, locations, sizes and dates are temporary until the
 * client supplies the correct project details, photographs and permissions.
 */

export const FILTERS = ['All', 'Residences', 'Concept Studies', 'Interiors'] as const
export type Filter = (typeof FILTERS)[number]

export interface Project {
  id: string
  title: string
  location: string
  category: Exclude<Filter, 'All'>
  status: 'Completed' | 'Concept Study'
  spec: string
  note: string
  year: string
  /** Cover photograph. kind 'concept' or 'example' adds a visible label so it is never mistaken for a built home. */
  cover?: { src: string; alt: string; kind: 'photo' | 'concept' | 'example' }
  /** The client's requirements, in a sentence or two. */
  brief?: string
  /** What CB9 was responsible for on this project. */
  scope?: readonly string[]
  /** Architect or design partner, credited where they led the design. */
  credit?: { role: string; name: string }
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'lakshmi-villa',
    title: 'Lakshmi Villa',
    location: 'Avadi, Chennai',
    category: 'Residences',
    status: 'Completed',
    spec: '2,200 sq.ft · G+1 · 3BHK',
    note: 'A corner-plot family home designed around a central light well, with concrete cube-tested at each pour and a recorded handover walkthrough.',
    year: '2024',
  },
  {
    id: 'murugan-nagar-duplex',
    title: 'Murugan Nagar Duplex',
    location: 'Thiruvallur',
    category: 'Residences',
    status: 'Completed',
    spec: '1,850 sq.ft · Duplex',
    note: 'A stage-wise contract with an open cost sheet, so every line item was visible before it was approved.',
    year: '2024',
  },
  {
    id: 'priya-enclave',
    title: 'Priya Enclave',
    location: 'Pattibiram, Chennai',
    category: 'Residences',
    status: 'Completed',
    spec: '4,100 sq.ft · G+2',
    note: 'Three floors engineered on a narrow footprint, structural drawings, permits and handover pack coordinated end to end by CB9.',
    year: '2023',
  },
  {
    id: 'courtyard-villa-concept',
    title: 'Courtyard Villa Study',
    location: 'Poonamallee corridor',
    category: 'Concept Studies',
    status: 'Concept Study',
    spec: '5,400 sq.ft · Single family',
    note: 'A west-facing plot answered with a shaded central courtyard: sun-path study, massing model, and material palette.',
    year: '2025',
  },
  {
    id: 'mango-farmhouse-concept',
    title: 'Mango Orchard Farmhouse',
    location: 'Thiruvallur outskirts',
    category: 'Concept Studies',
    status: 'Concept Study',
    spec: '2,800 sq.ft · Weekend home',
    note: 'Load-bearing brick, deep verandahs, and rainwater capture, designed to sit quietly inside an existing orchard.',
    year: '2025',
  },
  {
    id: 'avadi-interior-study',
    title: 'Heritage-Modern Interior',
    location: 'Avadi, Chennai',
    category: 'Interiors',
    status: 'Concept Study',
    spec: '3BHK · Full interior',
    note: 'Athangudi tile, cane, and teak against clean white volumes, a palette study for a completed CB9 shell.',
    year: '2025',
  },
] as const

export const projectHref = (id: string) => `/projects/${id}`
export const statusLabel = (p: Project) => (p.status === 'Concept Study' ? 'Unbuilt Concept' : 'Completed')
