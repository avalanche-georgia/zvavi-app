import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Button, { getButtonClasses } from './Button'

describe('Button', () => {
  it('is a type="button" that clicks with mouse, Enter and Space', async () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')

    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it.each([
    ['disabled', { disabled: true }],
    ['busy', { isBusy: true }],
  ])('ignores clicks while %s', async (_state, props) => {
    const handleClick = vi.fn()

    render(
      <Button onClick={handleClick} {...props}>
        Save
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('marks the busy state', () => {
    render(<Button isBusy>Saving…</Button>)

    expect(screen.getByRole('button', { name: 'Saving…' })).toHaveAttribute('aria-busy', 'true')
  })

  // A router link styled as a button shares the same classes
  it('gives links the same look', () => {
    expect(getButtonClasses({ size: 'sm', variant: 'secondary' })).toContain('h-10')
  })
})
