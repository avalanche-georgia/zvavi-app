import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Field from './Field'
import FieldGroup from './FieldGroup'
import { TextField } from '../TextField'

const noop = () => undefined

describe('Field', () => {
  it('labels its control and links hint, description and error', () => {
    render(
      <Field description="As on the map" error="Too long" hint="Optional" label="Place" required>
        <TextField onValueChange={noop} required value="" />
      </Field>,
    )
    const input = screen.getByRole('textbox', { name: 'Place' })

    expect(input).toHaveAccessibleDescription('Optional As on the map Too long')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    // useScrollToFirstError looks for this marker
    expect(screen.getByText('Too long')).toHaveAttribute('data-field-error')
  })
})

describe('FieldGroup', () => {
  it('is a named fieldset that announces required and links its error', () => {
    render(
      <FieldGroup error="Pick one" label="Aspect" required requiredText="Required">
        <button type="button">N</button>
      </FieldGroup>,
    )
    const group = screen.getByRole('group', { name: 'Aspect (Required)' })

    expect(group).toHaveAccessibleDescription('Pick one')
  })
})
