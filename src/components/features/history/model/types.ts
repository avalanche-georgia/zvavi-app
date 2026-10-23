import type { AvalancheProblemType, HazardLevelScale, HistoryListItem } from '@domain/types'

// A forecast with its Georgian calendar days worked out once. Days are
// yyyy-MM-dd and months yyyy-MM, so they compare as plain strings.
export type ArchiveForecast = HistoryListItem & {
  endDay: string
  // The month its range starts in
  monthId: string
  publishedAt: string
  startDay: string
}

export type ArchiveSeason = {
  forecasts: ArchiveForecast[]
  // "2025–26"
  label: string
  startYear: number
}

export type ArchiveMonth = {
  forecasts: ArchiveForecast[]
  monthId: string
}

export type ArchiveFilters = {
  // Inclusive yyyy-MM-dd bounds; either end may be open
  from: string | null
  levels: HazardLevelScale[]
  problem: AvalancheProblemType | null
  to: string | null
}

export type ArchiveSort = 'asc' | 'desc'

export type ArchiveDateRange = Pick<ArchiveFilters, 'from' | 'to'>
