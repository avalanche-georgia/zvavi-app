import { DetailSection } from '@components/features/observations'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Opens the forecast's view page
const LinkedForecasts = ({ forecastIds }: { forecastIds: number[] }) => {
  const t = useTranslations()

  if (forecastIds.length === 0) return null

  return (
    <DetailSection title={t('admin.recentAvalanches.view.linkedForecasts')}>
      <div className="flex flex-wrap gap-2">
        {forecastIds.map((forecastId) => (
          <Link
            key={forecastId}
            className="rounded-control border-rule bg-surface text-copy-sm text-ink hover:bg-tile focus-ring border px-3 py-1.5 transition-colors"
            href={routes.admin.forecasts.view(forecastId)}
          >
            {t('admin.recentAvalanches.view.forecastLink', { id: forecastId })}
          </Link>
        ))}
      </div>
    </DetailSection>
  )
}

export default LinkedForecasts
