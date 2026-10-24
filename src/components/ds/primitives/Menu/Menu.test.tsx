import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Menu from './Menu'
import MenuItem from './MenuItem'

const renderMenu = (onEdit = vi.fn()) => {
  render(
    <Menu trigger={<button type="button">More</button>}>
      <MenuItem onClick={onEdit}>Edit</MenuItem>
      <MenuItem tone="danger">Delete</MenuItem>
    </Menu>,
  )

  return onEdit
}

describe('Menu', () => {
  it('opens from the keyboard, moves with arrows and picks with Enter', async () => {
    const onEdit = renderMenu()

    screen.getByRole('button', { name: 'More' }).focus()
    await userEvent.keyboard('{Enter}')
    expect(await screen.findByRole('menu')).toBeInTheDocument()

    // Opened from the keyboard, the first item is highlighted; ↓ ↑ come back to it
    await userEvent.keyboard('{ArrowDown}{ArrowUp}{Enter}')

    expect(onEdit).toHaveBeenCalledOnce()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    renderMenu()

    await userEvent.click(screen.getByRole('button', { name: 'More' }))
    await screen.findByRole('menu')
    await userEvent.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'More' })).toHaveFocus()
  })
})
