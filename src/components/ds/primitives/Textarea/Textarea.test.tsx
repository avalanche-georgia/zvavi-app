import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Textarea from './Textarea'
import { Field } from '../Field'

const Harness = () => {
  const [value, setValue] = useState('')

  return (
    <Field label="Notes">
      <Textarea maxLength={20} onValueChange={setValue} value={value} />
    </Field>
  )
}

describe('Textarea', () => {
  it('joins the Field label and is controlled', async () => {
    render(<Harness />)
    const textarea = screen.getByRole('textbox', { name: 'Notes' })

    await userEvent.type(textarea, 'Wind slab{Enter}on NE')

    expect(textarea).toHaveValue('Wind slab\non NE')
  })
})
