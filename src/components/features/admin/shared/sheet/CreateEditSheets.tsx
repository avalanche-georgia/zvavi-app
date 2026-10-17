'use client'

import { useState } from 'react'

import FormSheet, { type FormSheetFormProps } from './FormSheet'

type CreateEditSheetsProps<TRecord> = {
  createTitle: string
  getEditTitle: (record: TRecord) => string
  isCreateRequested: boolean
  // Wider desktop panel for both sheets (see Sheet)
  isWide?: boolean
  onCreateClose: VoidFunction
  onEditClose: VoidFunction
  // The record being edited, once found in the list
  record: TRecord | null
  // The same form for both sheets; `record` is undefined when creating
  renderForm: (form: FormSheetFormProps, record?: TRecord) => React.ReactNode
}

// Adding and editing a record that has no read-only view: one form, each in its own sheet
const CreateEditSheets = <TRecord,>({
  createTitle,
  getEditTitle,
  isCreateRequested,
  isWide,
  onCreateClose,
  onEditClose,
  record,
  renderForm,
}: CreateEditSheetsProps<TRecord>) => {
  // Keeps the form rendered while the edit sheet animates closed
  const [shownRecord, setShownRecord] = useState(record)

  if (record && record !== shownRecord) setShownRecord(record)

  return (
    <>
      <FormSheet
        isRequested={isCreateRequested}
        isWide={isWide}
        onClose={onCreateClose}
        title={createTitle}
      >
        {(form) => renderForm(form)}
      </FormSheet>
      <FormSheet
        isRequested={record !== null}
        isWide={isWide}
        onClose={onEditClose}
        title={shownRecord ? getEditTitle(shownRecord) : ''}
      >
        {(form) => shownRecord && renderForm(form, shownRecord)}
      </FormSheet>
    </>
  )
}

export default CreateEditSheets
