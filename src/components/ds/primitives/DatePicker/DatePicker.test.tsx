import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enUS, ka } from 'react-day-picker/locale'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DatePicker from './DatePicker'
import { Field } from '../Field'

type HarnessProps = Partial<React.ComponentProps<typeof DatePicker>> & {
  initialValue?: Date | null
  onChange?: (value: Date | null) => void
}

// Controlled, like every caller
const Harness = ({ initialValue = null, onChange, ...props }: HarnessProps) => {
  const [value, setValue] = useState<Date | null>(initialValue)

  const handleValueChange = (nextValue: Date | null) => {
    setValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <Field label="Joined">
      <DatePicker
        calendarLabel="Choose a date"
        locale={enUS}
        onValueChange={handleValueChange}
        placeholder="Pick a date"
        value={value}
        {...props}
      />
    </Field>
  )
}

const getTrigger = () => screen.getByRole('button', { name: /joined/i })
const getDay = (isoDate: string) =>
  document.querySelector<HTMLButtonElement>(`button[data-day="${isoDate}"]`)!

describe('DatePicker', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true, toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 20, 12, 0))
  })

  afterEach(() => vi.useRealTimers())

  it('shows the placeholder, then the date in the page language', () => {
    const { rerender } = render(<Harness />)

    expect(getTrigger()).toHaveTextContent('Pick a date')

    rerender(<Harness key="en" initialValue={new Date(2026, 9, 5)} />)
    expect(getTrigger()).toHaveTextContent('5 Oct 2026')

    rerender(<Harness key="ka" initialValue={new Date(2026, 9, 5)} locale={ka} />)
    expect(getTrigger()).toHaveTextContent(/5 ოქტ 2026/i)
  })

  it('is named by its Field label, or by ariaLabel outside a Field', () => {
    render(<Harness />)
    expect(getTrigger()).toBeInTheDocument()

    render(
      <DatePicker
        ariaLabel="Created from"
        calendarLabel="Choose a date"
        locale={enUS}
        onValueChange={() => undefined}
        value={null}
      />,
    )
    expect(screen.getByRole('button', { name: 'Created from' })).toBeInTheDocument()
  })

  it('opens a named calendar with focus on the picked day', async () => {
    render(<Harness initialValue={new Date(2026, 9, 5)} />)

    await userEvent.click(getTrigger())

    expect(screen.getByRole('dialog', { name: 'Choose a date' })).toBeInTheDocument()
    expect(getDay('2026-10-05')).toHaveFocus()
  })

  it('picks a day at midnight, closes and returns focus to the trigger', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.click(getTrigger())
    await userEvent.click(getDay('2026-10-14'))

    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(getTrigger()).toHaveTextContent('14 Oct 2026')
    expect(getTrigger()).toHaveFocus()
  })

  it('closes on Escape without changing the value', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.click(getTrigger())
    await userEvent.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
    expect(getTrigger()).toHaveFocus()
  })

  it('keeps the value when its own day is picked again', async () => {
    const onChange = vi.fn()

    render(<Harness initialValue={new Date(2026, 9, 5)} onChange={onChange} />)
    await userEvent.click(getTrigger())
    await userEvent.click(getDay('2026-10-05'))

    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 5))
  })

  it('disables days outside min / max', async () => {
    render(<Harness max="2026-10-20" min="2026-10-10" />)
    await userEvent.click(getTrigger())

    expect(getDay('2026-10-09')).toBeDisabled()
    expect(getDay('2026-10-10')).toBeEnabled()
    expect(getDay('2026-10-20')).toBeEnabled()
    expect(getDay('2026-10-21')).toBeDisabled()
  })

  it('offers years from 20 back to 5 ahead by default, and the min / max years when set', async () => {
    const { unmount } = render(<Harness />)

    await userEvent.click(getTrigger())
    let years = [...screen.getAllByRole('combobox')[1].querySelectorAll('option')]

    expect(years[0]).toHaveTextContent('2006')
    expect(years.at(-1)).toHaveTextContent('2031')
    unmount()

    render(<Harness max="2026-12-31" min="2025-03-01" />)
    await userEvent.click(getTrigger())
    years = [...screen.getAllByRole('combobox')[1].querySelectorAll('option')]

    expect(years.map((option) => option.textContent)).toEqual(['2025', '2026'])
  })

  it('jumps to today with the Today shortcut, disabled when today is out of bounds', async () => {
    const onChange = vi.fn()
    const { unmount } = render(<Harness onChange={onChange} todayLabel="Today" />)

    await userEvent.click(getTrigger())
    await userEvent.click(screen.getByRole('button', { name: 'Today' }))

    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 20))
    unmount()

    render(<Harness max="2026-10-01" todayLabel="Today" />)
    await userEvent.click(getTrigger())

    expect(screen.getByRole('button', { name: 'Today' })).toBeDisabled()
  })

  it('clears with the × when clearLabel is set', async () => {
    const onChange = vi.fn()

    render(
      <Harness clearLabel="Clear date" initialValue={new Date(2026, 9, 5)} onChange={onChange} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Clear date' }))

    expect(onChange).toHaveBeenLastCalledWith(null)
    expect(getTrigger()).toHaveTextContent('Pick a date')
    expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument()
  })

  it('is disabled: no popup, no clear', async () => {
    render(<Harness clearLabel="Clear date" disabled initialValue={new Date(2026, 9, 5)} />)

    expect(getTrigger()).toBeDisabled()
    expect(getTrigger()).toHaveAttribute('data-disabled')
    expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument()

    await userEvent.click(getTrigger())

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the Field error state on the trigger', () => {
    render(
      <Field error="Pick a date." label="Joined">
        <DatePicker
          calendarLabel="Choose a date"
          locale={enUS}
          onValueChange={() => undefined}
          value={null}
        />
      </Field>,
    )

    expect(getTrigger()).toHaveAttribute('data-invalid')
    expect(getTrigger()).toHaveAccessibleDescription('Pick a date.')
  })

  describe('withTime', () => {
    it('starts a new date at defaultTime and keeps the time on later picks', async () => {
      const onChange = vi.fn()

      render(<Harness defaultTime="18:00" onChange={onChange} timeLabel="Time" withTime />)

      expect(screen.getByLabelText('Time')).toBeDisabled()

      await userEvent.click(getTrigger())
      await userEvent.click(getDay('2026-10-14'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 18, 0))
      expect(screen.getByLabelText('Time')).toBeEnabled()
      expect(screen.getByLabelText('Time')).toHaveValue('18:00')
    })

    it('changes the time of the picked date', async () => {
      const onChange = vi.fn()

      render(
        <Harness
          initialValue={new Date(2026, 9, 14, 18, 0)}
          onChange={onChange}
          timeLabel="Time"
          withTime
        />,
      )

      const time = screen.getByLabelText('Time')

      await userEvent.clear(time)
      await userEvent.type(time, '930')

      // Applied when leaving the field, not on every key
      expect(onChange).not.toHaveBeenCalled()

      await userEvent.tab()

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 9, 30))
      expect(time).toHaveValue('09:30')

      await userEvent.click(getTrigger())
      await userEvent.click(getDay('2026-10-16'))

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 16, 9, 30))
    })

    it('applies the time on Enter and shows 24-hour time', async () => {
      const onChange = vi.fn()

      render(
        <Harness
          initialValue={new Date(2026, 9, 14, 18, 0)}
          onChange={onChange}
          timeLabel="Time"
          withTime
        />,
      )

      const time = screen.getByLabelText('Time')

      expect(time).toHaveValue('18:00')

      await userEvent.clear(time)
      await userEvent.type(time, '2130{Enter}')

      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 14, 21, 30))
    })

    it('marks a wrong time, then puts the old one back on leaving or Escape', async () => {
      const onChange = vi.fn()

      render(
        <Harness
          initialValue={new Date(2026, 9, 14, 18, 0)}
          onChange={onChange}
          timeLabel="Time"
          withTime
        />,
      )

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

    it('keeps the Field label on the date, not the time', () => {
      render(<Harness timeLabel="Time" withTime />)

      expect(screen.getByLabelText('Joined')).toBe(getTrigger())
    })
  })
})
