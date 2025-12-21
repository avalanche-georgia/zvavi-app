import type { Distribution } from '@domain/types'
import { useTranslations } from 'next-intl'

import { DistributionIcon } from './icons'
import PropertyTile from './PropertyTile'

const Distribution = ({ distribution }: { distribution: Distribution }) => {
  const t = useTranslations()
  const valueText = t(`admin.forecast.form.problems.options.distribution.${distribution}`)

  return (
    <PropertyTile
      property={{
        info: t(`forecast.sections.avalancheProblems.modal.info.distribution.${distribution}`),
        name: 'distribution',
        value: valueText,
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="font-semibold">{valueText}</p>

        <div className="ml-auto">
          <DistributionIcon distribution={distribution} />
        </div>
      </div>
    </PropertyTile>
  )
}

export default Distribution
