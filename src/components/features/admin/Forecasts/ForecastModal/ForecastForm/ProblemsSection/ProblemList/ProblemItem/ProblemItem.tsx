import { useCallback } from 'react'
import { useBoolean } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared/ConfirmationDialog'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import Properties from './Properties'
import { ActionButtons, Aspects } from '../../../common/listItem'

type ProblemItemProps = {
  canEdit: boolean
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  problemData: Problem
}

const ProblemItem = ({ canEdit, onDelete, onEdit, problemData }: ProblemItemProps) => {
  const tActions = useTranslations('common.actions')
  const tForm = useTranslations('admin.forecast.form')
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)

  const { description, type: problemType } = problemData

  const handleDelete = useCallback(() => {
    onDelete(problemData.id!)
  }, [onDelete, problemData.id])

  const handleEdit = useCallback(() => {
    onEdit(problemData.id!)
  }, [onEdit, problemData])

  return (
    <>
      <div className="w-full rounded bg-black/[0.03] p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {tForm(`problems.options.problemType.${problemType}`)}
          </h3>

          <ActionButtons canEdit={canEdit} onDelete={openDeletionDialog} onEdit={handleEdit} />
        </div>

        <div className="mb-6 flex items-center justify-between gap-6">
          <Properties problemData={problemData} />
          <Aspects className="w-[355px]" item={problemData} />
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
        title={`${tActions('delete')} ${tForm(`problems.options.problemType.${problemType}`)}?`}
        variant="delete"
      />
    </>
  )
}

export default ProblemItem
