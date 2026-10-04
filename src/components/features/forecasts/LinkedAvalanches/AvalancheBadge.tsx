import type { AvalancheStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type AvalancheBadgeKind = AvalancheStatus | 'alreadyLinked' | 'notSaved'

const kindClasses: Record<AvalancheBadgeKind, string> = {
  alreadyLinked: 'bg-tile text-muted',
  archived: 'bg-tile text-muted',
  draft: 'bg-warning-soft text-warning',
  notSaved: 'bg-primary-soft text-primary-ink',
  pending: 'bg-warning-soft text-warning',
  published: 'bg-success-soft text-success',
}

// Record status, or the forecast-side link state
const AvalancheBadge = ({ kind }: { kind: AvalancheBadgeKind }) => {
  const t = useTranslations()
  const label =
    kind === 'alreadyLinked' || kind === 'notSaved'
      ? t(`admin.forecast.editor.avalanches.badges.${kind}`)
      : t(`common.avalancheStatuses.${kind}`)

  return (
    <span
      className={cn('rounded-badge px-1.5 py-0.5 text-[11px] font-semibold', kindClasses[kind])}
    >
      {label}
    </span>
  )
}

export default AvalancheBadge
