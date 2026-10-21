import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import TextField from './TextField'

const Harness = () => {
  const [value, setValue] = useState('')

  return (
    <TextField aria-label="Name" maxLength={10} onValueChange={setValue} showCount value={value} />
  )
}

describe('TextField', () => {
  it('is controlled and counts characters against maxLength', async () => {
    render(<Harness />)

    await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'Gudauri')

    expect(screen.getByRole('textbox')).toHaveValue('Gudauri')
    expect(screen.getByText('7/10')).toBeInTheDocument()
  })

  it('takes no input when disabled', async () => {
    render(<TextField aria-label="Name" disabled onValueChange={() => undefined} value="" />)

    await userEvent.type(screen.getByRole('textbox'), 'x')

    expect(screen.getByRole('textbox')).toHaveValue('')
  })
})
