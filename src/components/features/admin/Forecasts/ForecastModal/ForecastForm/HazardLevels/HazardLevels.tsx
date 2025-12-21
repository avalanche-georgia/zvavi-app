import { useCallback } from 'react'
import { RadioGroup } from '@components/ui'
import type { BaseFormData, ElevationKey, HazardLevels as HazardLevelsType } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock, useProblemOptions } from '../common'

type HazardLevelsProps = {
  setFormData: (value: React.SetStateAction<BaseFormData>) => void
  value: HazardLevelsType
}

const HazardLevels = ({ setFormData, value }: HazardLevelsProps) => {
  const t = useTranslations()
  const { hazardLevelOptions } = useProblemOptions()

  const handleChange = useCallback(
    (level: string | number, elevationKey?: string) => {
      setFormData((prev) => ({
        ...prev,
        hazardLevels: { ...prev.hazardLevels, [elevationKey as ElevationKey]: level },
      }))
    },
    [setFormData],
  )

  return (
    <div className="flex flex-1 flex-col gap-4 pt-1.5">
      <h3 className="text-xl font-semibold">
        {t('admin.forecast.form.general.labels.hazardLevels')}
      </h3>

      <div className="grid grid-cols-2 items-start gap-x-6">
        <InputBlock className="flex-1" label={t('common.words.overall')}>
          <RadioGroup
            name="overall"
            onChange={handleChange}
            options={hazardLevelOptions}
            value={value.overall}
          />
        </InputBlock>

        <div className="flex-1">
          <InputBlock label={t('common.elevationZones.highAlpine')}>
            <RadioGroup
              name="highAlpine"
              onChange={handleChange}
              options={hazardLevelOptions}
              value={value.highAlpine}
            />
          </InputBlock>
          <InputBlock label={t('common.elevationZones.alpine')}>
            <RadioGroup
              name="alpine"
              onChange={handleChange}
              options={hazardLevelOptions}
              value={value.alpine}
            />
          </InputBlock>
          <InputBlock label={t('common.elevationZones.subAlpine')}>
            <RadioGroup
              name="subAlpine"
              onChange={handleChange}
              options={hazardLevelOptions}
              value={value.subAlpine}
            />
          </InputBlock>
        </div>
      </div>
    </div>
  )
}

export default HazardLevels
