import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Switch from './Switch'

// Found by role: the <label> names base-ui's hidden input, not the <span role="switch">

const Harness = () => {
  const [checked, setChecked] = useState(false)

  return <Switch checked={checked} label="Active" onCheckedChange={setChecked} />
}

describe('Switch', () => {
  it('flips on click and on Space', async () => {
    render(<Harness />)
    const toggle = screen.getByRole('switch')

    await userEvent.click(screen.getByText('Active'))
    expect(toggle).toBeChecked()

    await userEvent.keyboard(' ')
    expect(toggle).not.toBeChecked()
  })

  // e.g. while the change is being saved: focus stays, clicks do nothing
  it('ignores input while read-only', async () => {
    const onCheckedChange = vi.fn()

    render(<Switch checked={false} isReadOnly label="Active" onCheckedChange={onCheckedChange} />)
    const toggle = screen.getByRole('switch')

    await userEvent.click(toggle)
    await userEvent.click(screen.getByText('Active'))

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(toggle).toHaveAttribute('aria-busy', 'true')
  })
})
