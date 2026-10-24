import { useEffect, useRef } from 'react'
import { Button, Spinner } from '@ds/primitives'
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
    <div
      ref={sentinelRef}
      className="text-muted text-copy flex min-h-16 items-center justify-center"
    >
      {isLoading && <Spinner label={t('common.messages.loading')} size="sm" />}
      {isError && (
        <Button onClick={onLoadMore} size="sm" variant="secondary">
          {t('observations.list.loadMoreFailed')}
        </Button>
      )}
    </div>
  )
}

export default LoadMoreTrigger
