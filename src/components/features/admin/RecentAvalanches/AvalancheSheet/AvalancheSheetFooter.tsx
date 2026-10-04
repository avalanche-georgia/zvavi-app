import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import FooterConfirm from './FooterConfirm'
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

  if (confirm === 'delete') {
    return (
      <FooterConfirm
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t('common.actions.delete')}
        isBusy={isDeleting}
        message={t('admin.recentAvalanches.sheet.deleteConfirm')}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
    )
  }

  if (confirm) {
    return (
      <FooterConfirm
        cancelLabel={t('admin.recentAvalanches.sheet.keepEditing')}
        confirmLabel={t('admin.recentAvalanches.sheet.discard')}
        message={t('admin.recentAvalanches.sheet.discardConfirm')}
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
    )
  }

  if (mode === 'view') {
    return <ViewActions avalanche={avalanche} onDelete={onDelete} onEdit={onEdit} />
  }

  return (
    <div className="flex w-full justify-end gap-2">
      <Button onClick={onEditCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      {/* Also disabled while a save waits for photo uploads to finish */}
      <Button disabled={isSaving} form={formId} type="submit">
        {saveLabel ?? t('common.actions.save')}
      </Button>
    </div>
  )
}

export default AvalancheSheetFooter
