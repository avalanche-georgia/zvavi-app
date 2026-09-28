import { useRef } from 'react'

type UseRovingRatingParams<T extends string> = {
  onChange: (value: T) => void
  values: T[]
  value: T
}

// Radio-group keyboard model: ←/↓ previous, →/↑ next, Home/End, and a key equal
// to an option's value (e.g. "3") selects it. Focus follows the selection.
const useRovingRating = <T extends string>({
  onChange,
  value,
  values,
}: UseRovingRatingParams<T>) => {
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), values.length - 1)

    onChange(values[nextIndex])
    segmentRefs.current[nextIndex]?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = values.indexOf(value)
    const keyIndex = values.indexOf(event.key as T)
    const moves: Record<string, number> = {
      ArrowDown: currentIndex - 1,
      ArrowLeft: currentIndex - 1,
      ArrowRight: currentIndex + 1,
      ArrowUp: currentIndex + 1,
      End: values.length - 1,
      Home: 0,
    }
    const nextIndex = keyIndex >= 0 ? keyIndex : moves[event.key]

    if (nextIndex === undefined) return

    event.preventDefault()
    select(nextIndex)
  }

  const setSegmentRef = (index: number) => (element: HTMLButtonElement | null) => {
    segmentRefs.current[index] = element
  }

  return { handleKeyDown, setSegmentRef }
}

export default useRovingRating
