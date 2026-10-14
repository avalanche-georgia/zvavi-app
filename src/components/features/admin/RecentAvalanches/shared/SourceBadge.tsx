import type { AvalancheSource } from '@domain/types'
import { StatusPill, type StatusPillTone } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Who logged the record: the team, or a public report
const sourceTones: Record<AvalancheSource, StatusPillTone> = {
  external: 'accent',
  team: 'neutral',
}

const SourceBadge = ({ source }: { source: AvalancheSource }) => {
  const t = useTranslations()

  return (
    <StatusPill tone={sourceTones[source]}>{t(`common.avalancheSources.${source}`)}</StatusPill>
  )
}

export default SourceBadge
