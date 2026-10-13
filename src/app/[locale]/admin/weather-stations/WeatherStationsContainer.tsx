'use client'

import {
  ListLoadError,
  useCreateSheetParam,
  useRecordSelection,
} from '@components/features/admin/shared'
import {
  WeatherStationSheets,
  WeatherStationsList,
} from '@components/features/admin/WeatherStations'
import { useSortableList, useToast } from '@components/hooks'
import { AdminPageBody } from '@components/layout/admin'
import { useWeatherStationsQuery, useWeatherStationsReorder } from '@data/hooks/weatherStations'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

const WeatherStationsContainer = () => {
  const t = useTranslations()
  const { toastError } = useToast()
  const stationsQuery = useWeatherStationsQuery()
  const { mutateAsync: reorder } = useWeatherStationsReorder()
  const createSheet = useCreateSheetParam()
  const selection = useRecordSelection({ defaultMode: 'edit', param: 'station' })

  const { handleReorder, localItems: stations } = useSortableList(
    stationsQuery.data,
    reorder,
    (error) => toastError('WeatherStationsContainer | handleReorder', { error }),
  )

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isLoadFailed = stationsQuery.isError && !stationsQuery.data
  const selectedStation = stations.find(({ id }) => id === selection.selectedId) ?? null

  const handleRetry = () => void stationsQuery.refetch()

  return (
    <>
      <AdminPageBody className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-copy-sm text-muted">{t('admin.weatherStations.orderHint')}</p>
          <Button onClick={createSheet.openCreate} size="sm">
            <Plus aria-hidden className="size-4" />
            {t('admin.weatherStations.new')}
          </Button>
        </div>
        {isLoadFailed ? (
          <ListLoadError onRetry={handleRetry} />
        ) : (
          <WeatherStationsList
            isLoading={stationsQuery.isPending}
            onEdit={selection.openRecord}
            onReorder={handleReorder}
            stations={stations}
          />
        )}
      </AdminPageBody>

      <WeatherStationSheets
        isCreateRequested={createSheet.isCreateOpen}
        onCreateClose={createSheet.closeCreate}
        onEditClose={selection.closeRecord}
        station={selectedStation}
      />
    </>
  )
}

export default WeatherStationsContainer
