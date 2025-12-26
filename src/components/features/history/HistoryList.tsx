import { hazardIcons } from '@components/constants'
import { dateFormat } from '@domain/constants'
import type { Forecast } from '@domain/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

type HistoryListProps = {
  forecasts: Pick<Forecast, 'publishedAt' | 'id' | 'hazardLevels'>[]
}

const HistoryList = ({ forecasts }: HistoryListProps) => (
  <ul className="flex flex-col items-center">
    {forecasts.map((forecast) => (
      <li key={forecast.id}>
        <Link
          className={clsx(
            'inline-flex items-center gap-3 rounded-lg px-4 py-1',
            'text-gray-700 transition-colors hover:text-black active:bg-primary/10 lg:hover:bg-primary/10',
          )}
          href={`${routes.forecasts.root}/${forecast.id}`}
        >
          <Image
            alt="Danger level"
            height={48}
            src={hazardIcons[forecast.hazardLevels.overall]}
            width={48}
          />
          <span className="text-lg">{format(forecast.publishedAt!, dateFormat)}</span>
        </Link>
      </li>
    ))}
  </ul>
)

export default HistoryList
