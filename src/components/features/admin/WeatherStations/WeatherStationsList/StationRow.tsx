'use client'

import { RecordMenu } from '@components/features/admin/shared'
import { useToast } from '@components/hooks'
import { useWeatherStationDelete } from '@data/hooks/weatherStations'
import type { WeatherStation } from '@domain/types'
import { Badge, IconButton, MenuItem } from '@ds/primitives'
import { ExternalLink, GripVertical, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

type StationRowProps = {
  dragHandleRef: (element: Element | null) => void
  onEdit: (id: string) => void
  station: WeatherStation
}

const StationRow = ({ dragHandleRef, onEdit, station }: StationRowProps) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: deleteStation } = useWeatherStationDelete()
  const { altitude, id, latitude, nameEn, nameKa, url } = station

  const handleDelete = async () => {
    try {
      await deleteStation(id)
      toastSuccess(t('admin.weatherStations.form.messages.deleted'))
    } catch (error) {
      toastError('StationRow | handleDelete', { error })
    }
  }

  return (
    <div className="flex min-h-15 items-center gap-2 py-2 pr-3 pl-2">
      <IconButton
        ref={dragHandleRef}
        aria-label={t('admin.weatherStations.dragStation', { name: nameEn })}
        className="text-muted cursor-grab touch-none active:cursor-grabbing"
        tooltip={t('admin.weatherStations.dragToReorder')}
      >
        <GripVertical className="size-4.5" />
      </IconButton>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
        <button
          className="focus-ring text-copy text-ink hover:text-accent max-w-full truncate rounded-sm font-semibold hover:underline"
          onClick={() => onEdit(id)}
          type="button"
        >
          {nameEn}
        </button>
        {nameKa && <p className="text-caption text-muted max-w-full truncate">{nameKa}</p>}
      </div>

      {latitude == null && (
        <Badge className="shrink-0">{t('admin.weatherStations.noLocation')}</Badge>
      )}

      <span className="text-copy text-body shrink-0 px-2 tabular-nums">
        {t('common.units.meters', { value: altitude })}
      </span>

      <RecordMenu
        deleteMessage={t('admin.weatherStations.deleteConfirm', { name: nameEn })}
        label={t('admin.weatherStations.moreForStation', { name: nameEn })}
        onDelete={handleDelete}
      >
        <MenuItem icon={<Pencil />} onClick={() => onEdit(id)}>
          {t('common.actions.edit')}
        </MenuItem>
        <MenuItem
          icon={<ExternalLink />}
          onClick={() => void window.open(url, '_blank', 'noopener')}
        >
          {t('admin.weatherStations.openStation')}
        </MenuItem>
      </RecordMenu>
    </div>
  )
}

export default StationRow
