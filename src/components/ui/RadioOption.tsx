import { Radio } from '@base-ui/react/radio'
import clsx from 'clsx'

type RadioOptionProps = {
  label: string
  value: string
}

const RadioOption = ({ label, value }: RadioOptionProps) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label className="flex cursor-pointer items-center gap-2">
    <Radio.Root
      className={clsx(
        'flex size-5 shrink-0 items-center justify-center rounded-full',
        'border-2 border-gray-300 transition-colors',
        'data-[checked]:border-primary',
      )}
      value={value}
    >
      <Radio.Indicator className="size-2.5 rounded-full bg-primary transition-transform" />
    </Radio.Root>
    <span className="text-sm">{label}</span>
  </label>
)

export default RadioOption
