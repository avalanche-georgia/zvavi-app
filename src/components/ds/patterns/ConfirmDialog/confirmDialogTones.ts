import { Info, type LucideIcon, OctagonAlert, TriangleAlert } from 'lucide-react'

export type ConfirmDialogTone = 'danger' | 'info' | 'warning'

type ToneStyle = {
  button: 'danger' | 'primary'
  // Destructive or data-losing questions start on Cancel; info on the action
  focusesCancel: boolean
  icon: LucideIcon
  role: 'alertdialog' | 'dialog'
  tile: string
}

// The icon names the dialog's type, never the action. danger: anything
// destructive or irreversible (delete, unpublish, revoke). warning: something
// unsaved is lost (discard, leave). info: a weighty step that isn't destructive
// (publish).
export const confirmDialogTones: Record<ConfirmDialogTone, ToneStyle> = {
  danger: {
    button: 'danger',
    focusesCancel: true,
    icon: OctagonAlert,
    role: 'alertdialog',
    tile: 'bg-danger/10 text-danger',
  },
  info: {
    button: 'primary',
    focusesCancel: false,
    icon: Info,
    role: 'dialog',
    tile: 'bg-accent-soft text-accent',
  },
  warning: {
    button: 'primary',
    focusesCancel: true,
    icon: TriangleAlert,
    role: 'alertdialog',
    tile: 'bg-warning-soft text-warning',
  },
}
