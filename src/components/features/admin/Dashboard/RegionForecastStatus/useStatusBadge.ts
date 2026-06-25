import type { Forecast } from '@domain/types'
import { differenceInHours, format, isBefore } from 'date-fns'
import { useTranslations } from 'next-intl'

const expiringSoonThresholdHours = 24

export const useStatusBadge = (currentForecast: Forecast | null | undefined) => {
  const t = useTranslations()

  const now = new Date()
  const validUntil = currentForecast ? new Date(currentForecast.validUntil) : null
  const hoursRemaining = validUntil ? differenceInHours(validUntil, now) : null

  if (validUntil === null || isBefore(validUntil, now)) {
    return { className: 'bg-red-100 text-red-800', label: t('admin.dashboard.regions.noActive') }
  }

  const date = format(validUntil, 'MMM d, HH:mm')

  if (hoursRemaining !== null && hoursRemaining <= expiringSoonThresholdHours) {
    return {
      className: 'bg-amber-100 text-amber-800',
      label: t('admin.dashboard.regions.expiringSoon', { date }),
    }
  }

  return {
    className: 'bg-green-100 text-green-800',
    label: t('admin.dashboard.regions.valid', { date }),
  }
}
