import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ContentCard from './ContentCard'

describe('ContentCard', () => {
  it('is a section with an H2 title, its action and content', () => {
    render(
      <ContentCard action={<a href="#more">More</a>} id="limits" title="Limits" tone="danger">
        <p>Body</p>
      </ContentCard>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Limits' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'More' })).toBeInTheDocument()
    expect(screen.getByText('Body').closest('section')).toHaveAttribute('id', 'limits')
  })
})
