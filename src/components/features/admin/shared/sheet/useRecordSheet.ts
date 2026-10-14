'use client'

import { useEffect, useState } from 'react'

// What the footer is asking to confirm: deleting the record, or dropping unsaved
// input before closing the sheet / returning to the view
export type RecordSheetConfirm = 'close' | 'delete' | 'leave' | null

type UseRecordSheetParams<TRecord, TMode extends string> = {
  // The mode the record was opened in ('view', or straight into a form)
  initialMode: TMode
  onClose: VoidFunction
  // Put the record back in the URL — used when it was removed (browser Back)
  // while there was unsaved input
  onReopen: (id: string) => void
  // The selected record; null while nothing is selected or it can't be found
  record: TRecord | null
  selectedId: string | null
}

// State of a sheet that shows one record and edits it in place. 'view' is the
// read-only face; every other mode is a form. Anything that would drop unsaved
// input asks first.
const useRecordSheet = <TRecord extends { id: string }, TMode extends string>({
  initialMode,
  onClose,
  onReopen,
  record,
  selectedId,
}: UseRecordSheetParams<TRecord, TMode>) => {
  const [previousId, setPreviousId] = useState(selectedId)
  const [mode, setMode] = useState<TMode | 'view'>(initialMode)
  // Finishing a form returns to where the record was opened
  const [entryMode, setEntryMode] = useState<TMode | 'view'>(initialMode)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [confirm, setConfirm] = useState<RecordSheetConfirm>(null)
  // Keeps the content rendered while the sheet animates closed
  const [shownRecord, setShownRecord] = useState<TRecord | null>(null)

  const hasUnsavedInput = mode !== 'view' && isDirty

  // Every newly opened record starts fresh, in the mode it was opened with —
  // except the same record coming back after an interrupted close (see below)
  if (selectedId !== previousId) {
    setPreviousId(selectedId)

    if (selectedId === null && hasUnsavedInput) {
      setConfirm('close')
    } else if (selectedId !== null && !(hasUnsavedInput && selectedId === shownRecord?.id)) {
      setMode(initialMode)
      setEntryMode(initialMode)
      setIsDirty(false)
      setConfirm(null)
    }
  }

  if (record && record !== shownRecord) setShownRecord(record)

  // Removed from the URL from outside (browser Back) with unsaved input: put it
  // back — the sheet stayed open and asks first (confirm set above)
  const reopenId = selectedId === null && hasUnsavedInput ? (shownRecord?.id ?? null) : null

  useEffect(() => {
    if (reopenId !== null) onReopen(reopenId)
  }, [onReopen, reopenId])

  const showView = () => {
    setMode('view')
    setIsDirty(false)
    setConfirm(null)
  }

  // Stays in the form while sliding out — flipping to the view first would flash it
  const close = () => {
    setIsDirty(false)
    setConfirm(null)
    onClose()
  }

  // Saved or cancelled: back to the view if the form was opened from it, otherwise
  // (opened straight into the form, e.g. a row's Edit) the sheet closes
  const finishForm = () => (entryMode === 'view' ? showView() : close())

  const requestClose = () => (hasUnsavedInput ? setConfirm('close') : close())

  return {
    cancelConfirm: () => setConfirm(null),
    cancelForm: () => (hasUnsavedInput ? setConfirm('leave') : finishForm()),
    close,
    confirm,
    // "Discard" was confirmed
    discard: () => (confirm === 'leave' ? finishForm() : close()),
    finishForm,
    hasUnsavedInput,
    // Stays open while there is unsaved input, even if the URL lost the record
    isOpen: selectedId !== null || hasUnsavedInput,
    isSaving,
    mode,
    onOpenChange: (isOpen: boolean) => !isOpen && requestClose(),
    record: selectedId === null ? shownRecord : record,
    requestDelete: () => setConfirm('delete'),
    setIsDirty,
    setIsSaving,
    setMode,
  }
}

export default useRecordSheet
