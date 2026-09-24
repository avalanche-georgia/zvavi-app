import { useRef } from 'react'

// Mobile bottom sheet only — the desktop side panel doesn't swipe
const mobileMediaQuery = '(max-width: 63.99rem)'
const interactiveSelector = 'button, a, input, select, textarea'

// Released past this distance, or flicked faster than this, closes the sheet
const closeDistance = 120
const closeVelocity = 0.5 // px per ms
const settleMs = 200

type DragState = { pointerId: number; startTime: number; startY: number }

// Drag the sheet's handle/header down: the sheet follows the finger, then
// either slides away (and closes) or springs back. Styles are set directly on
// the popup while dragging — no re-render per pointer move.
const useSwipeToClose = (onClose: VoidFunction) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)

  const setPopupStyle = (transform: string, transition: string) => {
    if (!popupRef.current) return

    popupRef.current.style.transform = transform
    popupRef.current.style.transition = transition
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia(mobileMediaQuery).matches) return
    if ((event.target as HTMLElement).closest(interactiveSelector)) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startTime: event.timeStamp,
      startY: event.clientY,
    }
    setPopupStyle('', 'none')
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) return

    setPopupStyle(`translateY(${Math.max(0, event.clientY - drag.startY)}px)`, 'none')
  }

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) return

    dragRef.current = null

    const distance = Math.max(0, event.clientY - drag.startY)
    const velocity = distance / Math.max(1, event.timeStamp - drag.startTime)
    const transition = `transform ${settleMs}ms ease-out`

    if (distance > closeDistance || (distance > 10 && velocity > closeVelocity)) {
      setPopupStyle('translateY(100%)', transition)
      window.setTimeout(onClose, settleMs)
    } else {
      setPopupStyle('', transition)
    }
  }

  return {
    dragHandlers: {
      onPointerCancel: handlePointerEnd,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
    },
    popupRef,
  }
}

export default useSwipeToClose
