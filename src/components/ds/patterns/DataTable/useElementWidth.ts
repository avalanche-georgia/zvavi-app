'use client'

import { useLayoutEffect, useRef, useState } from 'react'

// Content width of an element, kept current with a ResizeObserver (null before the first
// measure). Measured before paint, so the first frame already uses the right layout.
const useElementWidth = <TElement extends HTMLElement>() => {
  const ref = useRef<TElement>(null)
  const [width, setWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    const element = ref.current

    if (!element) return

    setWidth(element.clientWidth)

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

export default useElementWidth
