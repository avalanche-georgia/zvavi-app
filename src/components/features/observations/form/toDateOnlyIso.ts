import { atTbilisiTime } from '@/lib/tbilisiTime'

// A date-only choice is stored at noon in Georgia, so the calendar day reads the
// same everywhere it's shown (in Georgian time), whatever the reporter's device
// zone: device noon in Los Angeles is already the next day in Tbilisi
const toDateOnlyIso = (date: Date) => atTbilisiTime(date, '12:00').toISOString()

export default toDateOnlyIso
