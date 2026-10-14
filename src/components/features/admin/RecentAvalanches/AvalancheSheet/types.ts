import type { SheetSteps } from '@ds/patterns'

export type AvalancheSheetMode = 'edit' | 'view'

// What the footer is asking to confirm: deleting, or dropping unsaved edits
// before closing the panel / returning to the view
export type AvalancheSheetConfirm = 'close' | 'delete' | 'view' | null

// Position of the open record in the list behind the panel
export type AvalancheSheetNavigation = SheetSteps & {
  // null when the record isn't on the current page
  index: number | null
  total: number
}
