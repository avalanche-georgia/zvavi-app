import type { AvalancheSize, AvalancheType, RegionId } from '@domain/types'

// Reports this browser submitted that are still awaiting moderation — they
// aren't public yet, so the submitter only sees them from here
export type PendingOwnReport = {
  createdAt: string
  id: number
  regionId: RegionId
  size: AvalancheSize
  type: AvalancheType | 'unknown'
}

const storageKey = 'pending-observations'
// Rejected reports never turn public — expiry is what eventually drops them
const maxAgeMs = 14 * 24 * 60 * 60 * 1000

const isFresh = ({ createdAt }: PendingOwnReport) =>
  Date.now() - new Date(createdAt).getTime() < maxAgeMs

// Storage can be unavailable (private mode, blocked site data) — the preview
// is a convenience, so every access fails quietly
export const readPendingOwnReports = (): PendingOwnReport[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]')

    return Array.isArray(stored) ? (stored as PendingOwnReport[]).filter(isFresh) : []
  } catch {
    return []
  }
}

export const writePendingOwnReports = (reports: PendingOwnReport[]) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(reports.filter(isFresh)))
  } catch {
    // Ignored — see readPendingOwnReports
  }
}

export const addPendingOwnReport = (report: PendingOwnReport) =>
  writePendingOwnReports([...readPendingOwnReports(), report])
