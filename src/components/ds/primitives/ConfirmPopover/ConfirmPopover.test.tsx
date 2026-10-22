import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ConfirmPopover from './ConfirmPopover'

const renderConfirm = (onConfirm = vi.fn()) => {
  render(
    <ConfirmPopover
      cancelLabel="Cancel"
      confirmLabel="Remove"
      message="Remove it?"
      onConfirm={onConfirm}
    >
      <button type="button">Trash</button>
    </ConfirmPopover>,
  )

  return onConfirm
}

describe('ConfirmPopover', () => {
  it('starts focus on Cancel, so a stray Enter never confirms', async () => {
    const onConfirm = renderConfirm()

    await userEvent.click(screen.getByRole('button', { name: 'Trash' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus())
    await userEvent.keyboard('{Enter}')
    expect(onConfirm).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByText('Remove it?')).not.toBeInTheDocument())
  })

  it('confirms, closes and returns focus to the trigger', async () => {
    const onConfirm = renderConfirm()

    await userEvent.click(screen.getByRole('button', { name: 'Trash' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Remove' }))

    expect(onConfirm).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByText('Remove it?')).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Trash' })).toHaveFocus()
  })

  it('closes on Escape without confirming', async () => {
    const onConfirm = renderConfirm()

    await userEvent.click(screen.getByRole('button', { name: 'Trash' }))
    await screen.findByText('Remove it?')
    await userEvent.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByText('Remove it?')).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Trash' })).toHaveFocus()
    expect(onConfirm).not.toHaveBeenCalled()
  })
})
