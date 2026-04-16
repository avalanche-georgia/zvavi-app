import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { toOptions } from '@components/ui'
import { avalancheProblemTypes, avalancheTriggers } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

export const useAvalancheDetailsForm = (setData: Dispatch<SetStateAction<Avalanche>>) => {
  const t = useTranslations()

  const typeOptions = [
    ...toOptions(avalancheProblemTypes, (key) => t(`common.avalancheTypes.${key}`)),
    { label: t('common.avalancheTypes.unknown'), value: 'unknown' },
  ]

  const triggerOptions = [
    ...Object.keys(avalancheTriggers)
      .filter((key) => key !== 'unknown')
      .map((key) => ({
        label: t(`admin.forecast.form.recentAvalanches.options.trigger.${key}`),
        value: key,
      })),
    { label: t('common.words.unknown'), value: 'unknown' },
  ]

  const handleChange = useCallback(
    (field: keyof Avalanche) => (value: unknown) =>
      setData((prev) => ({ ...prev, [field]: value })),
    [setData],
  )

  const handleInputChange = useCallback(
    (field: 'location' | 'involvement' | 'latitude' | 'longitude') =>
      ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isCoord = field === 'latitude' || field === 'longitude'

        setData((prev) => ({
          ...prev,
          [field]: isCoord ? (target.value === '' ? null : Number(target.value)) : target.value,
        }))
      },
    [setData],
  )

  return { handleChange, handleInputChange, triggerOptions, typeOptions }
}
