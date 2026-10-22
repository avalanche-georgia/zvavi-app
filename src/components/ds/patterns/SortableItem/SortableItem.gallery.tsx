'use client'

import { useState } from 'react'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
import { GripVertical } from 'lucide-react'

import SortableItem from './SortableItem'
import { IconButton } from '../../primitives/IconButton'

const initialStations = ['Gudauri base', 'Kobi pass', 'Sadzele ridge', 'Disabled: Bakuriani']

const SortableItemGallery = () => {
  const [stations, setStations] = useState(initialStations)

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !isSortableOperation(event.operation)) return

    const { source, target } = event.operation

    if (!source || !target) return

    setStations((current) => {
      const next = [...current]
      const [moved] = next.splice(source.initialIndex, 1)

      next.splice(target.index, 0, moved)

      return next
    })
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="rounded-card border-rule bg-surface flex max-w-sm flex-col overflow-clip border">
        {stations.map((station, index) => (
          <SortableItem
            key={station}
            className="border-rule bg-surface data-dragging:rounded-media data-dragging:shadow-float border-b last:border-b-0"
            disabled={station.startsWith('Disabled')}
            id={station}
            index={index}
          >
            {(handleRef) => (
              <div className="text-copy text-ink flex items-center gap-2 px-2 py-1.5">
                <IconButton
                  ref={handleRef}
                  aria-label={`Drag ${station}`}
                  className="text-muted cursor-grab touch-none active:cursor-grabbing"
                  tooltip="Drag to reorder"
                >
                  <GripVertical aria-hidden className="size-4.5" />
                </IconButton>
                {station}
              </div>
            )}
          </SortableItem>
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default SortableItemGallery
