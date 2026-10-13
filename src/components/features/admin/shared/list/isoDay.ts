import { serverDateFormat } from '@domain/constants'
import { format, isValid, parseISO } from 'date-fns'

// Calendar days travel through the URL as yyyy-MM-dd

const isoDayPattern = /^\d{4}-\d{2}-\d{2}$/

// A URL value → the day, or null when it isn't one
export const readIsoDay = (value: string | null) =>
  value && isoDayPattern.test(value) ? value : null

// yyyy-MM-dd → local midnight
export const parseIsoDay = (value: string | null) => {
  if (!value) return null

  const date = parseISO(value)

  return isValid(date) ? date : null
}

export const toIsoDay = (date: Date | null) => (date ? format(date, serverDateFormat) : null)
