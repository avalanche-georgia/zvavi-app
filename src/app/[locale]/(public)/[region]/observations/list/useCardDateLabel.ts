import { useRelativeDate } from '@components/features/observations'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

// "Yesterday" / "3 weeks ago", or "Reported 2 days ago" in the Reported view
const useCardDateLabel = () => {
  const t = useTranslations()
  const formatRelativeDate = useRelativeDate()

  return (observation: PublicObservation, dateBasis: ObservationDateBasis): string => {
    if (dateBasis === 'reported') {
      return t('observations.card.reportedAgo', {
        time: formatRelativeDate(observation.createdAt),
      })
    }

    if (observation.isDateUnknown || !observation.date) return t('observations.labels.dateUnknown')

    return formatRelativeDate(observation.date, { isCapitalized: true })
  }
}

export default useCardDateLabel
