/* eslint-disable react/jsx-props-no-spreading */

import { IconButton } from '../IconButton'

import { cn } from '@/lib/utils'

type CalendarNavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// Previous / next month. react-day-picker names it from the locale and marks it
// aria-disabled (not disabled) at the edge of the allowed months.
const CalendarNavButton = ({ className, ...props }: CalendarNavButtonProps) => (
  <IconButton
    {...props}
    aria-label={props['aria-label'] ?? ''}
    className={cn(
      'aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-transparent',
      className,
    )}
  />
)

export default CalendarNavButton
