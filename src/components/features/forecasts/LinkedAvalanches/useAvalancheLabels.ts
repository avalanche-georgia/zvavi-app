import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { useFormatter, useTranslations } from 'next-intl'

// "Wind slab · Natural" and "28 Sep 2026" for a linked / linkable record
const useAvalancheLabels = () => {
  const t = useTranslations()
  const format = useFormatter()

  const getTitle = ({ trigger, type }: LinkableAvalanche) =>
    [t(`common.avalancheTypes.${type}`), trigger && t(`common.avalancheTriggers.${trigger}`)]
      .filter(Boolean)
      .join(' · ')

  const getDate = ({ createdAt, date, isDateUnknown }: LinkableAvalanche) =>
    isDateUnknown || !date
      ? t('admin.forecast.editor.avalanches.dateUnknown', {
          reported: format.dateTime(new Date(createdAt), { dateStyle: 'medium' }),
        })
      : format.dateTime(new Date(date), { dateStyle: 'medium' })

  return { getDate, getTitle }
}

export default useAvalancheLabels
