import { useCallback } from 'react'
import { useBoolean } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import Properties from './Properties'
import { ActionButtons, Aspects } from '../../../common/listItem'

type ProblemItemProps = {
  canEdit: boolean
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  order: number
  problemData: Problem
}

const ProblemItem = ({ canEdit, onDelete, onEdit, order, problemData }: ProblemItemProps) => {
  const t = useTranslations()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)

  const { description, type: problemType } = problemData

  const handleDelete = useCallback(() => {
    onDelete(String(problemData.id!))
  }, [onDelete, problemData.id])

  const handleEdit = useCallback(() => {
    onEdit(String(problemData.id!))
  }, [onEdit, problemData])

  return (
    <>
      <div className="w-full rounded-sm bg-black/3 p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
            {order}
          </span>

          <h3 className="flex-1 text-xl font-semibold">
            {t(`admin.forecast.form.problems.options.problemType.${problemType}`)}
          </h3>

          <ActionButtons canEdit={canEdit} onDelete={openDeletionDialog} onEdit={handleEdit} />
        </div>

        <div className="mb-3 flex items-start gap-6">
          <Properties problemData={problemData} />
          <Aspects className="w-[355px]" item={problemData} />
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
        title={`${t('common.actions.delete')} ${t(`admin.forecast.form.problems.options.problemType.${problemType}`)}?`}
        variant="delete"
      />
    </>
  )
}

export default ProblemItem
