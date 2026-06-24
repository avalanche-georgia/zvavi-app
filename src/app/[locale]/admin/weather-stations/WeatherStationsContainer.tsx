'use client'

import { useCallback, useState } from 'react'
import {
  WeatherStationFormModal,
  WeatherStationsList,
} from '@components/features/admin/WeatherStations'
import { useSortableList, useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import { useWeatherStationsQuery, useWeatherStationsReorder } from '@data/hooks/weatherStations'
import type { WeatherStation } from '@domain/types'
import { useTranslations } from 'next-intl'

const WeatherStationsContainer = () => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { data: stations, isPending } = useWeatherStationsQuery()
  const { mutateAsync: reorder } = useWeatherStationsReorder()

  const { handleReorder, localItems: localStations } = useSortableList(stations, reorder, (error) =>
    toastError('WeatherStationsContainer | handleReorder', { error }),
  )

  const [formTarget, setFormTarget] = useState<WeatherStation | null | undefined>(undefined)

  const isModalOpen = formTarget !== undefined
  const formKey = formTarget === undefined ? 'closed' : (formTarget?.id ?? 'new')

  const handleClose = () => setFormTarget(undefined)
  const handleNew = () => setFormTarget(null)
  const handleEdit = useCallback((station: WeatherStation) => setFormTarget(station), [])

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b bg-white px-4 py-3 md:px-6">
        <div />
        <Button onClick={handleNew}>
          <Icon icon="plus" size="sm" />
          {t('admin.weatherStations.new')}
        </Button>
      </div>

      <div className="p-4 md:p-6">
        <WeatherStationsList
          isLoading={isPending}
          onEdit={handleEdit}
          onReorder={handleReorder}
          stations={localStations}
        />
      </div>

      <WeatherStationFormModal
        key={formKey}
        isOpen={isModalOpen}
        onClose={handleClose}
        station={formTarget ?? null}
      />
    </>
  )
}

export default WeatherStationsContainer
