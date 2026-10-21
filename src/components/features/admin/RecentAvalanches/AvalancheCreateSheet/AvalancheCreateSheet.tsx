'use client'

import { useId } from 'react'
import { useFormSheet } from '@components/features/admin/shared'
import { ConfirmationDialog } from '@components/shared'
import type { RegionId } from '@domain/types'
import { FooterActions, Sheet, SheetHeader } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { RecentAvalancheForm } from '../RecentAvalancheForm'

type AvalancheCreateSheetProps = {
  isRequested: boolean
  // Shown above the form, e.g. what creating means in the caller's context
  note?: React.ReactNode
  onClose: VoidFunction
  // After the record is saved, before the panel closes
  onCreated?: (id: number) => void
  regionId: RegionId
  submitLabel?: string
  title?: string
}

// A new catalog record, added in a side panel next to the list — same panel and
// form as editing a record
const AvalancheCreateSheet = ({
  isRequested,
  note,
  onClose,
  onCreated,
  regionId,
  submitLabel,
  title,
}: AvalancheCreateSheetProps) => {
  const t = useTranslations()
  const formId = useId()
  const sheet = useFormSheet({ isRequested, onClose })

  const handleOpenChange = (isOpen: boolean) => !isOpen && sheet.requestClose()

  const handleSuccess = (createdId?: number) => {
    if (createdId !== undefined) onCreated?.(createdId)
    sheet.close()
  }

  const footer = (
    <FooterActions>
      <Button onClick={sheet.requestClose} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      {/* Also disabled while a save waits for photo uploads to finish */}
      <Button disabled={sheet.isSaving} form={formId} type="submit">
        {submitLabel ?? t('common.actions.save')}
      </Button>
      <ConfirmationDialog
        isOpen={sheet.isConfirmingClose}
        onCancel={sheet.cancelConfirm}
        onConfirm={sheet.close}
        type="discard"
      />
    </FooterActions>
  )

  return (
    <Sheet
      className="lg:w-200"
      footer={footer}
      header={
        <SheetHeader
          closeLabel={t('common.actions.close')}
          title={title ?? t('admin.recentAvalanches.title.create')}
        />
      }
      isDismissible={!sheet.isDirty}
      isOpen={sheet.isOpen}
      isTall
      onOpenChange={handleOpenChange}
    >
      {note}
      <RecentAvalancheForm
        key={sheet.formKey}
        formId={formId}
        onCancel={sheet.requestClose}
        onDirtyChange={sheet.setIsDirty}
        onSubmittingChange={sheet.setIsSaving}
        onSuccess={handleSuccess}
        regionId={regionId}
        variant="panel"
      />
    </Sheet>
  )
}

export default AvalancheCreateSheet
