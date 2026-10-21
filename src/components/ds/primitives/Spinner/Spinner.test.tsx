import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Spinner from './Spinner'

describe('Spinner', () => {
  it('is a status named by its label', () => {
    render(<Spinner label="Loading…" />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })
})
