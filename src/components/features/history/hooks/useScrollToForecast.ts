'use client'

import { type RefObject } from 'react'
import { useHeaderHeight } from '@components/hooks'
import { flushSync } from 'react-dom'

export const getForecastRowId = (forecastId: number) => `archive-forecast-${forecastId}`

const flashClass = 'animate-row-flash'

// Breathing room between the sticky filter bar and the row
const gap = 8

type UseScrollToForecastParams = {
  filterBarRef: RefObject<HTMLElement | null>
  onFiltersClear: VoidFunction
}

// Scrolls the page to a forecast's row (under the sticky header and filter
// bar) and flashes it. A row hidden by the filters clears them first.
const useScrollToForecast = ({ filterBarRef, onFiltersClear }: UseScrollToForecastParams) => {
  const headerHeight = useHeaderHeight()

  return (forecastId: number, isFilteredOut: boolean) => {
    if (isFilteredOut) flushSync(onFiltersClear)

    const row = document.getElementById(getForecastRowId(forecastId))

    if (!row) return

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = headerHeight + (filterBarRef.current?.offsetHeight ?? 0) + gap

    window.scrollTo({
      behavior: isReducedMotion ? 'auto' : 'smooth',
      top: row.getBoundingClientRect().top + window.scrollY - offset,
    })

    if (isReducedMotion) return

    // Restart the animation when the same row is picked twice
    row.classList.remove(flashClass)
    void row.offsetWidth
    row.classList.add(flashClass)
  }
}

export default useScrollToForecast
