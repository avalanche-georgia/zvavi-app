'use client'

import { useHeaderHeight } from '@components/hooks'

import { cn } from '@/lib/utils'

type SplitPageWrapperProps = {
  // Secondary pane — sticky and full-height on desktop (e.g. a map)
  aside: React.ReactNode
  // Primary pane — scrolls on its own on desktop
  children: React.ReactNode
  // Space to leave below on desktop (e.g. the footer, so the whole page fits the screen)
  desktopBottomOffset?: number
  // Mobile shows the aside below the primary pane only when asked (the page
  // hides its own list content meanwhile)
  isAsideShownOnMobile?: boolean
  // Height of sticky content above the aside on mobile, so the aside fills
  // exactly the rest of the viewport
  mobileAsideOffset?: number
}

// Full-height page layout, as wide as the header: a fixed-width primary column next to a
// flexible aside on desktop, a single column on mobile. Unlike PageWrapper it
// has no title — the page renders its own header inside the primary column.
const SplitPageWrapper = ({
  aside,
  children,
  desktopBottomOffset = 0,
  isAsideShownOnMobile = false,
  mobileAsideOffset = 0,
}: SplitPageWrapperProps) => {
  const headerHeight = useHeaderHeight()

  const style = {
    '--split-desktop-bottom-offset': `${desktopBottomOffset}px`,
    '--split-header-height': `${headerHeight}px`,
    '--split-mobile-aside-offset': `${mobileAsideOffset}px`,
  } as React.CSSProperties

  return (
    <div
      className="bg-canvas text-ink min-h-[calc(100dvh-var(--split-header-height))] lg:min-h-[calc(100dvh-var(--split-header-height)-var(--split-desktop-bottom-offset))]"
      style={style}
    >
      <div className="mx-auto max-w-(--breakpoint-xl) lg:grid lg:grid-cols-[460px_minmax(0,1fr)]">
        <div className="lg:border-rule min-w-0 lg:h-[calc(100dvh-var(--split-header-height)-var(--split-desktop-bottom-offset))] lg:overflow-y-auto lg:border-r">
          {children}
        </div>

        <div
          className={cn(
            'relative isolate',
            'h-[calc(100dvh-var(--split-header-height)-var(--split-mobile-aside-offset))]',
            'lg:sticky lg:top-(--split-header-height) lg:block lg:h-[calc(100dvh-var(--split-header-height)-var(--split-desktop-bottom-offset))]',
            !isAsideShownOnMobile && 'max-lg:hidden',
          )}
        >
          {aside}
        </div>
      </div>
    </div>
  )
}

export default SplitPageWrapper
