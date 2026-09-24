export type AvalancheSheetMode = 'edit' | 'view'

// What the footer is asking to confirm: deleting, or dropping unsaved edits
// before closing the panel / returning to the view
export type AvalancheSheetConfirm = 'close' | 'delete' | 'view' | null
