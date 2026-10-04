'use client'

import { useEffect, useRef, useState } from 'react'

// Content width of an element, kept current with a ResizeObserver (null before the first measure)
const useElementWidth = <TElement extends HTMLElement>() => {
  const ref = useRef<TElement>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

export default useElementWidth
