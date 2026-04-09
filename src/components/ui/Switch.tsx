import { Switch as BaseSwitch } from '@base-ui/react/switch'
import clsx from 'clsx'

type SwitchProps = {
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}

const Switch = ({ checked, disabled, onCheckedChange }: SwitchProps) => (
  <BaseSwitch.Root
    checked={checked}
    className={clsx(
      'flex h-5 w-9 cursor-pointer items-center rounded-full px-0.5 transition-colors',
      'data-checked:bg-primary bg-gray-300',
      'data-disabled:cursor-not-allowed data-disabled:opacity-50',
      'data-focused:outline-primary/40 data-focused:outline-2 data-focused:outline-offset-2',
    )}
    disabled={disabled}
    onCheckedChange={onCheckedChange}
  >
    <BaseSwitch.Thumb className="size-4 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-4" />
  </BaseSwitch.Root>
)

export default Switch
