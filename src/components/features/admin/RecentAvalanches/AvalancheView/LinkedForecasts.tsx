import { DetailSection } from '@components/features/observations'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Links to the forecast editor for now — switches to the forecast view page
// once it exists (local/forecasts/admin-forecast-view-draft.md)
const LinkedForecasts = ({ forecastIds }: { forecastIds: number[] }) => {
  const t = useTranslations()

  if (forecastIds.length === 0) return null

  return (
    <DetailSection title={t('admin.recentAvalanches.view.linkedForecasts')}>
      <div className="flex flex-wrap gap-2">
        {forecastIds.map((forecastId) => (
          <Link
            key={forecastId}
            className="rounded-sm border bg-gray-50 px-3 py-1.5 text-sm hover:bg-gray-100"
            href={routes.admin.forecasts.edit(forecastId)}
          >
            {t('admin.recentAvalanches.view.forecastLink', { id: forecastId })}
          </Link>
        ))}
      </div>
    </DetailSection>
  )
}

export default LinkedForecasts
