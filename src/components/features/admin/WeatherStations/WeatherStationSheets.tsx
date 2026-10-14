'use client'

import { CreateEditSheets, type FormSheetFormProps } from '@components/features/admin/shared'
import type { WeatherStation } from '@domain/types'
import { useTranslations } from 'next-intl'

import WeatherStationForm from './WeatherStationForm/WeatherStationForm'

type WeatherStationSheetsProps = {
  isCreateRequested: boolean
  onCreateClose: VoidFunction
  onEditClose: VoidFunction
  // The station being edited, once found in the list
  station: WeatherStation | null
}

const getEditTitle = ({ nameEn }: WeatherStation) => nameEn

const renderForm = (form: FormSheetFormProps, station?: WeatherStation) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <WeatherStationForm {...form} station={station} />
)

const WeatherStationSheets = ({
  isCreateRequested,
  onCreateClose,
  onEditClose,
  station,
}: WeatherStationSheetsProps) => {
  const t = useTranslations()

  return (
    <CreateEditSheets
      createTitle={t('admin.weatherStations.new')}
      getEditTitle={getEditTitle}
      isCreateRequested={isCreateRequested}
      onCreateClose={onCreateClose}
      onEditClose={onEditClose}
      record={station}
      renderForm={renderForm}
    />
  )
}

export default WeatherStationSheets
