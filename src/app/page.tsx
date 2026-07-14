import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress  from '@/components/ui/ScrollProgress'
import HeroSection     from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection  from '@/components/sections/ProcessSection'
import FounderSection  from '@/components/sections/FounderSection'
import WorkSection     from '@/components/sections/WorkSection'
import ClientsSection  from '@/components/sections/ClientsSection'
import CTASection      from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <FounderSection />
        <WorkSection />
        <ClientsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
