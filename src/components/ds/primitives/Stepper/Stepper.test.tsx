import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Stepper from './Stepper'

const Harness = () => {
  const [value, setValue] = useState(1)

  return (
    <Stepper
      decrementLabel="Fewer"
      incrementLabel="More"
      max={2}
      min={0}
      onValueChange={setValue}
      value={value}
    />
  )
}

describe('Stepper', () => {
  it('steps within min / max and disables the button at each end', async () => {
    render(<Harness />)
    const input = screen.getByRole('textbox')

    await userEvent.click(screen.getByRole('button', { name: 'More' }))
    expect(input).toHaveValue('2')
    expect(screen.getByRole('button', { name: 'More' })).toBeDisabled()

    await userEvent.click(screen.getByRole('button', { name: 'Fewer' }))
    await userEvent.click(screen.getByRole('button', { name: 'Fewer' }))
    expect(input).toHaveValue('0')
    expect(screen.getByRole('button', { name: 'Fewer' })).toBeDisabled()
  })

  it('falls back to min when the input is cleared', async () => {
    render(<Harness />)
    const input = screen.getByRole('textbox')

    await userEvent.clear(input)
    await userEvent.tab()

    expect(input).toHaveValue('0')
  })
})
