import { differenceInMinutes } from 'date-fns'
import { useTranslations } from 'next-intl'

// Fractional hours until validUntil; negative once it has passed
export const getHoursLeft = (validUntil: string, now: Date) =>
  differenceInMinutes(validUntil, now) / 60

// "ends in 8h" / "ends in 3d" and "8h ago" / "3d ago" (days from 24h)
const useTimeLeft = () => {
  const t = useTranslations()

  const formatLeft = (validUntil: string, now: Date) => {
    const hoursLeft = getHoursLeft(validUntil, now)

    if (hoursLeft < 24) {
      return t('admin.forecasts.list.endsInHours', { count: Math.max(1, Math.round(hoursLeft)) })
    }

    return t('admin.forecasts.list.endsInDays', { count: Math.round(hoursLeft / 24) })
  }

  const formatAgo = (validUntil: string, now: Date) => {
    const hoursAgo = -getHoursLeft(validUntil, now)

    if (hoursAgo < 24) {
      return t('admin.forecasts.view.hoursAgo', { count: Math.max(1, Math.round(hoursAgo)) })
    }

    return t('admin.forecasts.view.daysAgo', { count: Math.round(hoursAgo / 24) })
  }

  return { formatAgo, formatLeft }
}

export default useTimeLeft
