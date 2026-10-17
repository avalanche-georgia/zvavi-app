import { useState } from 'react'

// The list row under the pointer on a list + map page — its marker (or the
// cluster holding it, see useClusterHighlight) lights up. Cleared once the list
// is hidden: a mobile tap fires mouseenter too, and an unmounted row never
// fires mouseleave.
const useListHover = <TId>(isListShown: boolean) => {
  const [hoveredId, setHoveredId] = useState<TId | null>(null)

  if (!isListShown && hoveredId !== null) setHoveredId(null)

  return [hoveredId, setHoveredId] as const
}

export default useListHover
