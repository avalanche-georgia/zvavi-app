import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { useForecastDelete, useForecastStatusToggle } from '@data/hooks/forecasts'
import { dateFormat } from '@domain/constants'
import type { FullForecast, RegionId } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import ActionButtons from './ActionButtons'

import { routes } from '@/routes'

type ForecastItemProps = {
  forecast: FullForecast
  regionId: RegionId
}

const ForecastItem = ({ forecast, regionId }: ForecastItemProps) => {
  const t = useTranslations()
  const router = useRouter()

  const { mutateAsync: deleteForecast } = useForecastDelete()
  const { mutateAsync: toggleStatus } = useForecastStatusToggle()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const [isStatusDialogOpen, { setFalse: closeStatusDialog, setTrue: openStatusDialog }] =
    useBoolean(false)

  const { createdAt, forecaster, id, publishedAt, status, validUntil } = forecast

  const { toastError, toastSuccess } = useToast()
  const formattedCreationDate = format(createdAt, dateFormat)
  const formattedValidUntilDate = format(validUntil, dateFormat)
  const formattedPublishedAtDate = publishedAt ? format(publishedAt, dateFormat) : '–'
  const deleteDescription = `${t('admin.forecasts.deleteForecastModal.description')} ${t('common.words.from').toLowerCase()} ${formattedCreationDate} ${t('common.words.to').toLowerCase()} ${formattedValidUntilDate}?`

  const handleDelete = async () => {
    try {
      await deleteForecast(id)
      toastSuccess(t('admin.forecasts.messages.deleted'))
    } catch (error) {
      toastError('ForecastItem | handleDelete', { error })
    }
  }

  const handleDuplicate = () => {
    router.push(`${routes.admin.forecasts.newInRegion(regionId)}&duplicateId=${id}`)
  }

  const isPublished = status === 'published'
  const statusKey = isPublished ? 'unpublish' : 'publish'

  const handleStatusToggle = async () => {
    try {
      await toggleStatus({ forecastId: id, status: isPublished ? 'draft' : 'published' })

      toastSuccess(t(`admin.forecasts.messages.${isPublished ? 'unpublished' : 'published'}`))
    } catch (error) {
      toastError('ForecastItem | handleStatusToggle', { error })
    } finally {
      closeStatusDialog()
    }
  }

  return (
    <>
      <div className="flex h-12 items-center gap-4 px-4">
        <div className="w-64">{forecaster}</div>
        <div className="w-32">{formattedCreationDate}</div>
        <div className="w-32">{formattedValidUntilDate}</div>
        <div className="w-32 flex-1">{formattedPublishedAtDate}</div>
        <div className="w-28">{status}</div>
        <div className="w-52 pr-4 text-right">
          <ActionButtons
            editHref={routes.admin.forecasts.editInRegion(id, regionId)}
            forecastPath={routes.forecastsByRegion(regionId).view(id)}
            isPublished={isPublished}
            onDelete={openDeletionDialog}
            onDuplicate={handleDuplicate}
            onStatusToggle={openStatusDialog}
          />
        </div>
      </div>

      <ConfirmationDialog
        description={deleteDescription}
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.forecasts.deleteForecastModal.title')}
        variant="delete"
      />

      <ConfirmationDialog
        description={t(`admin.forecasts.statusModal.${statusKey}Description`)}
        isOpen={isStatusDialogOpen}
        onClose={closeStatusDialog}
        onConfirm={handleStatusToggle}
        title={t(`admin.forecasts.statusModal.${statusKey}Title`)}
      />
    </>
  )
}

export default ForecastItem
