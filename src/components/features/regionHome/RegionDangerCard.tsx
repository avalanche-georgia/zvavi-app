'use client'

import { useState } from 'react'
import { DangerCard } from '@components/features/forecast'
import { DangerInfo, InfoSheet } from '@components/features/forecast/InfoSheet'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { Forecast, RegionId, TeamMember } from '@domain/types'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

type RegionDangerCardProps = {
  forecast: Forecast
  forecasterProfile: TeamMember | null
  regionId: RegionId
}

// The region's danger card: the band explains the level in a sheet, the footer row
// opens the full forecast
const RegionDangerCard = ({ forecast, forecasterProfile, regionId }: RegionDangerCardProps) => {
  const t = useTranslations()
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const { hazardLevels } = forecast

  return (
    <>
      <DangerCard
        forecast={forecast}
        forecastHref={routes.forecastsByRegion(regionId).current}
        forecasterProfile={forecasterProfile}
        isCurrentForecast
        onInfoOpen={() => setIsInfoOpen(true)}
      />
      <InfoSheet
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={t(hazardLevelNamesByScale[hazardLevels.overall])}
      >
        <DangerInfo hazardLevels={hazardLevels} scope="overall" />
      </InfoSheet>
    </>
  )
}

export default RegionDangerCard
