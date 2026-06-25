import { useCallback, useEffect, useState } from 'react'
import { moveItemInArray } from '@data/helpers'

type WithId = { id: string }

const useSortableList = <T extends WithId>(
  items: T[] | undefined,
  onReorder: (ordered: T[]) => Promise<void>,
  onError?: (error: unknown) => void,
) => {
  const [localItems, setLocalItems] = useState<T[]>(items ?? [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (items) setLocalItems(items)
  }, [items])

  const handleReorder = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const previousItems = localItems
      const reordered = moveItemInArray(localItems, fromIndex, toIndex)

      setLocalItems(reordered)

      try {
        await onReorder(reordered)
      } catch (error) {
        setLocalItems(previousItems)
        onError?.(error)
      }
    },
    [localItems, onReorder, onError],
  )

  return { handleReorder, localItems }
}

export default useSortableList
