'use client'

import useForecastDates from '@components/features/forecast/model/useForecastDates'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'

import type { HeroRegion } from '../types'

// The texts a region's row and map tooltip show for its state
const useRegionStatus = () => {
  const t = useTranslations()
  const { formatTime } = useForecastDates()

  // "Issued 07:30 · valid to 18:00", "Forecast expired", "Next forecast in December" …
  const getMeta = ({ issuedAt, state, validUntil }: HeroRegion) => {
    if (state === 'noForecaster') return t('home.regions.lookingForForecaster')
    if (state === 'expired') return t('home.regions.expired')
    if (state === 'offSeason') return t('home.regions.nextForecast')
    if (!issuedAt || !validUntil) return t('home.regions.noForecastToday')

    return t('home.regions.issued', {
      time: formatTime(issuedAt),
      validUntil: formatTime(validUntil),
    })
  }

  // "High", "No Rating", "Expired", "Off-season", "No forecasts yet"
  const getStatus = ({ level, state }: HeroRegion) => {
    if (state === 'current' && level) return t(hazardLevelNamesByScale[level])
    if (state === 'noRating') return t(hazardLevelNamesByScale['0'])
    if (state === 'expired') return t('home.regions.expiredStatus')
    if (state === 'offSeason') return t('home.regions.offSeason')

    return t('home.regions.noForecaster')
  }

  return { getMeta, getStatus }
}

export default useRegionStatus
