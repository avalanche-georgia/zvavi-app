import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared/ConfirmationDialog'
import { useForecastDelete, useForecastStatusToggle } from '@data/hooks/forecasts'
import { dateFormat } from '@domain/constants'
import type { FullForecast } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import Column from './Column'

type ForecastItemProps = {
  forecast: FullForecast
  onEdit: (forecast: FullForecast) => void
}

const ForecastItem = ({ forecast, onEdit }: ForecastItemProps) => {
  const t = useTranslations()

  const { mutateAsync: deleteForecast } = useForecastDelete()
  const { mutateAsync: toggleStatus } = useForecastStatusToggle()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)

  const formattedCreationDate = format(forecast.createdAt, dateFormat)
  const formattedValidUntilDate = format(forecast.validUntil, dateFormat)
  const deleteForecastModalDescription = `
    ${t('admin.forecasts.deleteForecastModal.description')}
    ${t('common.words.from').toLowerCase()} ${formattedCreationDate}
    ${t('common.words.to').toLowerCase()} ${formattedValidUntilDate}?
    `

  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    try {
      await deleteForecast(forecast.id)
      toastSuccess(t('admin.forecasts.messages.deleted'))
    } catch (error) {
      toastError('ForecastItem | handleDelete', { error })
    }
  }

  const isPublished = forecast.status === 'published'

  const handleStatusToggle = async () => {
    try {
      await toggleStatus({
        forecastId: forecast.id,
        status: isPublished ? 'draft' : 'published',
      })

      toastSuccess(t(`admin.forecasts.messages.${isPublished ? 'unpublished' : 'published'}`))
    } catch (error) {
      toastError('ForecastItem | handleStatusToggle', { error })
    }
  }

  const handleEdit = () => {
    onEdit(forecast)
  }

  return (
    <>
      <div className="flex h-12 items-center gap-4 px-4">
        <Column>{forecast.forecaster}</Column>
        <Column>{formattedCreationDate}</Column>
        <Column>{formattedValidUntilDate}</Column>
        <Column>{forecast.status}</Column>
        <Column className="pr-4 text-right">
          <ActionButtons
            isPublished={isPublished}
            onDelete={openDeletionDialog}
            onEdit={handleEdit}
            onStatusToggle={handleStatusToggle}
          />
        </Column>
      </div>

      <ConfirmationDialog
        description={deleteForecastModalDescription}
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.forecasts.deleteForecastModal.title')}
        variant="delete"
      />
    </>
  )
}

export default ForecastItem
