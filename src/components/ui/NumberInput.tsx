/* eslint-disable react/jsx-props-no-spreading */
import { NumberField } from '@base-ui/react/number-field'
import clsx from 'clsx'

type NumberInputProps = Omit<NumberField.Root.Props, 'allowWheelScrub' | 'render'> & {
  hasError?: boolean
}

const NumberInput = ({ className, hasError, ...props }: NumberInputProps) => (
  <NumberField.Root {...props} allowWheelScrub={false} className={clsx('flex h-8', className)}>
    <NumberField.Group
      className={clsx(
        'flex w-full overflow-hidden rounded-sm border bg-gray-100 transition-colors dark:bg-white/5',
        hasError
          ? 'border-red-500'
          : props.readOnly
            ? 'cursor-default border-transparent'
            : [
                'border-transparent',
                'focus-within:border-primary [&:not(:focus-within):hover]:border-primary/50',
              ],
      )}
    >
      <NumberField.Decrement
        className={clsx(
          'flex w-7 shrink-0 items-center justify-center border-r text-gray-500 transition-colors select-none',
          'hover:bg-black/5 active:bg-black/10',
          'data-disabled:cursor-not-allowed data-disabled:opacity-40',
          'focus:outline-hidden',
        )}
      >
        −
      </NumberField.Decrement>

      <NumberField.Input
        className={clsx(
          'w-full bg-transparent px-1 text-center text-sm focus:outline-hidden',
          'data-disabled:cursor-not-allowed data-disabled:opacity-40',
        )}
      />

      <NumberField.Increment
        className={clsx(
          'flex w-7 shrink-0 items-center justify-center border-l text-gray-500 transition-colors select-none',
          'hover:bg-black/5 active:bg-black/10',
          'data-disabled:cursor-not-allowed data-disabled:opacity-40',
          'focus:outline-hidden',
        )}
      >
        +
      </NumberField.Increment>
    </NumberField.Group>
  </NumberField.Root>
)

export default NumberInput
