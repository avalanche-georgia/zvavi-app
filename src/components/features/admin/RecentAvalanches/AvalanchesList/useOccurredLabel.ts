import { useListDates } from '@components/features/admin/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

// The day it happened, or "Unknown" — reporters don't always know
const useOccurredLabel = () => {
  const t = useTranslations()
  const { formatDate } = useListDates()

  return ({ date, isDateUnknown }: Pick<AvalancheListItem, 'date' | 'isDateUnknown'>) =>
    isDateUnknown || !date ? t('common.words.unknown') : formatDate(date)
}

export default useOccurredLabel
