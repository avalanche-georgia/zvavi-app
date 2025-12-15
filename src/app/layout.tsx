import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'

import { Footer, Header } from '@/UI/components'
import { DisclaimerGate } from '@/UI/components/Disclaimer'
import WIPBanner from '@/UI/components/WIPBanner'
import './globals.css'

import { SupabaseContextProvider } from '@/business/context'
import { QueryClientProvider } from '@/data'
import { inter } from '@/fonts'

export const metadata: Metadata = {
  description:
    'Avalanche forecast and weather information for the backcountry skier and snowboarder.',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Avalanche.ge',
  },
  title: 'Avalanche Georgia',
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
              </SupabaseContextProvider>
            </QueryClientProvider>
          </DisclaimerGate>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
