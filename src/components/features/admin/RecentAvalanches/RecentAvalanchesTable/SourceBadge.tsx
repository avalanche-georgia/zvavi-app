import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type SourceBadgeProps = {
  className?: string
  source: AvalancheSource
}

const sourceStyles: Record<AvalancheSource, string> = {
  external: 'bg-purple-100 text-purple-800',
  team: 'bg-blue-100 text-blue-800',
}

const SourceBadge = ({ className, source }: SourceBadgeProps) => {
  const t = useTranslations()

  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-xs font-medium',
        sourceStyles[source],
        className,
      )}
    >
      {t(`common.avalancheSources.${source}`)}
    </span>
  )
}

export default SourceBadge
