import { Button } from '@ds/primitives'

type SecurityRowProps = {
  changeLabel: string
  // The form that changes the value, shown while `isOpen`
  children: React.ReactNode
  isOpen: boolean
  label: string
  onOpen: VoidFunction
  value: string
}

// One credential: its current value and a "Change" button that opens its form in place
const SecurityRow = ({ changeLabel, children, isOpen, label, onOpen, value }: SecurityRowProps) => (
  <div className="border-rule flex flex-col gap-4 border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-copy text-ink font-semibold">{label}</p>
        <p className="text-copy-sm text-muted truncate">{value}</p>
      </div>
      {!isOpen && (
        <Button onClick={onOpen} size="sm" variant="secondary">
          {changeLabel}
        </Button>
      )}
    </div>
    {isOpen && children}
  </div>
)

export default SecurityRow
