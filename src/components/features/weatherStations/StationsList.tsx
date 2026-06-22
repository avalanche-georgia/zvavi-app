import { Icon } from '@components/icons'
import type { WeatherStation } from '@domain/types'
import { getTranslations } from 'next-intl/server'
import { Link } from 'src/i18n/navigation'

type StationsListProps = {
  locale: string
  stations: WeatherStation[]
}

const StationsList = async ({ locale, stations }: StationsListProps) => {
  const t = await getTranslations()

  if (!stations.length) return null

  return (
    <ul className="space-y-3">
      {stations.map((station) => (
        <li
          key={station.id}
          className="flex h-20 items-center justify-between gap-3 rounded-lg bg-gray-100 px-3"
        >
          <div className="flex items-center gap-2">
            <Icon icon="mapPin" />
            <span className="font-medium">
              {locale === 'ka' && station.nameKa ? station.nameKa : station.nameEn}
            </span>
          </div>

          <Link
            className="active:text-primary lg:hover:text-primary flex items-center gap-2 transition-colors lg:hover:underline"
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
