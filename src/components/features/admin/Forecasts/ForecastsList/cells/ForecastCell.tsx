import type { ForecastListItem } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import LinkPendingIndicator from './LinkPendingIndicator'
import { toPlainText } from '../model'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

// "#180 Forecaster" (only the name opens the forecast) + one-line summary
const ForecastCell = ({ forecast }: { forecast: ForecastListItem }) => {
  const t = useTranslations()
  const { forecaster, id, summary } = forecast
  const excerpt = toPlainText(summary)

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="bg-tile rounded-badge text-caption text-body shrink-0 px-1.5 font-mono">
          #{id}
        </span>
        <Link
          className="focus-ring text-ink hover:text-accent truncate rounded-sm font-semibold hover:underline"
          href={routes.admin.forecasts.view(id)}
          // The view page doesn't exist yet — don't prefetch a 404
          prefetch={false}
        >
          {forecaster || '—'}
          <LinkPendingIndicator />
        </Link>
      </div>
      <p className={cn('text-caption text-muted max-w-95 truncate', !excerpt && 'italic')}>
        {excerpt || t('admin.forecasts.list.noSummary')}
      </p>
    </div>
  )
}

export default ForecastCell
