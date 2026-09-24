import { useEffect, useRef } from 'react'
import { Spinner } from '@components/ui'
import { useTranslations } from 'next-intl'
import { useEventCallback } from 'usehooks-ts'

type LoadMoreTriggerProps = {
  isError: boolean
  isLoading: boolean
  onLoadMore: VoidFunction
}

const getScrollParent = (element: HTMLElement): HTMLElement | null => {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const { overflowY } = getComputedStyle(parent)

    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent
    }
  }

  return null
}

// Sits after the last card: loads the next page as it nears the viewport (or
// the scrolling list column on desktop). On error, offers a manual retry.
const LoadMoreTrigger = ({ isError, isLoading, onLoadMore }: LoadMoreTriggerProps) => {
  const t = useTranslations()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const handleLoadMore = useEventCallback(onLoadMore)

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel || isError || isLoading) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handleLoadMore()
      },
      // The margin only extends the root — so the root must be the element that
      // actually scrolls (the list column on desktop, the viewport on mobile)
      { root: getScrollParent(sentinel), rootMargin: '600px 0px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [handleLoadMore, isError, isLoading])

  return (
    <div ref={sentinelRef} className="text-muted flex min-h-16 items-center justify-center text-sm">
      {isLoading && (
        <div className="relative size-8">
          <Spinner size="sm" />
        </div>
      )}
      {isError && (
        <button
          className="border-rule text-ink hover:bg-tile h-10 rounded-[11px] border bg-white px-3.5 font-semibold transition-colors"
          onClick={onLoadMore}
          type="button"
        >
          {t('observations.list.loadMoreFailed')}
        </button>
      )}
    </div>
  )
}

export default LoadMoreTrigger
