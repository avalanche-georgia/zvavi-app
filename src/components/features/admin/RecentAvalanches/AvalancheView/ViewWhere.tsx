import { AspectsOverview, DetailSection } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

const ViewWhere = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { aspects, latitude, location, longitude } = avalanche
  const hasCoordinates = latitude !== null && longitude !== null

  return (
    <DetailSection title={t('admin.recentAvalanches.view.where')}>
      <AspectsOverview aspects={aspects} />

      {(location || hasCoordinates) && (
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          {location && (
            <div>
              <dt className="text-muted text-xs">
                {t('admin.recentAvalanches.form.labels.location')}
              </dt>
              <dd>{location}</dd>
            </div>
          )}
          {hasCoordinates && (
            <div>
              <dt className="text-muted text-xs">{t('admin.recentAvalanches.view.coordinates')}</dt>
              <dd className="tabular-nums">
                {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </dd>
            </div>
          )}
        </dl>
      )}
    </DetailSection>
  )
}

export default ViewWhere
