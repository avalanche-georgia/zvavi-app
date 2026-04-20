import { type Dispatch, type SetStateAction } from 'react'
import { InputBlock, NumberInput, Select, Textarea } from '@components/ui'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import LocationFields from './LocationFields'
import { useAvalancheDetailsForm } from './useAvalancheDetailsForm'

export type AvalancheDetailsSectionProps = {
  data: Avalanche
  errors?: { trigger?: string; type?: string }
  setData: Dispatch<SetStateAction<Avalanche>>
}

const AvalancheDetailsSection = ({ data, errors, setData }: AvalancheDetailsSectionProps) => {
  const t = useTranslations()
  const { handleChange, handleInputChange, triggerOptions, typeOptions } =
    useAvalancheDetailsForm(setData)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <InputBlock
            error={errors?.type}
            label={t('admin.forecast.form.recentAvalanches.labels.type')}
          >
            <Select
              hasError={!!errors?.type}
              onChange={(value) => handleChange('type')(value)}
              options={typeOptions}
              placeholder={t('admin.forecast.form.recentAvalanches.labels.typePlaceholder')}
              value={data.type ?? undefined}
            />
          </InputBlock>

          <InputBlock
            error={errors?.trigger}
            label={t('admin.forecast.form.recentAvalanches.labels.trigger')}
          >
            <Select
              hasError={!!errors?.trigger}
              onChange={(value) => handleChange('trigger')(value)}
              options={triggerOptions}
              placeholder={t('admin.forecast.form.recentAvalanches.labels.triggerPlaceholder')}
              value={data.trigger ?? undefined}
            />
          </InputBlock>

          <InputBlock label={t('admin.forecast.form.recentAvalanches.labels.slabDepth')}>
            <NumberInput
              min={1}
              onValueChange={(value) => handleChange('slabDepth')(value)}
              value={data.slabDepth}
            />
          </InputBlock>

          <InputBlock label={t('admin.forecast.form.recentAvalanches.labels.width')}>
            <NumberInput
              min={1}
              onValueChange={(value) => handleChange('width')(value)}
              value={data.width}
            />
          </InputBlock>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LocationFields data={data} setData={setData} />
        </div>
      </div>

      <InputBlock label={t('admin.forecast.form.recentAvalanches.labels.involvement')}>
        <Textarea onChange={handleInputChange('involvement')} rows={2} value={data.involvement} />
      </InputBlock>
    </div>
  )
}

export default AvalancheDetailsSection
