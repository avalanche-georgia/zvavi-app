'use client'

import { useMemo, useTransition } from 'react'
import { SegmentedControl, type SegmentedControlSize } from '@ds/primitives'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { defaultLocale, type Locale, locales } from 'src/i18n/config'

// Each language in its own script, so it reads right whatever the current one is
const languageLabels: Record<Locale, { ariaLabel: string; label: string }> = {
  en: { ariaLabel: 'English', label: 'EN' },
  ka: { ariaLabel: 'ქართული', label: 'ქარ' },
}

const languageOptions = locales.map((locale) => ({ ...languageLabels[locale], value: locale }))

type LanguageToggleProps = {
  className?: string
  size?: SegmentedControlSize
}

// EN / ქარ switch: the same page in the other language, query kept
const LanguageToggle = ({ className, size = 'xs' }: LanguageToggleProps) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const { currentLocale, restPath } = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? []
    const maybeLocale = segments[0]
    const isLocalized = maybeLocale && locales.includes(maybeLocale as Locale)

    return {
      currentLocale: (isLocalized ? maybeLocale : defaultLocale) as Locale,
      restPath: segments.slice(isLocalized ? 1 : 0).join('/'),
    }
  }, [pathname])

  const handleChange = (value: Locale) => {
    if (value === currentLocale) return

    const query = searchParams?.toString()
    const nextPath = `/${value}${restPath ? `/${restPath}` : ''}${query ? `?${query}` : ''}`

    startTransition(() => {
      router.replace(nextPath)
      router.refresh()
    })
  }

  return (
    <SegmentedControl
      ariaLabel={t('navigation.language')}
      className={className}
      disabled={isPending}
      onChange={handleChange}
      options={languageOptions}
      size={size}
      value={currentLocale}
    />
  )
}

export default LanguageToggle
