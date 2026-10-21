import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvalancheLoader from './AvalancheLoader'

describe('AvalancheLoader', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders a named status at size %s', (size) => {
    render(<AvalancheLoader label="Loading…" size={size} />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })

  // Two loaders on one page must not share gradient / clip ids
  it('gives every instance its own SVG ids', () => {
    const { container } = render(
      <>
        <AvalancheLoader label="One" />
        <AvalancheLoader label="Two" />
      </>,
    )
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
