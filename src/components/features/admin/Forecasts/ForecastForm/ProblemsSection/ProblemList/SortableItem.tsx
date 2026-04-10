import { useSortable } from '@dnd-kit/react/sortable'
import clsx from 'clsx'

type SortableItemProps = {
  children: (handleRef: (element: Element | null) => void) => React.ReactNode
  disabled: boolean
  id: string
  index: number
}

const SortableItem = ({ children, disabled, id, index }: SortableItemProps) => {
  const { handleRef, isDragSource, isDropTarget, ref } = useSortable({ disabled, id, index })

  return (
    <li
      ref={ref}
      className={clsx({
        'opacity-80': isDragSource,
        'ring-primary/40 rounded-sm ring-2': isDropTarget,
      })}
    >
      {children(handleRef)}
    </li>
  )
}

export default SortableItem
