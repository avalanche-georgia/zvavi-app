'use client'

import { useMemo, useTransition } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { defaultLocale, type Locale, locales } from 'src/i18n/config'
import { useEventCallback } from 'usehooks-ts'

type LanguageOption = {
  label: string
  value: Locale
}

const languageOptions: LanguageOption[] = [
  { label: '🇬🇧', value: 'en' },
  { label: '🇬🇪', value: 'ka' },
]

const LanguageToggle = () => {
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

  const handleChange = useEventCallback((value: Locale) => {
    if (!value || value === currentLocale) return

    const query = searchParams?.toString()
    const nextPath = `/${value}${restPath ? `/${restPath}` : ''}${query ? `?${query}` : ''}`

    startTransition(() => {
      router.replace(nextPath)
      router.refresh()
    })
  })

  return (
    <ToggleGroup.Root
      aria-label="Select language"
      className="inline-flex items-center overflow-hidden rounded border shadow-sm backdrop-blur"
      disabled={isPending}
      onValueChange={handleChange}
      type="single"
      value={currentLocale}
    >
      {languageOptions.map(({ label, value }) => (
        <ToggleGroup.Item
          key={value}
          className={clsx(
            'relative flex min-w-[44px] items-center justify-center px-1 py-0.5',
            'transition-colors data-[state=on]:bg-slate-600 data-[state=off]:hover:bg-primary/10',
          )}
          value={value}
        >
          <span className="text-lg leading-none">{label}</span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

export default LanguageToggle
