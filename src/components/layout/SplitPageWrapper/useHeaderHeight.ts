'use client'

import { useEffect, useState } from 'react'

// The app header is sticky and its height varies by breakpoint and content, so
// full-height layouts below it measure it instead of hard-coding a value.
const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const header = document.querySelector('body header')

    if (!header) return undefined

    const observer = new ResizeObserver(() =>
      setHeaderHeight(header.getBoundingClientRect().height),
    )

    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  return headerHeight
}

export default useHeaderHeight
