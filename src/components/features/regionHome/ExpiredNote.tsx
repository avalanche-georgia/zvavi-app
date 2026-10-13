'use client'

import { getValidity } from '@components/features/forecast/model/validity'
import { useIsClient } from '@components/hooks'
import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Above the danger card once the latest forecast's window has passed and no
// newer one has been issued
const ExpiredNote = ({ validUntil }: { validUntil: string }) => {
  const t = useTranslations()
  // "Expired" depends on "now" — only known for sure in the browser
  const isClient = useIsClient()

  if (!isClient || getValidity(validUntil, new Date(), true).kind !== 'expired') return null

  return (
    <div className="bg-warning-soft text-warning rounded-media text-copy-sm flex items-start gap-2.5 px-3.5 py-3">
      <TriangleAlert aria-hidden className="mt-0.5 size-4.5 shrink-0" />
      <p className="min-w-0">
        <b className="text-copy block font-semibold">{t('regionHome.expired.title')}</b>
        {t('regionHome.expired.message')}
      </p>
    </div>
  )
}

export default ExpiredNote
