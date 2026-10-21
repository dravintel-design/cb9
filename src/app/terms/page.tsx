import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LegalPage from '@/components/pages/LegalPage'
import { CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use the Corner Brick 9 website.',
}

const SECTIONS = [
  {
    heading: 'About this website',
    body: [
      'This website introduces Corner Brick 9 and the way we design, engineer and build homes. Its content is general information, not a quotation, proposal or contract.',
    ],
  },
  {
    heading: 'Services and estimates',
    body: [
      'The services, scope, fees and responsibilities for any project are set out in a written project proposal and agreement. Where this website and that agreement differ, the agreement applies.',
      'Sending an enquiry or requesting a site visit does not create an agreement, and a site visit request is confirmed only when we agree a date with you.',
    ],
  },
  {
    heading: 'Projects and images',
    body: [
      'Completed homes and unbuilt concept studies are labelled as such. Concept images show design proposals, not finished homes. Where a design partner led a design, they are credited.',
      'Photographs, drawings and text on this website belong to Corner Brick 9 or the people credited, and may not be reused without permission.',
    ],
  },
  {
    heading: 'Links to other sites',
    body: [
      'Some links, such as our videos, open other websites. We are not responsible for the content or policies of those sites.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      `Questions about these terms can be sent to ${CONTACT.email}.`,
    ],
  },
] as const

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <LegalPage
          title="Terms of Use"
          intro="These terms apply when you use the Corner Brick 9 website."
          sections={SECTIONS}
        />
      </main>
      <Footer />
    </>
  )
}
