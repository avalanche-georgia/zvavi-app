import { useRef } from 'react'
import type { Aspect } from '@domain/types'

// One press-drag-release gesture over the compass
type PaintStroke = {
  // Working copy — pointermove can fire several times before React re-renders
  aspects: Aspect[]
  hasMoved: boolean
  // true paints cells on, false paints them off — decided by the first cell
  mode: boolean
  startAspect: Aspect
}

type UsePaintDragParams = {
  aspects: Aspect[]
  onChange: (aspects: Aspect[]) => void
}

const getCellAspect = (container: HTMLElement | null, element: Element | null): Aspect | null => {
  const cell = element?.closest<HTMLElement>('[data-aspect]')

  if (!cell || !container?.contains(cell)) return null

  return cell.dataset.aspect as Aspect
}

// Tap toggles a cell; press and drag paints every cell passed over with the first
// cell's new state. The first cell only commits on release or once the pointer
// reaches another cell, so a vertical swipe that the browser turns into a page
// scroll (pointercancel) changes nothing.
const usePaintDrag = ({ aspects, onChange }: UsePaintDragParams) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<PaintStroke | null>(null)

  const paint = (stroke: PaintStroke, aspect: Aspect) => {
    if (stroke.aspects.includes(aspect) === stroke.mode) return

    stroke.aspects = stroke.mode
      ? [...stroke.aspects, aspect]
      : stroke.aspects.filter((selected) => selected !== aspect)
    onChange(stroke.aspects)
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    // The target, not the coordinates — screen reader virtual taps can report odd ones
    const aspect = getCellAspect(containerRef.current, event.target as Element)

    if (!aspect) return

    // No text selection or focus ring on drag; keyboard focus still works
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    strokeRef.current = {
      aspects,
      hasMoved: false,
      mode: !aspects.includes(aspect),
      startAspect: aspect,
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stroke = strokeRef.current

    if (!stroke) return

    // Captured pointers keep targeting the first cell, so hit-test the position
    const aspect = getCellAspect(
      containerRef.current,
      document.elementFromPoint(event.clientX, event.clientY),
    )

    if (!aspect || (!stroke.hasMoved && aspect === stroke.startAspect)) return

    if (!stroke.hasMoved) {
      stroke.hasMoved = true
      paint(stroke, stroke.startAspect)
    }

    paint(stroke, aspect)
  }

  const handlePointerUp = () => {
    const stroke = strokeRef.current

    if (stroke && !stroke.hasMoved) paint(stroke, stroke.startAspect)

    strokeRef.current = null
  }

  const handlePointerCancel = () => {
    strokeRef.current = null
  }

  return {
    containerRef,
    onLostPointerCapture: handlePointerCancel,
    onPointerCancel: handlePointerCancel,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
  }
}

export default usePaintDrag
