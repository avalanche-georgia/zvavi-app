import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'

type FooterConfirmProps = {
  cancelLabel: string
  confirmLabel: string
  // The confirmed action is running — blocks a second click
  isBusy?: boolean
  message: string
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

// Inline confirmation in the panel footer — a second modal stacked on the
// panel would fight its focus trap
const FooterConfirm = ({
  cancelLabel,
  confirmLabel,
  isBusy = false,
  message,
  onCancel,
  onConfirm,
}: FooterConfirmProps) => (
  <FooterActions isConfirmation note={message}>
    <Button onClick={onCancel} variant="secondary">
      {cancelLabel}
    </Button>
    <Button isBusy={isBusy} onClick={onConfirm} variant="danger">
      {confirmLabel}
    </Button>
  </FooterActions>
)

export default FooterConfirm
