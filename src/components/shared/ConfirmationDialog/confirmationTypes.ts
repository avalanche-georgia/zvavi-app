import type { ConfirmDialogTone } from '@ds/patterns'

export type ConfirmationType = 'confirm' | 'delete' | 'discard' | 'leave' | 'publish'

type ConfirmationTypeConfig = {
  // Its own "Cancel" wording ("Keep editing") instead of the plain one
  hasCancelLabel: boolean
  // A default description; without one the title has to say it all
  hasMessage: boolean
  // An async action with its own "…ing" label while it runs
  hasPendingLabel: boolean
  tone: ConfirmDialogTone
}

// What each kind of confirmation looks like; its default texts live under
// common.confirmation.<type>
export const confirmationTypes: Record<ConfirmationType, ConfirmationTypeConfig> = {
  confirm: { hasCancelLabel: false, hasMessage: false, hasPendingLabel: false, tone: 'info' },
  delete: { hasCancelLabel: false, hasMessage: true, hasPendingLabel: true, tone: 'danger' },
  discard: { hasCancelLabel: true, hasMessage: true, hasPendingLabel: false, tone: 'warning' },
  leave: { hasCancelLabel: true, hasMessage: true, hasPendingLabel: false, tone: 'warning' },
  publish: { hasCancelLabel: false, hasMessage: true, hasPendingLabel: false, tone: 'info' },
}
