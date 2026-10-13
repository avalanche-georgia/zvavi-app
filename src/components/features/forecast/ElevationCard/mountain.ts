// The mountain beside the elevation rows, in px. One shape: a straight slope
// on the left (from the middle of the top edge to the bottom-left corner), a
// vertical right edge.
export const mountainWidth = 122
// Between slices
export const sliceGap = 6
// How far the row dividers stop short of the slope
const dividerInset = 8

export const mountainClipPath = 'polygon(50% 0, 100% 0, 100% 100%, 0 100%)'

// Everything left of the slope, for a layer spanning both columns: a divider
// drawn across it ends parallel to the slope, wherever its row happens to be
export const besideSlopeClipPath = `polygon(0 0, calc(100% - ${mountainWidth / 2 + dividerInset}px) 0, calc(100% - ${mountainWidth + dividerInset}px) 100%, 0 100%)`
