import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CountBadge from './CountBadge'

describe('CountBadge', () => {
  it('shows the count', () => {
    render(<CountBadge count={7} />)

    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it.each([0, undefined])('renders nothing for %s', (count) => {
    const { container } = render(<CountBadge count={count} />)

    expect(container).toBeEmptyDOMElement()
  })
})
