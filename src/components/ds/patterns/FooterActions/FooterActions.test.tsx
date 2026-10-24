import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FooterActions from './FooterActions'

describe('FooterActions', () => {
  it('renders the note and the buttons in order', () => {
    render(
      <FooterActions note="Unsaved changes">
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </FooterActions>,
    )

    expect(screen.getByText('Unsaved changes')).toBeInTheDocument()
    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'Cancel',
      'Save',
    ])
  })
})
