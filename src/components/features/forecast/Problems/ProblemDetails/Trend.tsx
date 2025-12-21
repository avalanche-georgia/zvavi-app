import type { Trend } from '@domain/types'
import { useTranslations } from 'next-intl'

import { TrendIcon } from './icons'
import PropertyTile from './PropertyTile'

const Trend = ({ trend }: { trend: Trend }) => {
  const t = useTranslations()
  const valueText = t(`admin.forecast.form.problems.options.trend.${trend}`)

  return (
    <PropertyTile
      property={{
        info: t(`forecast.sections.avalancheProblems.modal.info.trend.${trend}`),
        name: 'trend',
        value: valueText,
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="font-semibold">{valueText}</p>
        <div className="ml-auto w-16">
          <TrendIcon value={trend} />
        </div>
      </div>
    </PropertyTile>
  )
}

export default Trend
