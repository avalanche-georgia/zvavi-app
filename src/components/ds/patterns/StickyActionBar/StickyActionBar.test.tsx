import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import StickyActionBar from './StickyActionBar'

describe('StickyActionBar', () => {
  it('shows status and action; only the announcement is live', () => {
    render(
      <StickyActionBar
        action={<button type="button">Send</button>}
        announcement="Will send once photos finish uploading"
        status="2 photos uploading"
      />,
    )

    expect(screen.getByText('2 photos uploading')).not.toHaveAttribute('aria-live')
    expect(screen.getByText('Will send once photos finish uploading')).toHaveAttribute(
      'aria-live',
      'polite',
    )
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })
})
