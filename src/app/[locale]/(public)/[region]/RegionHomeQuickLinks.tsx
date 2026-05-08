'use client'

import { ButtonLink } from '@components/shared'
import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const RegionHomeQuickLinks = () => {
  const t = useTranslations()
  const { region } = useRegionContext()

  if (!region) return null

  const { id: regionId } = region

  return (
    <div className="flex gap-3">
      <ButtonLink
        className="max-w-none flex-1 justify-center py-3"
        href={routes.forecastsByRegion(regionId).forecastArea}
        variant="outline"
      >
        {t('navigation.forecastArea')}
      </ButtonLink>
      <ButtonLink
        className="max-w-none flex-1 justify-center py-3"
        href={routes.forecastsByRegion(regionId).history}
        variant="outline"
      >
        {t('navigation.history')}
      </ButtonLink>
    </div>
  )
}

export default RegionHomeQuickLinks
