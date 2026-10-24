import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LoadingState from './LoadingState'

describe('LoadingState', () => {
  it('shows the mountain loader with its label', () => {
    render(<LoadingState isPage label="Loading forecasts…" />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading forecasts…')
  })
})
