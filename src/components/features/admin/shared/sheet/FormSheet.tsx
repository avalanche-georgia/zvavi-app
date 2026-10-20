'use client'

import { useId } from 'react'
import { Sheet, SheetHeader } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import DiscardDialog from './DiscardDialog'
import FormSheetActions from './FormSheetActions'
import useFormSheet from './useFormSheet'

// What the form inside the sheet needs to report back
export type FormSheetFormProps = {
  formId: string
  onDirtyChange: (isDirty: boolean) => void
  onSubmittingChange: (isSubmitting: boolean) => void
  // Saved: closes the sheet without asking. `leave` replaces the plain close,
  // e.g. to go on to the record just created.
  onSuccess: (leave?: VoidFunction) => void
}

type FormSheetProps = {
  // Renders the form; it remounts on every open, so it always starts from fresh values
  children: (form: FormSheetFormProps) => React.ReactNode
  className?: string
  isRequested: boolean
  // Wider desktop panel (see Sheet)
  isWide?: boolean
  onClose: VoidFunction
  saveLabel?: string
  title: string
}

// A sheet that holds one form (create a record, edit a simple one). Closing with
// unsaved input asks first, in a dialog.
const FormSheet = ({
  children,
  className,
  isRequested,
  isWide,
  onClose,
  saveLabel,
  title,
}: FormSheetProps) => {
  const t = useTranslations()
  const formId = useId()
  const sheet = useFormSheet({ isRequested, onClose })

  const handleOpenChange = (isOpen: boolean) => !isOpen && sheet.requestClose()
  const handleSuccess = (leave?: VoidFunction) => (leave ? sheet.closeTo(leave) : sheet.close())

  // The dialog sits inside the sheet, so it nests: Esc closes only the dialog
  const footer = (
    <>
      <FormSheetActions
        formId={formId}
        isSaving={sheet.isSaving}
        onCancel={sheet.requestClose}
        saveLabel={saveLabel}
      />
      <DiscardDialog
        isOpen={sheet.isConfirmingClose}
        onCancel={sheet.cancelConfirm}
        onConfirm={sheet.close}
      />
    </>
  )

  return (
    <Sheet
      className={className}
      footer={footer}
      header={<SheetHeader closeLabel={t('common.actions.close')} title={title} />}
      isDismissible={!sheet.isDirty}
      isOpen={sheet.isOpen}
      isTall
      isWide={isWide}
      onOpenChange={handleOpenChange}
    >
      <div key={sheet.formKey} className="contents">
        {children({
          formId,
          onDirtyChange: sheet.setIsDirty,
          onSubmittingChange: sheet.setIsSaving,
          onSuccess: handleSuccess,
        })}
      </div>
    </Sheet>
  )
}

export default FormSheet
