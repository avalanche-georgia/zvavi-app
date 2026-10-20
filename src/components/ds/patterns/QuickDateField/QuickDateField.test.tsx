import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addDays, startOfDay } from 'date-fns'
import { enUS } from 'react-day-picker/locale'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import QuickDateField from './QuickDateField'

const quickDates = [
  { label: 'Tomorrow', value: '1' },
  { label: 'In 2 days', value: '2' },
]

type HarnessProps = {
  error?: string
  isLabelHidden?: boolean
  onChange?: (value: Date | null) => void
  required?: boolean
  withTime?: boolean
}

// Controlled like ValidUntilField: shortcuts set the date, the picker clears them
const Harness = ({ onChange, withTime, ...props }: HarnessProps) => {
  const timeOptions = withTime
    ? { defaultTime: '18:00', timeLabel: 'Time', withTime: true as const }
    : {}
  const [value, setValue] = useState<Date | null>(null)

  const handleValueChange = (nextValue: Date | null) => {
    setValue(nextValue)
    onChange?.(nextValue)
  }

  const selected =
    quickDates.find(
      ({ value: days }) =>
        value?.getTime() === addDays(startOfDay(new Date()), Number(days)).getTime(),
    )?.value ?? null

  return (
    <QuickDateField
      calendarLabel="Choose a date"
      label="Valid until"
      locale={enUS}
      onQuickDateChange={(days) => handleValueChange(addDays(startOfDay(new Date()), Number(days)))}
      onValueChange={handleValueChange}
      placeholder="Select date"
      quickDates={quickDates}
      quickDatesLabel="Quick dates"
      selectedQuickDate={selected}
      summary={value ? `picked ${value.getDate()}` : undefined}
      value={value}
      {...timeOptions}
      {...props}
    />
  )
}

const getTrigger = () => screen.getByRole('combobox', { name: 'Valid until' })

describe('QuickDateField', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 20, 12, 0))
  })

  afterEach(() => vi.useRealTimers())

  it('labels the picker and lists the shortcuts, none selected', () => {
    render(<Harness />)

    expect(getTrigger()).toHaveTextContent('Select date')
    expect(screen.getByRole('group', { name: 'Quick dates' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tomorrow' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('sets the date from a shortcut and marks it, with the summary below', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Tomorrow' }))

    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 21))
    expect(getTrigger()).toHaveTextContent('21 Oct 2026')
    expect(screen.getByRole('button', { name: 'Tomorrow' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('picked 21')).toBeInTheDocument()
  })

  it('takes a date from the picker, which clears the shortcut', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: 'Tomorrow' }))
    await userEvent.click(getTrigger())
    await userEvent.click(
      document.querySelector<HTMLButtonElement>('button[data-day="2026-10-28"]')!,
    )

    expect(getTrigger()).toHaveTextContent('28 Oct 2026')
    expect(screen.getByRole('button', { name: 'Tomorrow' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('shows the error on the field', () => {
    render(<Harness error="Pick a date." required />)

    expect(getTrigger()).toHaveAttribute('data-invalid')
    expect(getTrigger()).toHaveAttribute('aria-required', 'true')
    expect(screen.getByText('Pick a date.')).toBeInTheDocument()
  })

  it('keeps the picker named when the label is hidden', () => {
    render(<Harness isLabelHidden />)

    expect(getTrigger()).toBeInTheDocument()
  })

  it('carries a time with withTime', () => {
    render(<Harness withTime />)

    expect(screen.getByLabelText('Time')).toBeDisabled()
  })
})
