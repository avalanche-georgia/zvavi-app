import { renderHook } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, it } from 'vitest'

import useRelativeDate from './useRelativeDate'
import en from '../../../../messages/en.json'
import ka from '../../../../messages/ka.json'

const now = new Date('2026-10-23T12:00:00+04:00')

const formatDaysAgo = (locale: 'en' | 'ka', daysAgo: number, isCapitalized = false) => {
  const { result } = renderHook(() => useRelativeDate(), {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : ka}>
        {children}
      </NextIntlClientProvider>
    ),
  })
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

  return result.current(date, { isCapitalized, now })
}

describe('useRelativeDate', () => {
  it('words days, weeks, months and years in English', () => {
    expect([0, 1, 5, 7, 21, 30, 90, 365, 800].map((days) => formatDaysAgo('en', days))).toEqual([
      'today',
      'yesterday',
      '5 days ago',
      'last week',
      '3 weeks ago',
      'last month',
      '3 months ago',
      'last year',
      '2 years ago',
    ])
  })

  it('words them in Georgian, whatever Intl data the browser has', () => {
    expect([0, 1, 2, 5, 7, 21, 30, 90, 365, 800].map((days) => formatDaysAgo('ka', days))).toEqual([
      'დღეს',
      'გუშინ',
      'გუშინწინ',
      '5 დღის წინ',
      'გასულ კვირაში',
      '3 კვირის წინ',
      'გასულ თვეს',
      '3 თვის წინ',
      'გასულ წელს',
      '2 წლის წინ',
    ])
  })

  it('capitalizes English only', () => {
    expect(formatDaysAgo('en', 1, true)).toBe('Yesterday')
    expect(formatDaysAgo('ka', 1, true)).toBe('გუშინ')
  })
})
