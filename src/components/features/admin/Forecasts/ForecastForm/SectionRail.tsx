'use client'

import { useTranslations } from 'next-intl'

import useSectionStatus from './useSectionStatus'

import { cn } from '@/lib/utils'

// In-page section nav, wide screens only
const SectionRail = () => {
  const t = useTranslations()
  const sections = useSectionStatus()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label={t('admin.forecast.editor.rail.title')}
      className="sticky top-25 hidden self-start @min-[1180px]:block"
    >
      <p className="text-caption text-muted mb-2 font-semibold tracking-wide uppercase">
        {t('admin.forecast.editor.rail.title')}
      </p>
      <ul className="flex flex-col">
        {sections.map(({ id, isComplete, label, value }) => (
          <li key={id}>
            <a
              className="text-copy text-body hover:text-ink hover:bg-tile focus-ring -mx-2 flex h-9 items-center gap-2.5 rounded-md px-2 transition-colors"
              href={`#${id}`}
              onClick={(event) => handleClick(event, id)}
            >
              <span
                aria-hidden
                className={cn(
                  'size-2 shrink-0 rounded-full',
                  isComplete ? 'bg-accent' : 'ring-off ring-2 ring-inset',
                )}
              />
              <span className="flex-1">{label}</span>
              {value && <span className="text-caption text-muted">{value}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SectionRail
