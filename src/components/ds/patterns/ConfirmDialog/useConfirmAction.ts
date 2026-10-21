import { useState } from 'react'

type UseConfirmActionParams = {
  onConfirm: () => Promise<unknown> | void
  onOpenChange: (isOpen: boolean) => void
}

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  typeof (value as PromiseLike<unknown> | undefined)?.then === 'function'

// Runs a dialog's confirmed action. A promise keeps the dialog busy until it
// settles: resolved → closes, rejected → stays open (the caller says why, e.g. a
// toast) to try again. While busy, nothing closes it.
const useConfirmAction = ({ onConfirm, onOpenChange }: UseConfirmActionParams) => {
  const [isBusy, setIsBusy] = useState(false)

  const handleOpenChange = (nextIsOpen: boolean) => {
    if (isBusy) return

    onOpenChange(nextIsOpen)
  }

  // The action runs first: closing reports through onOpenChange, which callers
  // often treat as "cancelled"
  const handleConfirm = async () => {
    if (isBusy) return

    const result = onConfirm()

    if (!isPromiseLike(result)) return onOpenChange(false)

    setIsBusy(true)

    try {
      await result
      onOpenChange(false)
    } catch {
      // Stays open: the caller reports the failure
    } finally {
      setIsBusy(false)
    }
  }

  return { handleConfirm, handleOpenChange, isBusy }
}

export default useConfirmAction
