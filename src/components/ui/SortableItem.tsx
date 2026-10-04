'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import { cn } from 'src/lib/utils'

type SortableItemProps = {
  children: (handleRef: (element: Element | null) => void) => React.ReactNode
  className?: string
  disabled?: boolean
  id: string
  index: number
}

const SortableItem = ({ children, className, disabled, id, index }: SortableItemProps) => {
  const { handleRef, isDragSource, isDropTarget, ref } = useSortable({ disabled, id, index })

  return (
    // data-dragging lets the item style its lifted state (e.g. a shadow); the
    // dragged item stays fully opaque
    <li
      ref={ref}
      className={cn(
        isDragSource && 'relative z-10',
        isDropTarget && 'ring-primary/40 rounded-sm ring-2',
        className,
      )}
      data-dragging={isDragSource || undefined}
    >
      {children(handleRef)}
    </li>
  )
}

export default SortableItem
