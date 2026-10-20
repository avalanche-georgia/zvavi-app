import { DeleteDialog, DiscardDialog } from '@components/features/admin/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { AvalancheSheetConfirm, AvalancheSheetMode } from './types'
import { ViewActions } from '../AvalancheView'

type AvalancheSheetFooterProps = {
  avalanche: AvalancheListItem
  confirm: AvalancheSheetConfirm
  formId: string
  isDeleting: boolean
  isSaving: boolean
  mode: AvalancheSheetMode
  onConfirm: VoidFunction
  onConfirmCancel: VoidFunction
  onDelete: VoidFunction
  onEdit: VoidFunction
  onEditCancel: VoidFunction
  saveLabel?: string
}

const AvalancheSheetFooter = ({
  avalanche,
  confirm,
  formId,
  isDeleting,
  isSaving,
  mode,
  onConfirm,
  onConfirmCancel,
  onDelete,
  onEdit,
  onEditCancel,
  saveLabel,
}: AvalancheSheetFooterProps) => {
  const t = useTranslations()

  // Inside the sheet, so they nest: Esc closes only the dialog
  const dialogs = (
    <>
      <DeleteDialog
        isBusy={isDeleting}
        isOpen={confirm === 'delete'}
        message={t('admin.recentAvalanches.sheet.deleteConfirm')}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
      <DiscardDialog
        isOpen={confirm === 'close' || confirm === 'view'}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
    </>
  )

  return (
    <>
      {mode === 'view' ? (
        <ViewActions avalanche={avalanche} onDelete={onDelete} onEdit={onEdit} />
      ) : (
        <FooterActions>
          <Button onClick={onEditCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          {/* Also disabled while a save waits for photo uploads to finish */}
          <Button disabled={isSaving} form={formId} type="submit">
            {saveLabel ?? t('common.actions.save')}
          </Button>
        </FooterActions>
      )}
      {dialogs}
    </>
  )
}

export default AvalancheSheetFooter
