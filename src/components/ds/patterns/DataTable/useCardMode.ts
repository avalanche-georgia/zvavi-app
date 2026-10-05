'use client'

import { useState } from 'react'

const enterAtOrBelow = 640
const leaveAbove = 680

// Narrow tables switch to cards. Hysteresis: the switch changes the page height, a scrollbar
// can appear or vanish and shift the width by ~15px — without a gap that flips every frame.
const useCardMode = (width: number | null, isEnabled: boolean) => {
  const [isCardMode, setIsCardMode] = useState(false)
  const shouldEnter = isEnabled && width !== null && width <= enterAtOrBelow
  const shouldLeave = !isEnabled || (width !== null && width > leaveAbove)

  if (!isCardMode && shouldEnter) setIsCardMode(true)
  if (isCardMode && shouldLeave) setIsCardMode(false)

  return isCardMode && isEnabled
}

export default useCardMode
