import { useState } from 'react'

type UseCreateSheetParams = {
  isRequested: boolean
  onClose: VoidFunction
}

// Open / dirty / confirm state of the create panel. Anything that would drop an
// unfinished record asks first — including Back removing it from the URL.
const useCreateSheet = ({ isRequested, onClose }: UseCreateSheetParams) => {
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isConfirmingClose, setIsConfirmingClose] = useState(false)
  // Remounts the form on every open, so each new record starts empty
  const [formKey, setFormKey] = useState(0)
  const [wasRequested, setWasRequested] = useState(isRequested)

  if (isRequested !== wasRequested) {
    setWasRequested(isRequested)

    if (isRequested) {
      setFormKey((key) => key + 1)
    } else if (isDirty) {
      setIsConfirmingClose(true)
    }
  }

  const close = () => {
    setIsDirty(false)
    setIsConfirmingClose(false)
    onClose()
  }

  const requestClose = () => (isDirty ? setIsConfirmingClose(true) : close())

  return {
    cancelConfirm: () => setIsConfirmingClose(false),
    close,
    formKey,
    isConfirmingClose,
    isDirty,
    // Stays open while there are unsaved changes, even if the URL lost it
    isOpen: isRequested || isDirty,
    isSaving,
    requestClose,
    setIsDirty,
    setIsSaving,
  }
}

export default useCreateSheet
