import { type RefObject, useEffect, useState } from 'react'

// True once the sentinel placed right above a sticky element has scrolled under
// the app header — i.e. the sticky element is now pinned.
const useIsStuck = (sentinelRef: RefObject<HTMLElement | null>) => {
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) return undefined

    const headerHeight = document.querySelector('body header')?.getBoundingClientRect().height ?? 0
    const observer = new IntersectionObserver(
      ([entry]) =>
        setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < headerHeight + 1),
      { rootMargin: `-${Math.round(headerHeight)}px 0px 0px 0px` },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [sentinelRef])

  return isStuck
}

export default useIsStuck
