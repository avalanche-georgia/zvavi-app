import { formatAvalancheId } from '@components/features/observations'
import { ConfirmationDialog } from '@components/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { AvalancheSheetConfirm, AvalancheSheetMode } from './types'
import { ViewActions } from '../AvalancheView'
import { AvalancheDeleteMessage } from '../shared'

type AvalancheSheetFooterProps = {
  avalanche: AvalancheListItem
  confirm: AvalancheSheetConfirm
  formId: string
  isSaving: boolean
  mode: AvalancheSheetMode
  // Returns the delete request, so the dialog spins until it's done
  onConfirm: () => Promise<unknown> | void
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
      <ConfirmationDialog
        isOpen={confirm === 'delete'}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
        title={t('admin.recentAvalanches.sheet.deleteTitle', {
          id: formatAvalancheId(avalanche.id),
        })}
        type="delete"
      >
        <AvalancheDeleteMessage avalanche={avalanche} />
      </ConfirmationDialog>
      <ConfirmationDialog
        isOpen={confirm === 'close' || confirm === 'view'}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
        type="discard"
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
