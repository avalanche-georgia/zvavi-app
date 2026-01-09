import { RadioGroup } from '@components/ui'
import type { AvalancheSize as AvalancheSizeType } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useProblemOptions } from '../hooks'
import InputBlock from '../InputBlock'

type AvalancheSizeProps = {
  onChange: (value: AvalancheSizeType) => void
  value: number
}

const AvalancheSize = ({ onChange, value }: AvalancheSizeProps) => {
  const tForecastCommon = useTranslations('admin.forecast.form.common')
  const { avalancheSizeOptions } = useProblemOptions()

  return (
    <InputBlock label={tForecastCommon('labels.avalancheSize')} labelClassName="w-32">
      <RadioGroup
        onChange={onChange as (size: string | number) => void}
        options={avalancheSizeOptions}
        value={value}
      />
    </InputBlock>
  )
}

export default AvalancheSize
