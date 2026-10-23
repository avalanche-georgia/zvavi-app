import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'

import useArchiveFormat from '../hooks/useArchiveFormat'
import type { ArchiveForecast } from '../model'

import { cn } from '@/lib/utils'

type CalendarCaptionProps = {
  day: string | null
  forecast: ArchiveForecast | undefined
}

// Under the grid: a hint, or the hovered / focused day's level and problems
const CalendarCaption = ({ day, forecast }: CalendarCaptionProps) => {
  const t = useTranslations()
  const { formatDay } = useArchiveFormat()

  if (!day || !forecast) {
    return (
      <p className="text-copy-sm text-muted mt-2.5 min-h-5">{t('forecast.history.glance.hint')}</p>
    )
  }

  const level = forecast.hazardLevels.overall
  const problems = forecast.avalancheProblems
    .map(({ type }) => t(`common.avalancheTypes.${type}`))
    .join(', ')

  return (
    <p className="text-copy-sm text-muted mt-2.5 flex min-h-5 items-center gap-1.5">
      <span
        aria-hidden
        className={cn('rounded-bar size-2.5', backgroundColorByHazardLevel[level])}
      />
      <span className="text-ink font-semibold">{formatDay(day)}</span>
      <span>· {t(hazardLevelNamesByScale[level])}</span>
      {problems && <span className="truncate">· {problems}</span>}
    </p>
  )
}

export default CalendarCaption
