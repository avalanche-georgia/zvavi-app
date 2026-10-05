'use client'

import { hazardLevelNamesByScale, sortedElevationZones } from '@domain/constants'
import type { HazardLevels, RegionId } from '@domain/types'
import { ConfirmDialog } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import useListDates from './useListDates'

type PublishConfirmDialogProps = {
  // Focus goes here after closing (the Publish button itself may be gone)
  finalFocus?: React.RefObject<HTMLElement | null>
  forecast: { hazardLevels: HazardLevels; id: number; validUntil: string | null }
  isOpen: boolean
  onConfirm: VoidFunction
  onOpenChange: (isOpen: boolean) => void
  regionId: RegionId
}

// Publishing is public at once (site + partner apps): show what goes out first
const PublishConfirmDialog = ({
  finalFocus,
  forecast: { hazardLevels, id, validUntil },
  isOpen,
  onConfirm,
  onOpenChange,
  regionId,
}: PublishConfirmDialogProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const levelOf = (level: HazardLevels[keyof HazardLevels]) =>
    `${t(hazardLevelNamesByScale[level])} (${level})`

  return (
    <ConfirmDialog
      cancelLabel={t('common.actions.cancel')}
      confirmLabel={t('admin.forecasts.publishConfirm.confirm')}
      finalFocus={finalFocus}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={onOpenChange}
      title={t('admin.forecasts.publishConfirm.title', { id })}
    >
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
    </ConfirmDialog>
  )
}

export default PublishConfirmDialog
