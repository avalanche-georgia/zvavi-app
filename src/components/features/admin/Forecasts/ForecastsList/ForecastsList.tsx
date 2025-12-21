import { useState } from 'react'
import { useBoolean } from '@components/hooks'
import { Icon } from '@components/shared'
import { Button } from '@components/ui'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import Column from './Column'
import ForecastItem from './ForecastItem'
import { ForecastModal } from '../ForecastModal'

const ForecastsList = ({ forecasts }: { forecasts: FullForecast[] }) => {
  const tAdmin = useTranslations('admin')
  const [isModalOpen, { setFalse: closeModal, setTrue: openModal }] = useBoolean(false)
  const [editableForecast, setEditableForecast] = useState<FullForecast | null>(null)

  const handleForecastEdit = (forecast: FullForecast) => {
    setEditableForecast(forecast)
    openModal()
  }

  const handleModalClose = () => {
    closeModal()
    setEditableForecast(null)
  }

  return (
    <>
      <Button className="my-4 ml-auto" onClick={openModal}>
        <Icon icon="plus" size="sm" />
        {tAdmin('forecast.title.create')}
      </Button>

      <div className="w-full">
        <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
          <Column className="font-semibold">{tAdmin('forecasts.list.columns.forecaster')}</Column>
          <Column className="font-semibold">{tAdmin('forecasts.list.columns.createdAt')}</Column>
          <Column className="font-semibold">{tAdmin('forecasts.list.columns.validUntil')}</Column>
          <Column className="font-semibold">{tAdmin('forecasts.list.columns.status')}</Column>
          <Column className="pr-4 text-right font-semibold">
            {tAdmin('forecasts.list.columns.actions')}
          </Column>
        </div>

        <ul className="flex flex-col">
          {forecasts.map((forecast) => (
            <li key={forecast.id} className="border-b last:border-0">
              <ForecastItem forecast={forecast} onEdit={handleForecastEdit} />
            </li>
          ))}
        </ul>
      </div>

      <ForecastModal forecast={editableForecast} isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  )
}

export default ForecastsList
