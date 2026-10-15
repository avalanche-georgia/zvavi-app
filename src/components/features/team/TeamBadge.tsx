import type { TeamSection } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

const toneClasses: Record<TeamSection | 'none', string> = {
  development: 'bg-accent-soft text-accent',
  forecasting: 'bg-primary-soft text-primary-ink',
  none: 'bg-tile text-muted',
}

type TeamBadgeProps = {
  team: TeamSection | null
  // The person's own wording; the section name when empty
  title: string | null
}

// The person's role, coloured by section: forecasting (brand), product (accent),
// none yet (neutral). Nothing without a title or a section
const TeamBadge = ({ team, title }: TeamBadgeProps) => {
  const t = useTranslations()
  const label = title || (team && t(`team.sections.${team}.badge`))

  if (!label) return null

  return (
    <span
      className={cn(
        'text-caption rounded-badge inline-flex h-5.5 w-fit max-w-full items-center px-2 font-semibold',
        toneClasses[team ?? 'none'],
      )}
    >
      <span className="truncate">{label}</span>
    </span>
  )
}

export default TeamBadge
