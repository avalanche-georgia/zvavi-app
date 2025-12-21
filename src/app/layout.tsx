import { Footer, Header } from '@components/layout'
import { DisclaimerGate } from '@components/shared/Disclaimer'
import WIPBanner from '@components/shared/WIPBanner'
import { QueryClientProvider } from '@data'
import { SupabaseContextProvider } from '@domain/context'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'

import './globals.css'

import { inter } from '@/fonts'

const siteDescription =
  'Avalanche forecast for Gudauri and Georgian backcountry. Weather and snow conditions for skiers and snowboarders.'

export const metadata: Metadata = {
  description: siteDescription,
  keywords: [
    'avalanche',
    'avalanche forecast',
    'Georgia',
    'Gudauri',
    'backcountry skiing',
    'freeride',
    'snow conditions',
    'avalanche danger',
    'ზვავი',
    'ზვავის პროგნოზი',
    'გუდაური',
  ],
  metadataBase: new URL('https://avalanche.ge'),
  openGraph: {
    description: siteDescription,
    locale: 'en',
    siteName: 'Avalanche Georgia',
    title: 'Avalanche Georgia',
    type: 'website',
    url: 'https://avalanche.ge',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Avalanche.ge',
  },
  title: 'Avalanche Georgia',
  twitter: {
    card: 'summary_large_image',
    description: siteDescription,
    title: 'Avalanche Georgia',
  },
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex min-h-dvh flex-col antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <DisclaimerGate>
            <QueryClientProvider>
              <SupabaseContextProvider>
                <Header />
                <WIPBanner />
                <Toaster position="top-center" />
                <main className="flex-1">{children}</main>
                <Footer />

                <SpeedInsights />
              </SupabaseContextProvider>
            </QueryClientProvider>
          </DisclaimerGate>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
