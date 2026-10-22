'use client'

import { useSortable } from '@dnd-kit/react/sortable'

import { cn } from '@/lib/utils'

type SortableItemProps = {
  // Gets the drag handle's ref: only that element starts a drag, so the rest of the row stays clickable
  children: (handleRef: (element: Element | null) => void) => React.ReactNode
  // Give it the row's radius, so the lifted ring follows its corners (a flat list row can
  // round only while lifted: `data-dragging:rounded-media`)
  className?: string
  disabled?: boolean
  id: string
  index: number
}

// One row of a drag-to-reorder list (inside a dnd-kit DragDropProvider + <ul>)
const SortableItem = ({ children, className, disabled, id, index }: SortableItemProps) => {
  const { handleRef, isDragSource, ref } = useSortable({ disabled, id, index })

  return (
    // The lifted item gets a brand ring; data-dragging lets it add more (e.g. a
    // shadow). It stays fully opaque
    <li
      ref={ref}
      className={cn(isDragSource && 'ring-primary relative z-10 ring-2', className)}
      data-dragging={isDragSource || undefined}
    >
      {children(handleRef)}
    </li>
  )
}

export default SortableItem
