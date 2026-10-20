import type { DayRange } from '@ds/primitives'

import useArchiveFormat from '../hooks/useArchiveFormat'
import { isWholeMonth, toMonthId } from '../model'

// The archive's own date filter text: "January 2026" for a whole month, "12 Dec"
// for one day, else "12 Dec – 3 Jan" (an open end shows "…"); null when unset
const useDateFilterFormat = () => {
  const { formatDayShort, formatMonth } = useArchiveFormat()

  return ({ from, to }: DayRange) => {
    if (!from && !to) return null

    if (from && isWholeMonth(from, to, toMonthId(from))) return formatMonth(toMonthId(from))

    if (from && from === to) return formatDayShort(from)

    return `${from ? formatDayShort(from) : '…'} – ${to ? formatDayShort(to) : '…'}`
  }
}

export default useDateFilterFormat
