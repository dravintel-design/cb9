import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import PrintMode from '@/components/ui/PrintMode'

// Inter as fallback; Stack is loaded via @import in globals.css
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Corner Brick 9 | Turnkey Construction — Chennai',
    template: '%s | Corner Brick 9',
  },
  description:
    'Turnkey residential construction in Chennai, Avadi, Thiruvallur, and Pattibiram. No subcontractors. IS-standard tested. Open-cost transparency. Video-documented handover.',
  keywords: [
    'turnkey construction Chennai',
    'home builders Avadi',
    'construction company Thiruvallur',
    'residential construction Pattibiram',
    'Corner Brick 9',
  ],
  authors: [{ name: 'M. Sathish Kumar', url: 'https://cornerbrick9.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cornerbrick9.com',
    siteName: 'Corner Brick 9',
    title: 'Corner Brick 9 | Turnkey Construction — Chennai',
    description:
      'No subcontractors. IS-standard testing at every stage. Open-cost transparency. Homes built and documented — from foundation to video handover.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corner Brick 9 | Turnkey Construction — Chennai',
    description:
      'No subcontractors. IS-standard testing. Open-cost transparency. Video-documented handover.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://cornerbrick9.com'),
}

export const viewport: Viewport = {
  themeColor: '#E8481C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden">
        <Suspense fallback={null}>
          <PrintMode />
        </Suspense>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
