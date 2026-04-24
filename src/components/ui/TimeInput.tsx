'use client'

import clsx from 'clsx'

type TimeInputProps = {
  className?: string
  onChange: (value: string) => void
  value: string
}

const TimeInput = ({ className, onChange, value }: TimeInputProps) => (
  <input
    className={clsx(
      'focus:border-primary hover:border-primary/50 h-8 rounded-sm border border-transparent bg-gray-100 px-2 text-sm transition-colors focus:outline-hidden dark:bg-white/5',
      className,
    )}
    lang="en-GB"
    onChange={(event) => onChange(event.target.value)}
    type="time"
    value={value}
  />
)

export default TimeInput
