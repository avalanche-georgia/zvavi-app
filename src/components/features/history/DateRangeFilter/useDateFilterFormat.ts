import useArchiveFormat from '../hooks/useArchiveFormat'
import { isWholeMonth, toMonthId } from '../model'

// "January 2026" for a whole month, "12 Dec" for one day, else "12 Dec – 3 Jan"
// (an open end shows "…"); null when no dates are set
const useDateFilterLabel = (from: string | null, to: string | null) => {
  const { formatDayShort, formatMonth } = useArchiveFormat()

  if (!from && !to) return null

  if (from && isWholeMonth(from, to, toMonthId(from))) return formatMonth(toMonthId(from))

  if (from && from === to) return formatDayShort(from)

  return `${from ? formatDayShort(from) : '…'} – ${to ? formatDayShort(to) : '…'}`
}

export default useDateFilterLabel
