'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type ClampedTextProps = {
  children: string
  // Font size and width
  className?: string
  lines: 1 | 2
}

const lineClampClasses: Record<ClampedTextProps['lines'], string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
}

// Text cut to a few lines; "Read more" (only when something is cut) expands it in place
const ClampedText = ({ children, className, lines }: ClampedTextProps) => {
  const t = useTranslations()
  const textId = useId()
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  // Where the text's top was on screen before toggling
  const textTopRef = useRef<number | null>(null)

  // Measured while clamped, again whenever the card's width changes
  useEffect(() => {
    const text = textRef.current

    if (!text || isExpanded) return undefined

    const observer = new ResizeObserver(() => {
      setIsOverflowing(text.scrollHeight > text.clientHeight + 1)
    })

    observer.observe(text)

    return () => observer.disconnect()
  }, [children, isExpanded])

  // Keep the text's top where it was, so it grows / shrinks downward even when
  // the browser's scroll anchoring would shift the page
  useLayoutEffect(() => {
    const text = textRef.current
    const previousTop = textTopRef.current

    if (!text || previousTop === null) return

    textTopRef.current = null
    window.scrollBy(0, text.getBoundingClientRect().top - previousTop)
  }, [isExpanded])

  const handleToggle = () => {
    textTopRef.current = textRef.current?.getBoundingClientRect().top ?? null
    setIsExpanded((wasExpanded) => !wasExpanded)
  }

  return (
    <>
      <p
        ref={textRef}
        className={cn(
          'text-body text-pretty whitespace-pre-line',
          !isExpanded && lineClampClasses[lines],
          className,
        )}
        id={textId}
      >
        {children}
      </p>
      {isOverflowing && (
        <Button
          aria-controls={textId}
          aria-expanded={isExpanded}
          className="-mt-1.5 self-start"
          onClick={handleToggle}
          size="sm"
          variant="text"
        >
          {isExpanded ? t('partners.page.showLess') : t('partners.page.readMore')}
        </Button>
      )}
    </>
  )
}

export default ClampedText
