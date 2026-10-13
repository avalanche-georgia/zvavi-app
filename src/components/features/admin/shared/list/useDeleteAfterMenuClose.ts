import { useState } from 'react'

// Delete lives in a menu but confirms in a popover anchored to the menu trigger.
// Open the popover only once the menu has fully closed and handed focus back to
// the trigger — otherwise the closing menu's focus return closes the popover again.
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
