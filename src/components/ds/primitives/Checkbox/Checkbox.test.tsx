import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Checkbox from './Checkbox'

// base-ui's checkbox is a <span role="checkbox">: the wrapping <label> names its hidden
// input, not the span, so it's found by role (an a11y nit in REPORT.md)

const Harness = ({ error }: { error?: string }) => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      description="We only use it to reply"
      error={error}
      label="I agree"
      onCheckedChange={setChecked}
    />
  )
}

describe('Checkbox', () => {
  it('toggles from the label and from Space', async () => {
    render(<Harness />)
    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(screen.getByText('I agree'))
    expect(checkbox).toBeChecked()

    await userEvent.keyboard(' ')
    expect(checkbox).not.toBeChecked()
  })

  it('links description and error, and marks it invalid', () => {
    render(<Harness error="Tick this to continue" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveAccessibleDescription('We only use it to reply Tick this to continue')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })
})
