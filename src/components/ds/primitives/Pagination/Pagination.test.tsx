import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Pagination from './Pagination'

const renderPagination = (currentPage: number, onPageChange = vi.fn()) => {
  render(
    <Pagination
      currentPage={currentPage}
      nextLabel="Next page"
      onPageChange={onPageChange}
      previousLabel="Previous page"
      totalPages={3}
    />,
  )

  return onPageChange
}

describe('Pagination', () => {
  it('shows the position and steps both ways', async () => {
    const onPageChange = renderPagination(2)

    expect(screen.getByText('2 / 3')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))

    expect(onPageChange.mock.calls).toEqual([[1], [3]])
  })

  it('disables the arrow at each end', () => {
    renderPagination(1)

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()
  })
})
