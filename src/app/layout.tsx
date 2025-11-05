import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'

import WIPBanner from '@/UI/components/WIPBanner'
import './globals.css'
import type { Locale } from '../config'

import { SupabaseContextProvider } from '@/business/context'
import { QueryClientProvider } from '@/data'
import { inter } from '@/fonts'
import { Header } from '@/UI/header'

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
  params: { locale: Locale }
}

const Layout = async (props: Readonly<LayoutProps>) => {
  const params = await props.params

  const { children } = props

  const messages = await getMessages()
  const { locale } = params

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <QueryClientProvider>
            <SupabaseContextProvider>
              <Header />
              <WIPBanner />
              <Toaster position="top-center" />
              {children}
            </SupabaseContextProvider>
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default Layout
