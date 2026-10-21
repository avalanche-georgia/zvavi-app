import { useState } from 'react'

// Delete lives in a menu but confirms in a dialog. Open the dialog only once the
// menu has fully closed and handed focus back to its trigger — so the closing
// menu's focus return doesn't fight the dialog, and closing the dialog returns
// focus to the trigger.
const useDeleteAfterMenuClose = () => {
  const [isDeleteRequested, setIsDeleteRequested] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleMenuOpenChangeComplete = (isOpen: boolean) => {
    if (isOpen || !isDeleteRequested) return
    setIsDeleteRequested(false)
    setIsConfirmOpen(true)
  }

  return {
    isConfirmOpen,
    onConfirmOpenChange: setIsConfirmOpen,
    onDeleteRequest: () => setIsDeleteRequested(true),
    onMenuOpenChangeComplete: handleMenuOpenChangeComplete,
  }
}

export default useDeleteAfterMenuClose
