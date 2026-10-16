import { useState } from 'react'
import type { SheetSteps } from '@ds/patterns'

type StepSheetParams<T> = {
  getKey: (item: T) => string
  // The open item; null closes the sheet
  index: number | null
  items: T[]
  onNavigate: (index: number) => void
}

// State of a sheet that steps through a list: keeps the last item rendered
// while the sheet animates closed (also an item that has just left the list)
const useStepSheet = <T>({ getKey, index, items, onNavigate }: StepSheetParams<T>) => {
  const [shown, setShown] = useState({ index: index ?? 0, item: items[index ?? 0] })

  if (index !== null && items[index]) {
    const isChanged = items[index] !== shown.item || index !== shown.index

    if (isChanged) setShown({ index, item: items[index] })
  }

  const steps: SheetSteps = {
    hasNext: shown.index < items.length - 1,
    hasPrevious: shown.index > 0,
    onNext: () => onNavigate(shown.index + 1),
    onPrevious: () => onNavigate(shown.index - 1),
  }

  return {
    // Each item starts at the top
    scrollKey: shown.item === undefined ? undefined : getKey(shown.item),
    shownIndex: shown.index,
    shownItem: shown.item,
    steps,
  }
}

export default useStepSheet
