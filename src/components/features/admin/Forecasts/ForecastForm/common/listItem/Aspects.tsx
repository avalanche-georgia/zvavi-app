import type { Aspect, Avalanche, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import PropertyWrapper from './PropertyWrapper'

const getAspectsString = (aspects: Aspect[]) => {
  if (!aspects || aspects.length === 0) return '—'

  return aspects.map((aspect) => aspect.toUpperCase()).join(', ')
}

const Aspects = ({ className, item }: { item: Problem | Avalanche; className?: string }) => {
  const t = useTranslations()
  const { alpine, highAlpine, subAlpine } = item.aspects

  return (
    <div className={className}>
      <PropertyWrapper title={t('common.elevationZones.highAlpine')} titleClassname="w-28">
        <p>{getAspectsString(highAlpine)}</p>
      </PropertyWrapper>

      <PropertyWrapper title={t('common.elevationZones.alpine')} titleClassname="w-28">
        <p>{getAspectsString(alpine)}</p>
      </PropertyWrapper>

      <PropertyWrapper title={t('common.elevationZones.subAlpine')} titleClassname="w-28">
        <p>{getAspectsString(subAlpine)}</p>
      </PropertyWrapper>
    </div>
  )
}

export default Aspects
