import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enUS } from 'react-day-picker/locale'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DateRangePicker from './DateRangePicker'
import type { DayRange } from './dayRange'
import type { DateRangePickerProps } from './types'

type HarnessProps = Partial<DateRangePickerProps> & {
  initialValue?: DayRange
  onChange?: (range: DayRange) => void
}

const empty: DayRange = { from: null, to: null }

// Controlled, like every caller
const Harness = ({ initialValue = empty, onChange, ...props }: HarnessProps) => {
  const [value, setValue] = useState<DayRange>(initialValue)

  const handleValueChange = (range: DayRange) => {
    setValue(range)
    onChange?.(range)
  }

  return (
    <DateRangePicker
      ariaLabel="Dates"
      calendarLabel="Choose dates"
      clearLabel="Clear dates"
      doneLabel="Done"
      fromLabel="From"
      locale={enUS}
      onValueChange={handleValueChange}
      placeholder="Any dates"
      toLabel="To"
      value={value}
      {...props}
    />
  )
}

const getTrigger = () => screen.getByRole('combobox', { name: 'Dates' })
const getDay = (isoDate: string) =>
  document.querySelector<HTMLButtonElement>(`button[data-day="${isoDate}"]`)!
const getEnd = (name: 'From' | 'To') =>
  screen.getByRole('button', { name: new RegExp(`^${name}\\b`) })
const openPicker = () => userEvent.click(getTrigger())

describe('DateRangePicker', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    // 12:00 on 20 Oct in Georgia, whatever the machine's zone
    vi.setSystemTime(new Date('2026-10-20T08:00:00.000Z'))
  })

  afterEach(() => vi.useRealTimers())

  it('shows the placeholder, then the range', async () => {
    render(<Harness />)

    expect(getTrigger()).toHaveTextContent('Any dates')

    await openPicker()
    await userEvent.click(getDay('2026-10-05'))
    await userEvent.click(getDay('2026-10-12'))

    expect(getTrigger()).toHaveTextContent('5 Oct – 12 Oct 2026')
  })

  it('opens a named popup with the From end active and focus on today', async () => {
    render(<Harness />)
    await openPicker()

    expect(screen.getByRole('dialog', { name: 'Choose dates' })).toBeInTheDocument()
    expect(getEnd('From')).toHaveAttribute('aria-pressed', 'true')
    expect(getEnd('To')).toHaveAttribute('aria-pressed', 'false')
    expect(getDay('2026-10-20')).toHaveFocus()
  })

  it('moves to the To end after the start, and back to a fresh range after the end', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await openPicker()
    await userEvent.click(getDay('2026-10-05'))

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-10-05', to: null })
    expect(getEnd('To')).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(getDay('2026-10-12'))
    await userEvent.click(getDay('2026-10-15'))

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-10-15', to: null })
  })

  it('keeps a start-only range when closed with Done', async () => {
    render(<Harness />)
    await openPicker()
    await userEvent.click(getDay('2026-10-05'))
    await userEvent.click(screen.getByRole('button', { name: 'Done' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(getTrigger()).toHaveTextContent('5 Oct 2026 – …')
  })

  it('sets only the end after tapping To', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await openPicker()
    await userEvent.click(getEnd('To'))
    await userEvent.click(getDay('2026-10-12'))

    expect(onChange).toHaveBeenLastCalledWith({ from: null, to: '2026-10-12' })
    expect(getTrigger()).toHaveTextContent('… – 12 Oct 2026')
  })

  it('edits one end of a complete range', async () => {
    const onChange = vi.fn()

    render(<Harness initialValue={{ from: '2026-10-05', to: '2026-10-12' }} onChange={onChange} />)
    await openPicker()
    await userEvent.click(getEnd('From'))
    await userEvent.click(getDay('2026-10-08'))

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-10-08', to: '2026-10-12' })
  })

  it('clears one end with its ×, leaving an open range', async () => {
    const onChange = vi.fn()

    render(<Harness initialValue={{ from: '2026-10-05', to: '2026-10-12' }} onChange={onChange} />)
    await openPicker()
    await userEvent.click(screen.getByRole('button', { name: 'Clear dates: To' }))

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-10-05', to: null })
    expect(getEnd('To')).toHaveAttribute('aria-pressed', 'true')
  })

  it('applies a quick range, and clears it on a second tap', async () => {
    const onChange = vi.fn()
    const presets = [{ label: 'October', range: { from: '2026-10-01', to: '2026-10-31' } }]

    render(<Harness onChange={onChange} presets={presets} presetsLabel="Quick ranges" />)
    await openPicker()
    await userEvent.click(screen.getByRole('button', { name: 'October' }))

    expect(onChange).toHaveBeenLastCalledWith({ from: '2026-10-01', to: '2026-10-31' })
    expect(screen.getByRole('button', { name: 'October' })).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'October' }))

    expect(onChange).toHaveBeenLastCalledWith({ from: null, to: null })
  })

  it('shows the month of a quick range when it is picked', async () => {
    const presets = [{ label: 'January', range: { from: '2026-01-01', to: '2026-01-31' } }]

    render(<Harness presets={presets} presetsLabel="Quick ranges" />)
    await openPicker()

    expect(screen.getByText('October 2026')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'January' }))

    expect(screen.getByText('January 2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'January' })).toHaveFocus()
  })

  it('clears the whole range with the × beside the trigger, focus back on the trigger', async () => {
    render(<Harness initialValue={{ from: '2026-10-05', to: '2026-10-12' }} />)
    await userEvent.click(screen.getByRole('button', { name: 'Clear dates' }))

    expect(getTrigger()).toHaveTextContent('Any dates')
    expect(getTrigger()).toHaveFocus()
    expect(screen.queryByRole('button', { name: 'Clear dates' })).not.toBeInTheDocument()
  })

  it('disables days outside min / max', async () => {
    render(<Harness max="2026-10-20" min="2026-10-10" />)
    await openPicker()

    expect(getDay('2026-10-09')).toBeDisabled()
    expect(getDay('2026-10-10')).toBeEnabled()
    expect(getDay('2026-10-21')).toBeDisabled()
  })

  it('shows its own text and the active border when asked', () => {
    render(
      <Harness
        formatValue={() => 'October 2026'}
        initialValue={{ from: '2026-10-01', to: '2026-10-31' }}
        isActive
      />,
    )

    expect(getTrigger()).toHaveTextContent('October 2026')
    expect(getTrigger()).toHaveClass('border-accent')
  })

  it('shows one month on a phone and two from 640px', async () => {
    const { unmount } = render(<Harness />)

    await openPicker()
    expect(screen.getAllByRole('grid')).toHaveLength(1)
    unmount()

    const original = window.matchMedia

    window.matchMedia = (query: string) => ({ ...original(query), matches: true })
    render(<Harness />)
    await openPicker()
    expect(screen.getAllByRole('grid')).toHaveLength(2)
    window.matchMedia = original
  })

  it('closes on Escape, focus back on the trigger', async () => {
    render(<Harness />)
    await openPicker()
    await userEvent.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(getTrigger()).toHaveFocus()
  })
})
