import { Button } from '@components/ui'

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
  <div className="flex w-full flex-wrap items-center gap-2" role="alert">
    <span className="mr-auto text-sm font-medium">{message}</span>
    <Button onClick={onCancel} variant="secondary">
      {cancelLabel}
    </Button>
    <Button className="bg-red-600 hover:bg-red-700" disabled={isBusy} onClick={onConfirm}>
      {confirmLabel}
    </Button>
  </div>
)

export default FooterConfirm
