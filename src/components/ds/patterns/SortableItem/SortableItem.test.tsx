import { DragDropProvider } from '@dnd-kit/react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import SortableItem from './SortableItem'

const renderList = (children: (handleRef: (element: Element | null) => void) => React.ReactNode) =>
  render(
    <DragDropProvider>
      <ul>
        <SortableItem className="rounded-card" id="first" index={0}>
          {children}
        </SortableItem>
      </ul>
    </DragDropProvider>,
  )

describe('SortableItem', () => {
  it('renders a list row with its classes, not lifted while idle', () => {
    renderList(() => 'Gudauri base')

    const row = screen.getByRole('listitem')

    expect(row).toHaveTextContent('Gudauri base')
    expect(row).toHaveClass('rounded-card')
    expect(row).not.toHaveAttribute('data-dragging')
  })

  it('hands the drag handle ref to its children', () => {
    const children = vi.fn((handleRef: (element: Element | null) => void) => (
      <button ref={handleRef} type="button">
        Drag
      </button>
    ))

    renderList(children)

    expect(children).toHaveBeenCalledWith(expect.any(Function))
    expect(screen.getByRole('button', { name: 'Drag' })).toBeInTheDocument()
  })
})
