import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from 'src/i18n/routing'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// The proxy sends every page path to a locale, but a missing static file (e.g.
// /images/missing.png) still lands here with "images" as the locale. Checked above the
// public loading boundary, so it's a real 404 rather than a not-found page sent as 200.
const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  return children
}

export default LocaleLayout
