import { problemIcons } from '@components'
import { Icon } from '@components/icons'
import { dateFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { format } from 'date-fns'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import AvalancheSizePip from './AvalancheSizePip'

const AvalancheHero = ({ avalanche }: { avalanche: Avalanche }) => {
  const t = useTranslations()

  const { date, isDateUnknown, location, quantity, size, slabDepth, type, width } = avalanche

  const dimensionsDisplay =
    width || slabDepth
      ? [width ? `${width}m` : null, slabDepth ? `${slabDepth}cm` : null]
          .filter(Boolean)
          .join(' / ')
      : null

  const dateDisplay = isDateUnknown
    ? t('forecast.sections.recentAvalanches.labels.dateUnknown')
    : date
      ? format(date, dateFormat)
      : null

  const typeIcon = type && type !== 'unknown' ? problemIcons[type] : null

  return (
    <div className="flex items-start gap-3">
      {typeIcon ? (
        <Image
          alt=""
          aria-hidden
          className="size-12 flex-none rounded-xl border sm:size-16"
          height={64}
          src={typeIcon}
          width={64}
        />
      ) : (
        <div className="flex size-12 flex-none items-center justify-center rounded-xl border bg-gray-100 text-2xl font-bold text-gray-400 sm:size-16">
          ?
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            {type && (
              <span className="text-lg font-bold sm:text-xl">
                {t(`common.avalancheTypes.${type}`)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <AvalancheSizePip size={size} />
              {quantity != null && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  ×{quantity}
                </span>
              )}
            </div>
          </div>
          {dateDisplay && (
            <span className="shrink-0 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              {dateDisplay}
            </span>
          )}
        </div>

        {(location || dimensionsDisplay) && (
          <div className="flex min-w-0 items-center gap-1 text-sm text-gray-500">
            {location && (
              <>
                <Icon className="shrink-0" icon="mapPin" size="sm" />
                <span className="truncate">{location}</span>
              </>
            )}
            {location && dimensionsDisplay && <span className="shrink-0">·</span>}
            {dimensionsDisplay && <span className="shrink-0">{dimensionsDisplay}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default AvalancheHero
