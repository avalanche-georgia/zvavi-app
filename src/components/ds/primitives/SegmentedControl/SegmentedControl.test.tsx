import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import SegmentedControl from './SegmentedControl'

const options = [
  { label: 'EN', value: 'en' },
  { label: 'KA', value: 'ka' },
]

const Harness = () => {
  const [value, setValue] = useState('en')

  return (
    <SegmentedControl ariaLabel="Language" onChange={setValue} options={options} value={value} />
  )
}

describe('SegmentedControl', () => {
  it('always keeps exactly one segment on', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByRole('button', { name: 'KA' }))
    await userEvent.click(screen.getByRole('button', { name: 'KA' }))

    expect(screen.getByRole('button', { name: 'KA' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('ignores clicks when disabled', async () => {
    const onChange = vi.fn()

    render(
      <SegmentedControl
        ariaLabel="Language"
        disabled
        onChange={onChange}
        options={options}
        value="en"
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'KA' }))

    expect(onChange).not.toHaveBeenCalled()
  })

  // One scale with the other controls: md 46, sm 40 (next to sm Selects), xs 34 (header)
  it.each([
    ['md', 'h-11.5'],
    ['sm', 'h-10'],
    ['xs', 'h-8.5'],
  ] as const)('is %s tall', (size, height) => {
    render(
      <SegmentedControl
        ariaLabel="Language"
        onChange={vi.fn()}
        options={options}
        size={size}
        value="en"
      />,
    )

    expect(screen.getByRole('group', { name: 'Language' })).toHaveClass(height)
  })
})
