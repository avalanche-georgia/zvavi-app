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
    const ids = sectionsKey.split(',').filter(Boolean) as SectionId[]

    const update = () => {
      const { innerHeight, scrollY } = window
      // Only once the page has actually been scrolled — a page that fits the
      // viewport is at its "bottom" from the start
      const isAtBottom =
        scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      const inView = ids.find((id) => {
        const rect = document.getElementById(id)?.getBoundingClientRect()

        return rect && rect.bottom > headerHeight + activeBottomOffset && rect.top < innerHeight / 2
      })
      const barTop = barRef.current?.getBoundingClientRect().top ?? Infinity

      // A short last section never reaches the upper half — the page end selects it
      setActiveSection(isAtBottom ? (ids[ids.length - 1] ?? null) : (inView ?? null))
      setIsStuck(barTop <= headerHeight + 1 && !window.matchMedia(desktopMediaQuery).matches)
    }

    // Scroll events already fire at most once per frame; React drops the
    // state updates that change nothing
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [headerHeight, sectionsKey])

  return { activeSection, barRef, isStuck }
}

export default useJumpBar
