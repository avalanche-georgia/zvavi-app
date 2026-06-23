import { useCallback, useEffect, useState } from 'react'
import { moveItemInArray } from '@data/helpers'

type WithId = { id: string }

const useSortableList = <T extends WithId>(
  items: T[] | undefined,
  onReorder: (ordered: T[]) => Promise<void>,
) => {
  const [localItems, setLocalItems] = useState<T[]>(items ?? [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (items) setLocalItems(items)
  }, [items])

  const handleReorder = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const previous = localItems
      const reordered = moveItemInArray(localItems, fromIndex, toIndex)

      setLocalItems(reordered)

      try {
        await onReorder(reordered)
      } catch {
        setLocalItems(previous)
      }
    },
    [localItems, onReorder],
  )

  return { handleReorder, localItems }
}

export default useSortableList
