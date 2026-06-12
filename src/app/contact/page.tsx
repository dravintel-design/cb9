import type { Metadata } from 'next'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk directly to Sathish Kumar, founder of Corner Brick 9. Free site visit, honest cost estimate, no commitment required. Serving Avadi, Thiruvallur, Pattibiram, and Thirunindravur.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
