import { Dialog } from '@base-ui/react/dialog'

export { default as Sheet } from './Sheet'
export { default as SheetCloseButton } from './SheetCloseButton'
export { default as SheetHeader } from './SheetHeader'
export { default as SheetStepButtons } from './SheetStepButtons'
export type { SheetSteps } from './types'

// For a custom header (e.g. a back link instead of ×) — prefer SheetHeader
export const SheetClose = Dialog.Close
export const SheetTitle = Dialog.Title
