import { useEffect, useRef, useState } from 'react'

type StepSheetParams<T> = {
  getKey: (item: T) => string
  // The open item; null closes the sheet
  index: number | null
  items: T[]
  onNavigate: (index: number) => void
}

// State of a sheet that steps through a list: keeps the last item rendered
// while the sheet animates closed (also an item that has just left the list),
// starts each item at the top, and steps with ←/→
const useStepSheet = <T>({ getKey, index, items, onNavigate }: StepSheetParams<T>) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState({ index: index ?? 0, item: items[index ?? 0] })

  if (index !== null && items[index]) {
    const isChanged = items[index] !== shown.item || index !== shown.index

    if (isChanged) setShown({ index, item: items[index] })
  }

  const shownKey = shown.item === undefined ? null : getKey(shown.item)

  useEffect(() => {
    bodyRef.current?.closest('[data-sheet-body]')?.scrollTo({ top: 0 })
  }, [shownKey])

  const step = (offset: number) => {
    const nextIndex = shown.index + offset

    if (nextIndex >= 0 && nextIndex < items.length) onNavigate(nextIndex)
  }

  // Keys from stacked sheets and viewers (portaled outside this popup) bubble
  // here through React too — ignore them, and leave browser shortcuts
  // (Alt+←, Cmd+←) alone
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowLeft') step(-1)
    if (event.key === 'ArrowRight') step(1)
  }

  return { bodyRef, handleKeyDown, shownIndex: shown.index, shownItem: shown.item, step }
}

export default useStepSheet
