'use client'

import { useListDates } from '@components/features/admin/shared'
import { ConfirmationDialog } from '@components/shared'
import { hazardLevelNamesByScale, sortedElevationZones } from '@domain/constants'
import type { ForecastListItem, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

type PublishConfirmDialogProps = {
  forecast: Pick<ForecastListItem, 'hazardLevels' | 'id' | 'validUntil'>
  isOpen: boolean
  onConfirm: VoidFunction
  onOpenChange: (isOpen: boolean) => void
  regionId: RegionId
}

// Publishing is public at once (site + partner apps): show what goes out first
const PublishConfirmDialog = ({
  forecast: { hazardLevels, id, validUntil },
  isOpen,
  onConfirm,
  onOpenChange,
  regionId,
}: PublishConfirmDialogProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const handleCancel = () => onOpenChange(false)
  const levelOf = (level: HazardLevelScale) => `${t(hazardLevelNamesByScale[level])} (${level})`

  return (
    <ConfirmationDialog
      confirmLabel={t('admin.forecasts.publishConfirm.confirm')}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={onConfirm}
      title={t('admin.forecasts.publishConfirm.title', { id })}
      type="publish"
    >
      <div className="flex flex-col gap-3">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="text-muted">{t('admin.forecasts.publishConfirm.region')}</dt>
          <dd>{t(`regions.names.${regionId}`)}</dd>
          <dt className="text-muted">{t('admin.forecasts.publishConfirm.overall')}</dt>
          <dd className="font-semibold">
            {hazardLevels.overall ? levelOf(hazardLevels.overall) : '—'}
          </dd>
          {sortedElevationZones.map((zone) => (
            <div key={zone} className="contents">
              <dt className="text-muted">{t(`common.elevationZones.${zone}`)}</dt>
              <dd>{levelOf(hazardLevels[zone])}</dd>
            </div>
          ))}
          <dt className="text-muted">{t('admin.forecasts.publishConfirm.validUntil')}</dt>
          <dd>{validUntil ? `${formatDate(validUntil)}, ${formatTime(validUntil)}` : '—'}</dd>
        </dl>
        <p>{t('admin.forecasts.publishConfirm.visibility')}</p>
      </div>
    </ConfirmationDialog>
  )
}

export default PublishConfirmDialog
