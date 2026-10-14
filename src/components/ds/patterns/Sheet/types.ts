// Previous / next through the list a sheet belongs to: drives the header arrows
// (SheetStepButtons) and the ←/→ keys
export type SheetSteps = {
  hasNext: boolean
  hasPrevious: boolean
  onNext: VoidFunction
  onPrevious: VoidFunction
}
