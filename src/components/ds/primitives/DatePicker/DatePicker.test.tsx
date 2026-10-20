import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enUS, ka } from 'react-day-picker/locale'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DatePicker from './DatePicker'
import type { DatePickerProps } from './types'
import { Field } from '../Field'

type HarnessProps = Partial<Omit<DatePickerProps, 'defaultTime' | 'timeLabel' | 'withTime'>> & {
  defaultTime?: string
  error?: string
  initialValue?: Date | null
  onChange?: (value: Date | null) => void
  withTime?: boolean
}

// Controlled, like every caller. A button outside sets a value the way a form
// reset or a date shortcut would.
const Harness = ({
  defaultTime,
  error,
  initialValue = null,
  onChange,
  withTime,
  ...props
}: HarnessProps) => {
  const [value, setValue] = useState<Date | null>(initialValue)
  const timeOptions = withTime ? { defaultTime, timeLabel: 'Time', withTime: true as const } : {}

  const handleValueChange = (nextValue: Date | null) => {
    setValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <>
      <Field error={error} label="Joined">
        <DatePicker
          calendarLabel="Choose a date"
          locale={enUS}
          onValueChange={handleValueChange}
          placeholder="Pick a date"
          value={value}
          {...timeOptions}
          {...props}
        />
      </Field>
      <button onClick={() => setValue(new Date(2026, 9, 1, 8, 15))} type="button">
        Set from outside
      </button>
    </>
  )
}

const getTrigger = () => screen.getByRole('combobox', { name: 'Joined' })
const getDay = (isoDate: string) =>
  document.querySelector<HTMLButtonElement>(`button[data-day="${isoDate}"]`)!
const openPicker = () => userEvent.click(getTrigger())

describe('DatePicker', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 20, 12, 0))
  })

  afterEach(() => vi.useRealTimers())

  describe('trigger', () => {
    it('shows the placeholder, then the date in the page language', () => {
      const { rerender } = render(<Harness />)

      expect(getTrigger()).toHaveTextContent('Pick a date')

      rerender(<Harness key="en" initialValue={new Date(2026, 9, 5)} />)
      expect(getTrigger()).toHaveTextContent('5 Oct 2026')

      rerender(<Harness key="ka" initialValue={new Date(2026, 9, 5)} locale={ka} />)
      expect(getTrigger()).toHaveTextContent(/5 ოქტ 2026/i)
    })

    it('is a combobox named by its Field label, or by ariaLabel outside a Field', () => {
      render(<Harness initialValue={new Date(2026, 9, 5)} />)

      expect(getTrigger()).toHaveAttribute('aria-haspopup', 'dialog')
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
      expect(getTrigger()).toHaveTextContent('5 Oct 2026')

      render(
        <DatePicker
          ariaLabel="Created from"
          calendarLabel="Choose a date"
          locale={enUS}
          onValueChange={() => undefined}
          value={null}
        />,
      )
      expect(screen.getByRole('combobox', { name: 'Created from' })).toBeInTheDocument()
    })

    it('opens from a click on the Field label', async () => {
      render(<Harness />)

      await userEvent.click(screen.getByText('Joined'))

      expect(screen.getByRole('dialog', { name: 'Choose a date' })).toBeInTheDocument()
    })

    it('marks required, and shows the Field error', () => {
      const { rerender } = render(<Harness required />)

      expect(getTrigger()).toHaveAttribute('aria-required', 'true')
      expect(getTrigger()).not.toHaveAttribute('data-invalid')

      rerender(<Harness error="Pick a date." required />)

      expect(getTrigger()).toHaveAttribute('data-invalid')
      expect(getTrigger()).toHaveAccessibleDescription('Pick a date.')
    })

    it('passes its ref and onBlur to the trigger, e.g. for react-hook-form', async () => {
      const ref = { current: null as HTMLButtonElement | null }
      const onBlur = vi.fn()

      render(<Harness ref={ref} onBlur={onBlur} />)

      expect(ref.current).toBe(getTrigger())

      ref.current?.focus()
      await userEvent.tab()

      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('is disabled: no popup, no clear', () => {
      render(<Harness clearLabel="Clear date" disabled initialValue={new Date(2026, 9, 5)} />)

      expect(getTrigger()).toBeDisabled()
      expect(getTrigger()).toHaveAttribute('data-disabled')
      expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument()

      // user-event skips disabled elements; a raw click checks the trigger ignores it
      fireEvent.click(getTrigger())

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('calendar', () => {
    it('opens a named calendar with focus on the picked day, or today', async () => {
      const { unmount } = render(<Harness initialValue={new Date(2026, 9, 5)} />)

      await openPicker()

      expect(screen.getByRole('dialog', { name: 'Choose a date' })).toBeInTheDocument()
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
      expect(getDay('2026-10-05')).toHaveFocus()
      unmount()

      render(<Harness />)
      await openPicker()

      expect(getDay('2026-10-20')).toHaveFocus()
    })

    it('picks a day at midnight, closes and returns focus to the trigger', async () => {
      const onChange = vi.fn()

      render(<Harness onChange={onChange} />)
      await openPicker()
      await userEvent.click(getDay('2026-10-14'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(getTrigger()).toHaveTextContent('14 Oct 2026')
      expect(getTrigger()).toHaveFocus()
    })

    it('picks with the keyboard', async () => {
      const onChange = vi.fn()

      render(<Harness onChange={onChange} />)
      getTrigger().focus()
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard('{ArrowRight}{Enter}')

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 21))
      expect(getTrigger()).toHaveFocus()
    })

    it('closes on Escape without changing the value', async () => {
      const onChange = vi.fn()

      render(<Harness onChange={onChange} />)
      await openPicker()
      await userEvent.keyboard('{Escape}')

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(onChange).not.toHaveBeenCalled()
      expect(getTrigger()).toHaveFocus()
    })

    it('keeps the value when its own day is picked again', async () => {
      const onChange = vi.fn()

      render(<Harness initialValue={new Date(2026, 9, 5)} onChange={onChange} />)
      await openPicker()
      await userEvent.click(getDay('2026-10-05'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 5))
    })

    it('disables days outside min / max, both ends included', async () => {
      render(<Harness max="2026-10-20" min="2026-10-10" />)
      await openPicker()

      expect(getDay('2026-10-09')).toBeDisabled()
      expect(getDay('2026-10-10')).toBeEnabled()
      expect(getDay('2026-10-20')).toBeEnabled()
      expect(getDay('2026-10-21')).toBeDisabled()
    })

    it('offers years from 20 back to 5 ahead by default, and the min / max years when set', async () => {
      const { unmount } = render(<Harness />)

      await openPicker()
      let years = [...screen.getAllByRole('combobox')[2].querySelectorAll('option')]

      expect(years[0]).toHaveTextContent('2006')
      expect(years.at(-1)).toHaveTextContent('2031')
      unmount()

      render(<Harness max="2026-12-31" min="2025-03-01" />)
      await openPicker()
      years = [...screen.getAllByRole('combobox')[2].querySelectorAll('option')]

      expect(years.map((option) => option.textContent)).toEqual(['2025', '2026'])
    })
  })

  describe('Today and clear', () => {
    it('picks today with the shortcut; it is off when today is outside min / max', async () => {
      const onChange = vi.fn()
      const { unmount } = render(<Harness onChange={onChange} todayLabel="Today" />)

      await openPicker()
      await userEvent.click(screen.getByRole('button', { name: 'Today' }))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 20))
      unmount()

      const { unmount: unmountPast } = render(<Harness max="2026-10-01" todayLabel="Today" />)

      await openPicker()
      expect(screen.getByRole('button', { name: 'Today' })).toBeDisabled()
      unmountPast()

      render(<Harness min="2026-10-20" todayLabel="Today" />)
      await openPicker()
      expect(screen.getByRole('button', { name: 'Today' })).toBeEnabled()
    })

    it('uses the `today` it is given for the highlight and the shortcut', async () => {
      const onChange = vi.fn()

      // Late evening in the browser's zone, already the next day in Tbilisi
      render(<Harness onChange={onChange} today={new Date(2026, 9, 21)} todayLabel="Today" />)
      await openPicker()

      expect(getDay('2026-10-21')).toHaveClass('text-accent')
      expect(getDay('2026-10-20')).not.toHaveClass('text-accent')

      await userEvent.click(screen.getByRole('button', { name: 'Today' }))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 21))
    })

    it('clears with the ×, then focus moves to the trigger', async () => {
      const onChange = vi.fn()

      render(
        <Harness clearLabel="Clear date" initialValue={new Date(2026, 9, 5)} onChange={onChange} />,
      )
      await userEvent.click(screen.getByRole('button', { name: 'Clear date' }))

      expect(onChange).toHaveBeenLastCalledWith(null)
      expect(getTrigger()).toHaveTextContent('Pick a date')
      expect(getTrigger()).toHaveFocus()
      expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument()
    })
  })

  describe('withTime', () => {
    it('starts a new date at defaultTime and keeps the time on later picks', async () => {
      const onChange = vi.fn()

      render(<Harness defaultTime="18:00" onChange={onChange} withTime />)

      expect(screen.getByLabelText('Time')).toBeDisabled()

      await openPicker()
      await userEvent.click(getDay('2026-10-14'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 18, 0))
      expect(screen.getByLabelText('Time')).toBeEnabled()
      expect(screen.getByLabelText('Time')).toHaveValue('18:00')
    })

    it('applies a typed time on leaving the field, and keeps it on a new day', async () => {
      const onChange = vi.fn()

      render(<Harness initialValue={new Date(2026, 9, 14, 18, 0)} onChange={onChange} withTime />)

      const time = screen.getByLabelText('Time')

      await userEvent.clear(time)
      await userEvent.type(time, '930')

      expect(onChange).not.toHaveBeenCalled()

      await userEvent.tab()

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 9, 30))
      expect(time).toHaveValue('09:30')

      await openPicker()
      await userEvent.click(getDay('2026-10-16'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 16, 9, 30))
    })

    it('applies on Enter without submitting the form, and shows 24-hour time', async () => {
      const onChange = vi.fn()
      const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())

      render(
        <form onSubmit={onSubmit}>
          <Harness initialValue={new Date(2026, 9, 14, 18, 0)} onChange={onChange} withTime />
          <button type="submit">Save</button>
        </form>,
      )

      const time = screen.getByLabelText('Time')

      expect(time).toHaveValue('18:00')

      await userEvent.clear(time)
      await userEvent.type(time, '2130{Enter}')

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 21, 30))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('marks a wrong time, then puts the old one back on leaving or Escape', async () => {
      const onChange = vi.fn()

      render(<Harness initialValue={new Date(2026, 9, 14, 18, 0)} onChange={onChange} withTime />)

      const time = screen.getByLabelText('Time')

      await userEvent.clear(time)
      await userEvent.type(time, '25:00')

      expect(time).toHaveAttribute('aria-invalid', 'true')

      await userEvent.tab()

      expect(time).toHaveValue('18:00')
      expect(time).not.toHaveAttribute('aria-invalid')

      await userEvent.clear(time)
      await userEvent.type(time, '07{Escape}')

      expect(time).toHaveValue('18:00')
      expect(onChange).not.toHaveBeenCalled()
    })

    it('drops a half-typed time when the value changes from outside', async () => {
      render(<Harness initialValue={new Date(2026, 9, 14, 18, 0)} withTime />)

      const time = screen.getByLabelText('Time')

      await userEvent.clear(time)
      await userEvent.type(time, '07')
      fireEvent.click(screen.getByText('Set from outside'))

      expect(time).toHaveValue('08:15')
    })

    it('sits inside the Field error state, and the Field label stays on the date', () => {
      render(<Harness error="Pick a date." withTime />)

      expect(screen.getByLabelText('Joined')).toBe(getTrigger())
      expect(screen.getByLabelText('Time').closest('[data-invalid]')).not.toBeNull()
      expect(screen.getByLabelText('Time')).toHaveClass('in-data-invalid:border-danger')
    })
  })
})
