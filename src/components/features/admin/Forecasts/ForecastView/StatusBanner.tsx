'use client'

import type { AdminForecast, Forecast } from '@domain/types'
import { Button } from '@ds/primitives'
import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { ForecastViewStatus } from './model'
import useBannerContent from './useBannerContent'
import { LinkPendingIndicator } from '../shared'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type StatusBannerProps = {
  currentForecast: Pick<Forecast, 'createdAt' | 'id'> | null
  forecast: AdminForecast
  isDuplicating: boolean
  now: Date
  onDuplicate: VoidFunction
  status: ForecastViewStatus
}

const StatusBanner = ({
  currentForecast,
  forecast,
  isDuplicating,
  now,
  onDuplicate,
  status,
}: StatusBannerProps) => {
  const t = useTranslations()
  const { className, hasClock, lead, rest } = useBannerContent(
    forecast,
    status,
    currentForecast,
    now,
  )

  return (
    <div
      className={cn(
        'text-copy-sm flex items-center gap-3 rounded-[14px] py-3 pr-3.5 pl-4 leading-[1.45]',
        className,
      )}
      role="status"
    >
      {hasClock && <Clock aria-hidden className="text-danger size-4.5 shrink-0" />}
      <p className="min-w-0 flex-1">
        <strong className="font-semibold">{lead}</strong> {rest}
      </p>
      {status === 'expired' && (
        <Button isBusy={isDuplicating} onClick={onDuplicate} size="sm" variant="secondary">
          {t('admin.forecasts.actions.duplicate')}
        </Button>
      )}
      {status === 'superseded' && currentForecast && (
        <Link
          className="text-accent shrink-0 font-semibold hover:underline"
          href={routes.admin.forecasts.view(currentForecast.id)}
        >
          {t('admin.forecasts.view.banner.superseded.open', { id: currentForecast.id })}
          <LinkPendingIndicator />
        </Link>
      )}
    </div>
  )
}

export default StatusBanner
