import { useCallback } from 'react'
import { useBoolean } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { dateFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { ActionButtons, Aspects, PropertyWrapper } from '../../common/listItem'

type AvalancheItemProps = {
  avalanche: Avalanche & { localId: string }
  canEdit: boolean
  onDelete: (localId: string) => void
  onEdit: (localId: string) => void
}

const AvalancheItem = ({ avalanche, canEdit, onDelete, onEdit }: AvalancheItemProps) => {
  const t = useTranslations()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const { date, description, isDateUnknown, localId, size } = avalanche

  const dateDisplay = isDateUnknown
    ? t('admin.forecast.form.recentAvalanches.labels.dateUnknown')
    : date
      ? format(date, dateFormat)
      : null

  const handleDelete = useCallback(() => {
    onDelete(localId)
  }, [onDelete, localId])

  const handleEdit = useCallback(() => {
    onEdit(localId)
  }, [onEdit, localId])

  return (
    <>
      <div className="w-full rounded-sm bg-slate-100 p-3 shadow">
        <div className="mb-3 flex items-center justify-between">
          {dateDisplay && <h3 className="text-xl font-semibold">{dateDisplay}</h3>}
          <ActionButtons canEdit={canEdit} onDelete={openDeletionDialog} onEdit={handleEdit} />
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-1">
            <PropertyWrapper title={t('admin.forecast.form.common.labels.avalancheSize')}>
              <p>{size}</p>
            </PropertyWrapper>
          </div>

          <Aspects className="w-[355px]" item={avalanche} />
        </div>

        {description && (
          <div>
            <h4 className="mb-2 font-semibold">
              {t('admin.forecast.form.common.labels.description')}:
            </h4>
            <p className="max-h-28 overflow-y-auto text-justify">{description}</p>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.forecast.form.recentAvalanches.labels.deleteAvalanche')}
        variant="delete"
      />
    </>
  )
}

export default AvalancheItem
