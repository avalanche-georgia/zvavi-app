import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Icon } from '@/UI/components'

type WeatherStation = {
  id: string
  url: string
}

const weatherStations: WeatherStation[] = [
  {
    id: 'ozon',
    url: 'https://www.wunderground.com/dashboard/pws/I90583577',
  },
  {
    id: 'kudebi',
    url: 'https://www.wunderground.com/dashboard/pws/IMTSKH9',
  },
  {
    id: 'altihut',
    url: 'https://www.wunderground.com/dashboard/pws/IMTSKH8',
  },
]

const StationsList = () => {
  const t = useTranslations()

  return (
    <ul className="flex flex-col gap-3">
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
