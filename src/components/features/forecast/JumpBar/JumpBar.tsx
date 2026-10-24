'use client'

import { useTranslations } from 'next-intl'

import useJumpBar from './useJumpBar'
import type { SectionId } from '../model/sections'

import { cn } from '@/lib/utils'

export type JumpChip = {
  count?: number
  id: SectionId
  label: string
}

type JumpBarProps = {
  chips: JumpChip[]
  className?: string
}

// Chips that jump to the page sections; the one being read is highlighted.
// Sticks under the site header on mobile, static on desktop.
const JumpBar = ({ chips, className }: JumpBarProps) => {
  const t = useTranslations()
  const { activeSection, barRef, isStuck } = useJumpBar(chips.map((chip) => chip.id))

  const handleChipClick = (event: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    const section = document.getElementById(id)

    if (!section) return

    event.preventDefault()

    const isMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    section.scrollIntoView({ behavior: isMotionReduced ? 'auto' : 'smooth', block: 'start' })
    // Keyboard and screen-reader users continue from the section, not the chip bar
    section.focus({ preventScroll: true })
  }

  return (
    <nav
      ref={barRef}
      aria-label={t('forecast.page.jump.label')}
      className={cn(
        'scrollbar-hide sticky top-(--forecast-header-height) z-20 -mx-4 flex gap-1.5 overflow-x-auto border-b px-4 py-2',
        'lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none',
        isStuck ? 'border-rule bg-canvas/95 backdrop-blur-sm' : 'bg-canvas border-transparent',
        className,
      )}
    >
      {chips.map(({ count, id, label }) => (
        <a
          key={id}
          aria-current={activeSection === id ? 'true' : undefined}
          className={cn(
            'focus-ring text-copy-sm relative flex h-8.5 shrink-0 items-center gap-1.5 rounded-full border px-3.25 font-semibold whitespace-nowrap transition-colors',
            'after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:-inset-y-1.5',
            activeSection === id
              ? 'border-accent bg-accent text-white'
              : 'border-rule bg-surface text-ink hover:border-rule-strong',
          )}
          href={`#${id}`}
          onClick={(event) => handleChipClick(event, id)}
        >
          {label}
          {count !== undefined && <span className="text-caption opacity-60">{count}</span>}
        </a>
      ))}
    </nav>
  )
}

export default JumpBar
