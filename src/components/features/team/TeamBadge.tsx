import type { TeamSection } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

const toneClasses: Record<TeamSection, string> = {
  development: 'bg-accent-soft text-accent',
  forecasting: 'bg-primary-soft text-primary-ink',
}

type TeamBadgeProps = {
  team: TeamSection
  // The person's own wording; the section name when empty
  title: string | null
}

// The person's role, coloured by section: forecasting (brand) or product (accent)
const TeamBadge = ({ team, title }: TeamBadgeProps) => {
  const t = useTranslations()

  return (
    <span
      className={cn(
        'text-caption inline-flex h-5.5 w-fit max-w-full items-center rounded-md px-2 font-semibold',
        toneClasses[team],
      )}
    >
      <span className="truncate">{title || t(`team.sections.${team}.badge`)}</span>
    </span>
  )
}

export default TeamBadge
