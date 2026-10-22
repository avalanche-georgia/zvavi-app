import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import SuccessState from './SuccessState'

describe('SuccessState', () => {
  // The control that finished the flow is gone; focus must not fall back to <body>
  it('moves focus to its title', () => {
    render(
      <SuccessState
        actions={<button type="button">Submit another</button>}
        description="We'll review it shortly."
        title="Thank you!"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Thank you!' })).toHaveFocus()
    expect(screen.getByText("We'll review it shortly.")).toBeInTheDocument()
  })
})
