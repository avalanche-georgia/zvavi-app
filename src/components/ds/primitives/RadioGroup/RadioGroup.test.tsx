import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import RadioGroup from './RadioGroup'

// Radios are found by position: the <label> names base-ui's hidden input, not the span

const options = [
  { label: 'I saw it happen', value: 'seen' },
  { label: 'I found the debris', value: 'debris' },
  { disabled: true, label: 'Someone told me', value: 'told' },
]

const Harness = () => {
  const [value, setValue] = useState<string | null>(null)

  return (
    <RadioGroup ariaLabel="How do you know?" onChange={setValue} options={options} value={value} />
  )
}

describe('RadioGroup', () => {
  it('selects by click and moves with the arrow keys', async () => {
    render(<Harness />)

    const [seen, debris] = screen.getAllByRole('radio')

    await userEvent.click(screen.getByText('I saw it happen'))
    expect(seen).toBeChecked()

    await userEvent.keyboard('{ArrowDown}')
    expect(debris).toBeChecked()
  })

  it('never selects a disabled option', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByText('Someone told me'))

    expect(screen.getAllByRole('radio')[2]).not.toBeChecked()
  })
})
