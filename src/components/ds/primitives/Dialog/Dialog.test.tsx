import { useRef, useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Dialog from './Dialog'

const Harness = ({ isDismissible = true }: { isDismissible?: boolean }) => {
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
        isDismissible={isDismissible}
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

  it('keeps × disabled while not dismissible', async () => {
    render(<Harness isDismissible={false} />)

    await userEvent.click(screen.getByRole('button', { name: 'Open' }))

    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled()
  })
})
