import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FallbackImage from './FallbackImage'

const fallback = <span>No photo</span>

describe('FallbackImage', () => {
  it('shows the first source', () => {
    render(<FallbackImage alt="Slope" sources={['/small.jpg', '/large.jpg']} />)

    expect(screen.getByRole('img', { name: 'Slope' })).toHaveAttribute('src', '/small.jpg')
  })

  it('tries the next source when one fails', () => {
    render(<FallbackImage alt="Slope" sources={['/small.jpg', '/large.jpg']} />)

    fireEvent.error(screen.getByRole('img', { name: 'Slope' }))

    expect(screen.getByRole('img', { name: 'Slope' })).toHaveAttribute('src', '/large.jpg')
  })

  it('shows the fallback once every source has failed', () => {
    render(<FallbackImage alt="Slope" fallback={fallback} sources={['/small.jpg']} />)

    fireEvent.error(screen.getByRole('img', { name: 'Slope' }))

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('No photo')).toBeInTheDocument()
  })

  it('starts over when the sources change', () => {
    const { rerender } = render(
      <FallbackImage alt="Slope" fallback={fallback} sources={['/old.jpg']} />,
    )

    fireEvent.error(screen.getByRole('img', { name: 'Slope' }))
    rerender(<FallbackImage alt="Slope" fallback={fallback} sources={['/signed.jpg']} />)

    expect(screen.getByRole('img', { name: 'Slope' })).toHaveAttribute('src', '/signed.jpg')
  })
})
