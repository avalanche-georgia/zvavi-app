import { useCallback } from 'react'
import { useBoolean } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared/ConfirmationDialog'
import { dateFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { ActionButtons, Aspects, PropertyWrapper } from '../../common/listItem'

type AvalancheItemProps = {
  avalanche: Avalanche
  canEdit: boolean
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

const AvalancheItem = ({ avalanche, canEdit, onDelete, onEdit }: AvalancheItemProps) => {
  const tForm = useTranslations('admin.forecast.form')
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const { date, description, size } = avalanche

  const handleDelete = useCallback(() => {
    onDelete(avalanche.id!)
  }, [onDelete, avalanche])

  const handleEdit = useCallback(() => {
    onEdit(avalanche.id!)
  }, [onEdit, avalanche])

  return (
    <>
      <div className="w-full rounded bg-black/[0.03] p-3">
        <div className="mb-3 flex items-center justify-between">
          {date && <h3 className="text-xl font-semibold">{format(date, dateFormat)}</h3>}
          <ActionButtons canEdit={canEdit} onDelete={openDeletionDialog} onEdit={handleEdit} />
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-1">
            <PropertyWrapper title={tForm('common.labels.avalancheSize')}>
              <p>{size}</p>
            </PropertyWrapper>
          </div>

          <Aspects className="w-[355px]" item={avalanche} />
        </div>

        {description && (
          <div>
            <h4 className="mb-2 font-semibold">{tForm('common.labels.description')}:</h4>
            <p className="max-h-28 overflow-y-auto text-justify">{description}</p>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={tForm('recentAvalanches.labels.deleteAvalanche')}
        variant="delete"
      />
    </>
  )
}

export default AvalancheItem
