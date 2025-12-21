import type { Sensitivity } from '@domain/types'
import { useTranslations } from 'next-intl'

import { SensitivityGauge } from './icons'
import PropertyTile from './PropertyTile'

const Sensitivity = ({ sensitivity }: { sensitivity: Sensitivity }) => {
  const t = useTranslations()
  const valueText = t(`admin.forecast.form.problems.options.sensitivityLevel.${sensitivity}`)

  return (
    <PropertyTile
      property={{
        info: t(`forecast.sections.avalancheProblems.modal.info.sensitivity.${sensitivity}`),
        name: 'sensitivity',
        value: valueText,
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="font-semibold">{valueText}</p>
        <SensitivityGauge
          className="ml-auto w-28"
          diameter={85}
          strokeWidth={14}
          value={sensitivity}
        />
      </div>
    </PropertyTile>
  )
}

export default Sensitivity
