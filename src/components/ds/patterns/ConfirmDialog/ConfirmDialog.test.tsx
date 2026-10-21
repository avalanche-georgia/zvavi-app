import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ConfirmDialog from './ConfirmDialog'
import type { ConfirmDialogTone } from './confirmDialogTones'

type HarnessProps = {
  onConfirm?: () => Promise<unknown> | void
  onOpenChange?: (isOpen: boolean) => void
  tone?: ConfirmDialogTone
}

// Starts open; closing unmounts the popup, as in the app
const Harness = ({ onConfirm = vi.fn(), onOpenChange, tone = 'danger' }: HarnessProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen)
    onOpenChange?.(nextIsOpen)
  }

  return (
    <ConfirmDialog
      cancelLabel="Cancel"
      closeLabel="Close"
      confirmLabel="Delete"
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={handleOpenChange}
      pendingLabel="Deleting…"
      title="Delete forecast #180"
      tone={tone}
    >
      <p>The forecast is deleted permanently.</p>
    </ConfirmDialog>
  )
}

const deferred = () => {
  let resolve: VoidFunction = () => undefined
  let reject: VoidFunction = () => undefined
  const promise = new Promise<void>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return { promise, reject, resolve }
}

describe('ConfirmDialog', () => {
  it('shows the action as the title and the consequence as its description', () => {
    render(<Harness />)

    const dialog = screen.getByRole('alertdialog', { name: 'Delete forecast #180' })

    expect(dialog).toHaveAccessibleDescription('The forecast is deleted permanently.')
  })

  it('is an alert dialog starting on Cancel for danger and warning', async () => {
    render(<Harness tone="warning" />)

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus())
  })

  it('is a plain dialog starting on the action for info', async () => {
    render(<Harness tone="info" />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus())
  })

  it('closes without confirming on Cancel, Escape or ×', async () => {
    const onConfirm = vi.fn()

    for (const close of ['cancel', 'escape', 'close'] as const) {
      const { unmount } = render(<Harness onConfirm={onConfirm} />)

      if (close === 'cancel') await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      if (close === 'escape') await userEvent.keyboard('{Escape}')
      if (close === 'close') await userEvent.click(screen.getByRole('button', { name: 'Close' }))

      await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument())
      unmount()
    }

    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('runs a plain action and closes right away', async () => {
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(<Harness onConfirm={onConfirm} onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onConfirm).toHaveBeenCalledOnce()
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('stays busy and undismissable until an async action resolves, then closes', async () => {
    const request = deferred()
    const onConfirm = vi.fn(() => request.promise)

    render(<Harness onConfirm={onConfirm} />)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getByRole('button', { name: 'Deleting…' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled()

    await userEvent.keyboard('{Escape}')
    await userEvent.click(screen.getByRole('button', { name: 'Deleting…' }))

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(onConfirm).toHaveBeenCalledOnce()

    request.resolve()

    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument())
  })

  it('stays open, ready to retry, when an async action rejects', async () => {
    const request = deferred()

    render(<Harness onConfirm={() => request.promise} />)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    request.reject()

    await waitFor(() => expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled())
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeEnabled()
  })
})
