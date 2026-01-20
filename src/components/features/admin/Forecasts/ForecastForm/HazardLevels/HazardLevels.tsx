import { RadioGroup } from '@components/ui'
import type { ElevationKey, HazardLevelScale } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { InputBlock, useProblemOptions } from '../common'
import type { ForecastFormSchema } from '../schema'

const HazardLevels = () => {
  const t = useTranslations()
  const { hazardLevelOptions } = useProblemOptions()
  const { control } = useFormContext<ForecastFormSchema>()

  return (
    <div className="flex flex-1 flex-col gap-4 pt-1.5">
      <h3 className="text-xl font-semibold">
        {t('admin.forecast.form.general.labels.hazardLevels')}
      </h3>

      <div className="grid grid-cols-2 items-start gap-x-6">
        <InputBlock className="flex-1" label={t('common.words.overall')}>
          <Controller
            control={control}
            name="hazardLevels.overall"
            render={({ field }) => (
              <RadioGroup
                name="overall"
                onChange={(value) => field.onChange(value as HazardLevelScale)}
                options={hazardLevelOptions}
                value={field.value}
              />
            )}
          />
        </InputBlock>

        <div className="flex-1">
          {(['highAlpine', 'alpine', 'subAlpine'] as const).map((zone) => (
            <InputBlock key={zone} label={t(`common.elevationZones.${zone}`)}>
              <Controller
                control={control}
                name={`hazardLevels.${zone}` as `hazardLevels.${ElevationKey}`}
                render={({ field }) => (
                  <RadioGroup
                    name={zone}
                    onChange={(value) => field.onChange(value as HazardLevelScale)}
                    options={hazardLevelOptions}
                    value={field.value}
                  />
                )}
              />
            </InputBlock>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HazardLevels
