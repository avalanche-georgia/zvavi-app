import { differenceInMinutes } from 'date-fns'

const daysFromHours = 48

export type Validity =
  | { kind: 'expired' }
  | { count: number; kind: 'left'; unit: 'days' | 'hours' }
  | { kind: 'none' }

// What to say next to "Valid until": expired, time left (current forecast
// only), or nothing for a past forecast that is still within its window
export const getValidity = (validUntil: string, now: Date, isCurrent: boolean): Validity => {
  const hoursLeft = differenceInMinutes(validUntil, now) / 60

  if (hoursLeft <= 0) return { kind: 'expired' }
  if (!isCurrent) return { kind: 'none' }

  if (hoursLeft < daysFromHours) {
    return { count: Math.max(1, Math.round(hoursLeft)), kind: 'left', unit: 'hours' }
  }

  return { count: Math.round(hoursLeft / 24), kind: 'left', unit: 'days' }
}
