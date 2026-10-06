import { setHours, startOfDay } from 'date-fns'

// A date-only choice is stored at local noon, so the calendar day survives any
// viewer's timezone offset (local midnight in UTC+4 is the previous day in UTC)
const toDateOnlyIso = (date: Date) => setHours(startOfDay(date), 12).toISOString()

export default toDateOnlyIso
