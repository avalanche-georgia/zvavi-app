import { useRef, useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Popover from './Popover'

const renderPopover = (props: Partial<React.ComponentProps<typeof Popover>> = {}) =>
  render(
    <Popover ariaLabel="Date filter" trigger={<button type="button">Dates</button>} {...props}>
      <button type="button">First</button>
      <button type="button">Second</button>
    </Popover>,
  )

describe('Popover', () => {
  it('is closed until the trigger is pressed, then opens a named dialog', async () => {
    renderPopover()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dates' })).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(screen.getByRole('button', { name: 'Dates' }))

    expect(screen.getByRole('dialog', { name: 'Date filter' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dates' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    renderPopover()

    await userEvent.click(screen.getByRole('button', { name: 'Dates' }))
    await userEvent.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dates' })).toHaveFocus()
  })

  it('closes on a click outside', async () => {
    render(
      <>
        <Popover ariaLabel="Date filter" trigger={<button type="button">Dates</button>}>
          <p>Panel</p>
        </Popover>
        <button type="button">Elsewhere</button>
      </>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Dates' }))
    await userEvent.click(screen.getByRole('button', { name: 'Elsewhere' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('focuses the element initialFocus picks', async () => {
    const Harness = () => {
      const secondRef = useRef<HTMLButtonElement>(null)

      return (
        <Popover
          ariaLabel="Date filter"
          initialFocus={() => secondRef.current ?? true}
          trigger={<button type="button">Dates</button>}
        >
          <button type="button">First</button>
          <button ref={secondRef} type="button">
            Second
          </button>
        </Popover>
      )
    }

    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Dates' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus())
  })

  it('is controlled with isOpen / onOpenChange, e.g. a Done button inside', async () => {
    const onOpenChange = vi.fn()

    const Harness = () => {
      const [isOpen, setIsOpen] = useState(false)

      const handleOpenChange = (nextIsOpen: boolean) => {
        onOpenChange(nextIsOpen)
        setIsOpen(nextIsOpen)
      }

      return (
        <Popover
          ariaLabel="Date filter"
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          trigger={<button type="button">Dates</button>}
        >
          <button onClick={() => setIsOpen(false)} type="button">
            Done
          </button>
        </Popover>
      )
    }

    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Dates' }))

    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    await userEvent.click(screen.getByRole('button', { name: 'Done' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not open from a disabled trigger', () => {
    renderPopover({
      trigger: (
        <button disabled type="button">
          Dates
        </button>
      ),
    })

    // user-event skips disabled elements; a raw click checks the Popover ignores it
    fireEvent.click(screen.getByRole('button', { name: 'Dates' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
