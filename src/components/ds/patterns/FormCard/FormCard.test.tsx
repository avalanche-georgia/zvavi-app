import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FormCard from './FormCard'

describe('FormCard', () => {
  it('is a section named by its title, announcing required', () => {
    render(
      <FormCard required requiredText="Required" sectionId="where" title="Where?">
        <p>Fields</p>
      </FormCard>,
    )
    const section = screen.getByRole('region', { name: 'Where? (Required)' })

    expect(section).toHaveAttribute('id', 'where')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Where? *')
  })

  it('links a card-level error for useScrollToFirstError', () => {
    render(
      <FormCard error="Drop a pin" title="Where?">
        <p>Map</p>
      </FormCard>,
    )

    expect(screen.getByRole('region', { name: 'Where?' })).toHaveAccessibleDescription('Drop a pin')
    expect(screen.getByText('Drop a pin')).toHaveAttribute('data-field-error')
  })
})
