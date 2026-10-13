import { useEffect, useRef, useState } from 'react'
import { useHeaderHeight } from '@components/hooks'

import type { SectionId } from '../model/sections'

// Same breakpoint as the page grid: the bar only sticks in the single-column layout
const desktopMediaQuery = '(min-width: 64rem)'

// A section counts as "in view" while its bottom is still this far below the header
const activeBottomOffset = 90

// Drives the jump bar: which section is being read, and whether the bar is
// pinned under the site header (mobile only)
const useJumpBar = (sectionIds: SectionId[]) => {
  const barRef = useRef<HTMLElement>(null)
  const headerHeight = useHeaderHeight()
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [isStuck, setIsStuck] = useState(false)
  const sectionsKey = sectionIds.join(',')

  useEffect(() => {
    let frame = 0
    const ids = sectionsKey.split(',').filter(Boolean) as SectionId[]

    const update = () => {
      frame = 0

      const { innerHeight, scrollY } = window
      const isAtBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      const inView = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect()

        return rect && rect.bottom > headerHeight + activeBottomOffset && rect.top < innerHeight / 2
      })
      const barTop = barRef.current?.getBoundingClientRect().top ?? Infinity

      // A short last section never reaches the upper half — the page end selects it
      setActiveSection(isAtBottom ? (ids[ids.length - 1] ?? null) : (inView ?? null))
      setIsStuck(barTop <= headerHeight + 1 && !window.matchMedia(desktopMediaQuery).matches)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [headerHeight, sectionsKey])

  return { activeSection, barRef, isStuck }
}

export default useJumpBar
