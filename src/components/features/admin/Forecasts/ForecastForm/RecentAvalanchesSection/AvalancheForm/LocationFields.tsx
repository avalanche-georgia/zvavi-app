import { InputBlock, TextInput } from '@components'
import { useTranslations } from 'next-intl'

import type { AvalancheDetailsSectionProps } from './AvalancheDetailsSection'
import { useAvalancheDetailsForm } from './useAvalancheDetailsForm'

const coordinateInputClass =
  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

const LocationFields = ({
  data,
  errors,
  isLocationRequired,
  setData,
}: AvalancheDetailsSectionProps) => {
  const t = useTranslations()

  const { handleInputChange } = useAvalancheDetailsForm(setData)

  const getError = (message: string | undefined) =>
    message ? t(`common.validation.${message}`) : undefined

  return (
    <>
      <InputBlock
        className="col-span-2"
        label={t('admin.forecast.form.recentAvalanches.labels.location')}
      >
        <TextInput
          name="avalanche-location"
          onChange={handleInputChange('location')}
          value={data.location ?? ''}
        />
      </InputBlock>

      <InputBlock
        error={getError(errors?.latitude)}
        label={t('admin.forecast.form.recentAvalanches.labels.latitude')}
        required={isLocationRequired}
      >
        <TextInput
          className={coordinateInputClass}
          name="latitude"
          onChange={handleInputChange('latitude')}
          type="number"
          value={data.latitude ?? ''}
        />
      </InputBlock>

      <InputBlock
        error={getError(errors?.longitude)}
        label={t('admin.forecast.form.recentAvalanches.labels.longitude')}
        required={isLocationRequired}
      >
        <TextInput
          className={coordinateInputClass}
          name="longitude"
          onChange={handleInputChange('longitude')}
          type="number"
          value={data.longitude ?? ''}
        />
      </InputBlock>
    </>
  )
}

export default LocationFields
