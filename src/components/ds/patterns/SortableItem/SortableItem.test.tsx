import { DragDropProvider } from '@dnd-kit/react'
import type * as Sortable from '@dnd-kit/react/sortable'
import { useSortable } from '@dnd-kit/react/sortable'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import SortableItem from './SortableItem'

// Real by default; one test fakes the lifted state, which jsdom can't drag into
vi.mock('@dnd-kit/react/sortable', async (importOriginal) => {
  const actual = await importOriginal<typeof Sortable>()

  return { ...actual, useSortable: vi.fn(actual.useSortable) }
})

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

  it('marks the lifted row and rings it', () => {
    vi.mocked(useSortable).mockReturnValueOnce({
      handleRef: vi.fn(),
      isDragSource: true,
      ref: vi.fn(),
    } as unknown as ReturnType<typeof useSortable>)

    renderList(() => 'Gudauri base')

    const row = screen.getByRole('listitem')

    expect(row).toHaveAttribute('data-dragging', 'true')
    expect(row).toHaveClass('ring-primary', 'ring-2')
  })
})
