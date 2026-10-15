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
  const getMeta = ({ issuedAt, state, validUntil }: HeroRegion): string => {
    switch (state) {
      case 'current':
      case 'noRating':
        return issuedAt && validUntil
          ? t('home.regions.issued', {
              time: formatTime(issuedAt),
              validUntil: formatTime(validUntil),
            })
          : t('home.regions.noForecastToday')
      case 'expired':
        return t('home.regions.expired')
      case 'noForecaster':
        return t('home.regions.lookingForForecaster')
      case 'offSeason':
        return t('home.regions.nextForecast')
      case 'unavailable':
        return t('home.regions.unavailable')
    }
  }

  // "High", "No Rating", "Expired", "Off-season", "No forecasts yet"
  const getStatus = ({ level, state }: HeroRegion): string => {
    switch (state) {
      case 'current':
        return t(hazardLevelNamesByScale[level ?? '0'])
      case 'noRating':
        return t(hazardLevelNamesByScale['0'])
      case 'expired':
        return t('home.regions.expiredStatus')
      case 'noForecaster':
        return t('home.regions.noForecaster')
      case 'offSeason':
        return t('home.regions.offSeason')
      case 'unavailable':
        return ''
    }
  }

  return { getMeta, getStatus }
}

export default useRegionStatus
