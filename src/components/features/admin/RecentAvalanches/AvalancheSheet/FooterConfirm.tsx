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
  <div
    className="flex w-full flex-wrap items-center gap-2 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none starting:-translate-y-1 starting:opacity-0"
    role="alert"
  >
    <span className="mr-auto text-sm font-medium">{message}</span>
    <Button onClick={onCancel} variant="secondary">
      {cancelLabel}
    </Button>
    <Button isBusy={isBusy} onClick={onConfirm} variant="danger">
      {confirmLabel}
    </Button>
  </div>
)

export default FooterConfirm
