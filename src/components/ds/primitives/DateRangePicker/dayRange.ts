// A range of calendar days as yyyy-MM-dd strings; either end may be open (null).
// ISO day strings compare correctly as plain strings.
export type DayRange = { from: string | null; to: string | null }

// Which end the next calendar click sets. 'new' starts a fresh range: nothing is
// picked yet, or the last range is complete.
export type ActiveEnd = 'from' | 'new' | 'to'

export const emptyDayRange: DayRange = { from: null, to: null }

export const isSameRange = (rangeA: DayRange, rangeB: DayRange) =>
  rangeA.from === rangeB.from && rangeA.to === rangeB.to

// Where a picker starts when it opens: after a start-only pick it waits for the
// end, after an end-only pick for the start; otherwise a click starts afresh
export const getInitialEnd = ({ from, to }: DayRange): ActiveEnd => {
  if (from && !to) return 'to'
  if (!from && to) return 'from'

  return 'new'
}

// Applies a clicked day to the range and says which end the next click sets
export const pickDay = (
  { from, to }: DayRange,
  activeEnd: ActiveEnd,
  day: string,
): { nextEnd: ActiveEnd; range: DayRange } => {
  if (activeEnd === 'new') return { nextEnd: 'to', range: { from: day, to: null } }

  if (activeEnd === 'from') {
    // A start after the end drops the end
    const nextTo = to && day > to ? null : to

    return { nextEnd: nextTo ? 'new' : 'to', range: { from: day, to: nextTo } }
  }

  // Picking the end: a day before the start becomes the new start instead
  if (from && day < from) return { nextEnd: 'to', range: { from: day, to } }

  return { nextEnd: 'new', range: { from, to: day } }
}
