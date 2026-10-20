'use client'

import { useMemo } from 'react'
import type { HistoryListItem } from '@data/hooks/forecasts'
import { useSearchParams } from 'next/navigation'

import { type ArchiveForecast, groupBySeason, toArchiveForecast, toTbilisiDay } from '../model'

const isArchiveForecast = (forecast: ArchiveForecast | null): forecast is ArchiveForecast =>
  forecast !== null

// The seasons, and the one picked in the URL (?season=2025) — newest by default.
// history.replaceState (which Next syncs into useSearchParams) keeps it linkable
// without a navigation.
const useArchiveSeason = (items: HistoryListItem[]) => {
  const searchParams = useSearchParams()
  const seasonParam = Number(searchParams.get('season'))

  const { forecasts, seasons } = useMemo(() => {
    const archiveForecasts = items.map(toArchiveForecast).filter(isArchiveForecast)

    return {
      forecasts: archiveForecasts,
      seasons: groupBySeason(archiveForecasts, toTbilisiDay(new Date())),
    }
  }, [items])

  const season = seasons.find(({ startYear }) => startYear === seasonParam) ?? seasons[0] ?? null

  const selectSeason = (startYear: number) => {
    const params = new URLSearchParams(window.location.search)

    params.set('season', String(startYear))
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  return { forecasts, season, seasons, selectSeason }
}

export default useArchiveSeason
