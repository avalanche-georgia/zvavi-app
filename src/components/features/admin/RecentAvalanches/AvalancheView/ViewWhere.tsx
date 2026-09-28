'use client'

import { useState } from 'react'
import {
  AspectsOverview,
  DetailSection,
  hasCoordinates,
  LocationSheet,
} from '@components/features/observations'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

const noContextPoints: never[] = []

const ViewWhere = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const { aspects, location } = avalanche
  const coordinates = hasCoordinates(avalanche) ? avalanche : null

  return (
    <DetailSection title={t('admin.recentAvalanches.view.where')}>
      <AspectsOverview aspects={aspects} />

      {(location || coordinates) && (
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          {location && (
            <div>
              <dt className="text-muted text-xs">
                {t('admin.recentAvalanches.form.labels.location')}
              </dt>
              <dd>{location}</dd>
            </div>
          )}
          {coordinates && (
            <div>
              <dt className="text-muted text-xs">{t('admin.recentAvalanches.view.coordinates')}</dt>
              <dd className="tabular-nums">
                {coordinates.latitude.toFixed(5)}, {coordinates.longitude.toFixed(5)}
              </dd>
            </div>
          )}
        </dl>
      )}

      {/* Legacy records may have no coordinates */}
      {coordinates && (
        <>
          <Button className="mt-3" onClick={() => setIsLocationOpen(true)} variant="outline">
            <Icon icon="mapPin" size="sm" />
            {t('observations.detail.showOnMap')}
          </Button>
          <LocationSheet
            contextPoints={noContextPoints}
            isOpen={isLocationOpen}
            observation={coordinates}
            onClose={() => setIsLocationOpen(false)}
          />
        </>
      )}
    </DetailSection>
  )
}

export default ViewWhere
