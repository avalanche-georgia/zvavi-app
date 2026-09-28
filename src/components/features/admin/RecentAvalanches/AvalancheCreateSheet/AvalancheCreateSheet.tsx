'use client'

import { useId } from 'react'
import { Button, Sheet, SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import type { RegionId } from '@domain/types'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import useCreateSheet from './useCreateSheet'
import FooterConfirm from '../AvalancheSheet/FooterConfirm'
import { RecentAvalancheForm } from '../RecentAvalancheForm'

type AvalancheCreateSheetProps = {
  isRequested: boolean
  onClose: VoidFunction
  regionId: RegionId
}

// A new catalog record, added in a side panel next to the list — same panel and
// form as editing a record
const AvalancheCreateSheet = ({ isRequested, onClose, regionId }: AvalancheCreateSheetProps) => {
  const t = useTranslations()
  const formId = useId()
  const sheet = useCreateSheet({ isRequested, onClose })

  const handleOpenChange = (isOpen: boolean) => !isOpen && sheet.requestClose()

  const footer = sheet.isConfirmingClose ? (
    <FooterConfirm
      cancelLabel={t('admin.recentAvalanches.sheet.keepEditing')}
      confirmLabel={t('admin.recentAvalanches.sheet.discard')}
      message={t('admin.recentAvalanches.sheet.discardConfirm')}
      onCancel={sheet.cancelConfirm}
      onConfirm={sheet.close}
    />
  ) : (
    <div className="flex w-full justify-end gap-2">
      <Button onClick={sheet.requestClose} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      {/* Also disabled while a save waits for photo uploads to finish */}
      <Button disabled={sheet.isSaving} form={formId} type="submit">
        {t('common.actions.save')}
      </Button>
    </div>
  )

  return (
    <Sheet
      className="lg:w-200"
      footer={footer}
      header={
        <>
          <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
            <X className="size-4.5" />
          </SheetClose>
          <SheetTitle className="m-0 flex-1 truncate text-[15px] font-semibold">
            {t('admin.recentAvalanches.title.create')}
          </SheetTitle>
        </>
      }
      isDismissible={!sheet.isDirty}
      isOpen={sheet.isOpen}
      isTall
      onOpenChange={handleOpenChange}
    >
      <RecentAvalancheForm
        key={sheet.formKey}
        formId={formId}
        onCancel={sheet.requestClose}
        onDirtyChange={sheet.setIsDirty}
        onSubmittingChange={sheet.setIsSaving}
        onSuccess={sheet.close}
        regionId={regionId}
        variant="panel"
      />
    </Sheet>
  )
}

export default AvalancheCreateSheet
