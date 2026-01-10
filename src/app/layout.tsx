import { TooltipProvider } from '@components/ui'
import { QueryClientProvider } from '@data'
import { SupabaseContextProvider } from '@domain/context'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'

import './globals.css'

import { inter } from '@/fonts'
import { baseUrl } from '@/routes'

const siteDescription =
  'Avalanche forecast for Gudauri and Georgian backcountry. Weather and snow conditions for skiers and snowboarders.'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale()

  return {
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
    metadataBase: new URL(baseUrl),
    openGraph: {
      description: siteDescription,
      locale,
      siteName: 'Avalanche Georgia',
      title: 'Avalanche Georgia',
      type: 'website',
      url: baseUrl,
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
          <QueryClientProvider>
            <SupabaseContextProvider>
              <TooltipProvider delayDuration={100}>
                <Toaster position="top-center" />
                {children}
                <SpeedInsights />
              </TooltipProvider>
            </SupabaseContextProvider>
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
