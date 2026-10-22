'use client'

import { useSortable } from '@dnd-kit/react/sortable'

import { cn } from '@/lib/utils'

type SortableItemProps = {
  // Gets the drag handle's ref: only that element starts a drag, so the rest of the row stays clickable
  children: (handleRef: (element: Element | null) => void) => React.ReactNode
  // Give it the row's radius, so the drop-target ring follows its corners
  className?: string
  disabled?: boolean
  id: string
  index: number
}

// One row of a drag-to-reorder list (inside a dnd-kit DragDropProvider + <ul>)
const SortableItem = ({ children, className, disabled, id, index }: SortableItemProps) => {
  const { handleRef, isDragSource, isDropTarget, ref } = useSortable({ disabled, id, index })

  return (
    // data-dragging lets the item style its lifted state (e.g. a shadow); the
    // dragged item stays fully opaque
    <li
      ref={ref}
      className={cn(
        isDragSource && 'relative z-10',
        isDropTarget && 'ring-accent ring-2',
        className,
      )}
      data-dragging={isDragSource || undefined}
    >
      {children(handleRef)}
    </li>
  )
}

export default SortableItem
