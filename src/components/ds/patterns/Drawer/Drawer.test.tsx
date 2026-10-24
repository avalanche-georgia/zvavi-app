import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Drawer, DrawerClose, DrawerTitle } from '.'

const Harness = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button">
        Menu
      </button>
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} side="left">
        <DrawerTitle>Navigation</DrawerTitle>
        <DrawerClose>Done</DrawerClose>
      </Drawer>
    </>
  )
}

describe('Drawer', () => {
  it('opens as a dialog named by its title; Esc closes it and focus returns', async () => {
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Menu' })

    await userEvent.click(opener)
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(opener).toHaveFocus()
  })

  it('closes through DrawerClose', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await userEvent.click(screen.getByRole('button', { name: 'Done' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})
