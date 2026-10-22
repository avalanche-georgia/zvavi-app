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

  it.each([
    ['read-only', { isReadOnly: true }, null],
    ['busy', { isBusy: true }, 'true'],
  ])('ignores input while %s', async (_case, props, ariaBusy) => {
    const onCheckedChange = vi.fn()

    render(<Switch checked={false} label="Active" onCheckedChange={onCheckedChange} {...props} />)
    const toggle = screen.getByRole('switch')

    await userEvent.click(toggle)
    await userEvent.click(screen.getByText('Active'))

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(toggle.getAttribute('aria-busy')).toBe(ariaBusy)
  })
})
