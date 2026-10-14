import { useListDates } from '@components/features/admin/shared'
import type { Forecast } from '@domain/types'
import type { StatusPillTone } from '@ds/primitives'
import { differenceInHours, isBefore } from 'date-fns'
import { useNow, useTranslations } from 'next-intl'

const expiringSoonThresholdHours = 24

type RegionStatus = { label: string; tone: StatusPillTone }

// How the region's public forecast stands: valid, about to run out, or missing
const useRegionStatus = (currentForecast: Forecast | null | undefined): RegionStatus => {
  const t = useTranslations()
  const now = useNow()
  const { formatDay, formatTime } = useListDates()
  const validUntil = currentForecast?.validUntil ? new Date(currentForecast.validUntil) : null

  if (!validUntil || isBefore(validUntil, now)) {
    return { label: t('admin.dashboard.regions.noActive'), tone: 'danger' }
  }

  const date = `${formatDay(validUntil)}, ${formatTime(validUntil)}`

  if (differenceInHours(validUntil, now) <= expiringSoonThresholdHours) {
    return { label: t('admin.dashboard.regions.expiringSoon', { date }), tone: 'warning' }
  }

  return { label: t('admin.dashboard.regions.valid', { date }), tone: 'success' }
}

export default useRegionStatus
