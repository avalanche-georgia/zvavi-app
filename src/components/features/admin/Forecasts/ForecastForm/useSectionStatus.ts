import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import type { ForecastFormSchema } from './schema'

export const sectionIds = {
  avalanches: 'forecast-avalanches',
  conditions: 'forecast-conditions',
  general: 'forecast-general',
  hazard: 'forecast-hazard',
  problems: 'forecast-problems',
  summary: 'forecast-summary',
} as const

export type SectionStatus = { id: string; isComplete: boolean; label: string; value?: string }

// Rail entries: completion dot + a short value per section
const useSectionStatus = (): SectionStatus[] => {
  const t = useTranslations()
  const values = useWatch<ForecastFormSchema>() as Partial<ForecastFormSchema>
  const { avalancheProblems = [], hazardLevels, recentAvalancheIds = [] } = values
  const conditions = [values.snowpack, values.weather, values.additionalHazards]
  const filledConditions = conditions.filter((text) => text?.trim()).length
  const overall = hazardLevels?.overall ?? '1'
  const key = 'admin.forecast.editor.rail'

  return [
    {
      id: sectionIds.general,
      isComplete: !!values.forecaster?.trim() && !!values.validUntil,
      label: t(`${key}.general`),
    },
    {
      id: sectionIds.hazard,
      isComplete: true,
      label: t(`${key}.hazard`),
      value: `${overall} · ${t(hazardLevelNamesByScale[overall])}`,
    },
    { id: sectionIds.summary, isComplete: !!values.summary?.trim(), label: t(`${key}.summary`) },
    {
      id: sectionIds.problems,
      isComplete: avalancheProblems.length > 0,
      label: t(`${key}.problems`),
      value: String(avalancheProblems.length),
    },
    {
      id: sectionIds.avalanches,
      isComplete: recentAvalancheIds.length > 0,
      label: t(`${key}.avalanches`),
      value: String(recentAvalancheIds.length),
    },
    {
      id: sectionIds.conditions,
      isComplete: filledConditions === conditions.length,
      label: t(`${key}.conditions`),
      value: `${filledConditions}/${conditions.length}`,
    },
  ]
}

export default useSectionStatus
