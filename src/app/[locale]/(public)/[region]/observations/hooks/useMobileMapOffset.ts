import { useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'

// Mobile map view fits the map under the page heading + sticky toolbar, so the
// whole view (including the peek card at its bottom) stays on screen
const useMobileMapOffset = () => {
  const headingRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const { height: headingHeight = 0 } = useResizeObserver({
    box: 'border-box',
    ref: headingRef as React.RefObject<HTMLDivElement>,
  })
  const { height: toolbarHeight = 0 } = useResizeObserver({
    box: 'border-box',
    ref: toolbarRef as React.RefObject<HTMLDivElement>,
  })

  return { headingRef, mobileMapOffset: headingHeight + toolbarHeight, toolbarRef }
}

export default useMobileMapOffset
