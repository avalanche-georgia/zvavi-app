'use client'

import { Modal } from '@components/ui'
import type { WeatherStation } from '@domain/types'
import { useTranslations } from 'next-intl'

import WeatherStationForm from './WeatherStationForm/WeatherStationForm'

type WeatherStationFormModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  station: WeatherStation | null
}

const WeatherStationFormModal = ({ isOpen, onClose, station }: WeatherStationFormModalProps) => {
  const t = useTranslations()
  const title = station
    ? t('admin.weatherStations.form.title.edit')
    : t('admin.weatherStations.form.title.create')

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <WeatherStationForm onClose={onClose} station={station} />
    </Modal>
  )
}

export default WeatherStationFormModal
