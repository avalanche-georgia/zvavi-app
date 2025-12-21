import Spoiler from '@components/shared/Spoiler'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'

const RecentAvalanches = ({ avalanches }: { avalanches: Avalanche[] }) => {
  const t = useTranslations()

  if (avalanches.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-4">
        <h4 className="text-sm">{t('forecast.sections.recentAvalanches.title')}</h4>
        <p className="text-center text-xs text-gray-500">
          {t('forecast.sections.recentAvalanches.noAvalanches')}
        </p>
      </div>
    )
  }

  return (
    <Spoiler title={t('forecast.sections.recentAvalanches.title')}>
      <ul>
        {avalanches.map((avalanche, index) => (
          <li key={avalanche.id}>
            <AvalancheItem avalanche={avalanche} />
            {index < avalanches.length - 1 && <hr className="my-4 border-gray-300" />}
          </li>
        ))}
      </ul>
    </Spoiler>
  )
}

export default RecentAvalanches
