import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import DialogList from './DialogList'

const moreLabel = (count: number) => `+${count} more`
const records = (count: number) => Array.from({ length: count }, (_, index) => `A-${index + 1}`)

describe('DialogList', () => {
  it('lists every item when there are no more than max', () => {
    render(<DialogList items={records(3)} moreLabel={moreLabel} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.queryByText(/more$/)).not.toBeInTheDocument()
  })

  it('shows five by default and counts the rest', () => {
    render(<DialogList items={records(12)} moreLabel={moreLabel} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getByText('+7 more')).toBeInTheDocument()
  })

  it('takes a custom max', () => {
    render(<DialogList items={records(4)} max={2} moreLabel={moreLabel} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('+2 more')).toBeInTheDocument()
  })
})
