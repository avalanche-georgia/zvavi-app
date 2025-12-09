import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { weatherStations } from './constants'

import { Icon } from '@/UI/components'

const StationsList = () => {
  const t = useTranslations()

  return (
    <ul className="space-y-3">
      {weatherStations.map((station) => (
        <li
          key={station.id}
          className="flex h-20 items-center justify-between gap-3 rounded-lg bg-gray-100 px-3"
        >
          <div className="flex items-center gap-2">
            <Icon icon="mapPin" />
            <span className="font-medium">{t(`weatherStations.stations.${station.id}`)}</span>
          </div>

          <Link
            className="flex items-center gap-2 transition-colors active:text-primary lg:hover:text-primary lg:hover:underline"
            href={station.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t('common.actions.open')}</span>
            <Icon icon="externalLink" size="sm" />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default StationsList
