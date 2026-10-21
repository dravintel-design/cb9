import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LegalPage from '@/components/pages/LegalPage'
import { CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Corner Brick 9 collects, uses and protects the details you share through this website.',
}

const SECTIONS = [
  {
    heading: 'What we collect',
    body: [
      'When you send an enquiry, we collect the details you choose to give us: your name, phone or WhatsApp number, plot location, and anything else you add about your plot, budget, timing, family and requirements.',
      'We do not ask for payment details, identity documents or passwords through this website.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'We use your details only to respond to your enquiry, arrange a conversation or site visit you have asked for, and prepare for that conversation.',
      'We do not sell your details, and we do not add you to marketing lists without asking you first.',
    ],
  },
  {
    heading: 'Who can see it',
    body: [
      'Your enquiry is seen by the Corner Brick 9 team. It passes through the email and hosting services that run this website, which process it only to deliver it to us.',
      'If you go on to work with us, details relevant to your project may be shared with the architects, engineers and specialists working on it, and only for that project.',
    ],
  },
  {
    heading: 'Videos',
    body: [
      'Videos on this website are hosted on YouTube. When you choose to play one, it loads from YouTube in privacy-enhanced mode, and YouTube’s own privacy policy applies to that video.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'We keep enquiry details for as long as we need them to respond and follow up. If you would like your details removed, contact us and we will delete them.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      `You can ask to see, correct or delete the details we hold about you at any time by emailing ${CONTACT.email} or calling ${CONTACT.phoneDisplay}.`,
    ],
  },
] as const

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <LegalPage
          title="Privacy Policy"
          intro="This page explains what happens to the details you share with Corner Brick 9 through this website."
          sections={SECTIONS}
        />
      </main>
      <Footer />
    </>
  )
}
