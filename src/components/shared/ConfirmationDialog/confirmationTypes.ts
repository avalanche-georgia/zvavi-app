import type { ConfirmDialogTone } from '@ds/patterns'
import { Info, LogOut, type LucideIcon, Send, Trash2, TriangleAlert } from 'lucide-react'

export type ConfirmationType = 'confirm' | 'delete' | 'discard' | 'leave' | 'publish'

type ConfirmationTypeConfig = {
  // Its own "Cancel" wording ("Keep editing") instead of the plain one
  hasCancelLabel: boolean
  // A default description; without one the title has to say it all
  hasMessage: boolean
  icon: LucideIcon
  tone: ConfirmDialogTone
}

// What each kind of confirmation looks like; its default texts live under
// common.confirmation.<type>
export const confirmationTypes: Record<ConfirmationType, ConfirmationTypeConfig> = {
  confirm: { hasCancelLabel: false, hasMessage: false, icon: Info, tone: 'info' },
  delete: { hasCancelLabel: false, hasMessage: true, icon: Trash2, tone: 'danger' },
  discard: { hasCancelLabel: true, hasMessage: true, icon: TriangleAlert, tone: 'warning' },
  leave: { hasCancelLabel: true, hasMessage: true, icon: LogOut, tone: 'warning' },
  publish: { hasCancelLabel: false, hasMessage: true, icon: Send, tone: 'info' },
}
