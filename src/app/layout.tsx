import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import LenisProvider from '@/components/providers/LenisProvider'
import PrintMode from '@/components/ui/PrintMode'
import { SITE_LIVE, SITE_URL } from '@/lib/site'

// Inter as fallback; Stack is loaded via @import in globals.css
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Corner Brick 9 | Bespoke Residential Design, Engineering & Build Studio',
    template: '%s | Corner Brick 9',
  },
  description:
    'A bespoke residential design, engineering and build studio in Chennai. We translate a family, a plot and a way of living into an individual residence, and take responsibility for building it.',
  keywords: [
    'bespoke residential architecture Chennai',
    'custom home design and build Chennai',
    'luxury residential studio Chennai',
    'design engineering build studio',
    'Corner Brick 9',
  ],
  authors: [{ name: 'M. Sathish Kumar', url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Corner Brick 9',
    title: 'Corner Brick 9 | Bespoke Residential Design, Engineering & Build Studio',
    description:
      'An individual architectural response to your plot and your family, engineered, documented and built under one accountable team.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corner Brick 9 | Bespoke Residential Design, Engineering & Build Studio',
    description:
      'Bespoke homes designed around a family and a site, engineered and built under one accountable team.',
  },
  // Kept out of search results until the client approves the site for launch.
  robots: SITE_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  metadataBase: new URL(SITE_URL),
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
        <PrintMode />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
