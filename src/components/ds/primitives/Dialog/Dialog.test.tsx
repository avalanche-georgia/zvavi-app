import { useRef, useState } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Dialog from './Dialog'

const Harness = () => {
  const [isOpen, setIsOpen] = useState(false)
  // As ConfirmDialog does. Left to default, focus lands on × and opens its tooltip,
  // which takes the first Esc
  const confirmRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Open
      </button>
      <Dialog
        closeLabel="Close"
        footer={
          <button ref={confirmRef} type="button">
            Confirm
          </button>
        }
        initialFocus={confirmRef}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Publish forecast #180"
      >
        <p>It goes public.</p>
      </Dialog>
    </>
  )
}

describe('Dialog', () => {
  it('opens named by its title, with the body as description', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(
      screen.getByRole('dialog', { name: 'Publish forecast #180' }),
    ).toHaveAccessibleDescription('It goes public.')
  })

  it('closes on Escape, returning focus to the opener', async () => {
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Open' })

    await userEvent.click(opener)
    // Esc only reaches the dialog once focus has moved into it
    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus())
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(opener).toHaveFocus()
  })

  it('closes on ×', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Close' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('while busy disables × and ignores Esc and the backdrop', async () => {
    const onOpenChange = vi.fn()

    render(
      <Dialog
        closeLabel="Close"
        footer={null}
        isBusy
        isOpen
        onOpenChange={onOpenChange}
        title="Publishing…"
      />,
    )
    await userEvent.keyboard('{Escape}')
    await userEvent.click(document.querySelector('.bg-scrim')!)

    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('with close disabled has no ×: only its footer button', () => {
    render(
      <Dialog
        footer={<button type="button">Continue</button>}
        isCloseDisabled
        isOpen
        title="Before you go"
      />,
    )

    const buttons = within(screen.getByRole('dialog')).getAllByRole('button')

    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveAccessibleName('Continue')
  })

  it('with initialFocus false focuses nothing inside on open', async () => {
    const renderOpen = (initialFocus?: false) =>
      render(
        <Dialog
          footer={<button type="button">Continue</button>}
          initialFocus={initialFocus}
          isCloseDisabled
          isOpen
          title="Before you go"
        >
          <input aria-label="Agree" type="checkbox" />
        </Dialog>,
      )
    const isFocusInside = () => screen.getByRole('dialog').contains(document.activeElement)

    // Control: by default focus does move in (asynchronously) — the wait below is long enough
    const { unmount } = renderOpen()

    await waitFor(() => expect(isFocusInside()).toBe(true))
    unmount()

    renderOpen(false)
    await screen.findByRole('dialog')
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(isFocusInside()).toBe(false)
  })
})
