import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import StatusPill from './StatusPill'

describe('StatusPill', () => {
  it('names the state in text, with the dot only when asked', () => {
    const { container, rerender } = render(<StatusPill tone="success">Published</StatusPill>)

    expect(screen.getByText('Published')).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden]')).toBeNull()

    rerender(
      <StatusPill tone="success" withDot>
        Published
      </StatusPill>,
    )

    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument()
  })
})
