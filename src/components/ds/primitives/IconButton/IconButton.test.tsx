import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import IconButton from './IconButton'

describe('IconButton', () => {
  it('is named by aria-label, shows it as a tooltip on focus and clicks', async () => {
    const handleClick = vi.fn()

    render(
      <IconButton aria-label="Delete forecast" onClick={handleClick} tooltip="Delete">
        <svg />
      </IconButton>,
    )
    const button = screen.getByRole('button', { name: 'Delete forecast' })

    await userEvent.tab()
    expect(button).toHaveFocus()
    expect(await screen.findByText('Delete')).toBeInTheDocument()

    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('ignores clicks when disabled', async () => {
    const handleClick = vi.fn()

    render(
      <IconButton aria-label="Delete" disabled onClick={handleClick}>
        <svg />
      </IconButton>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(handleClick).not.toHaveBeenCalled()
  })
})
