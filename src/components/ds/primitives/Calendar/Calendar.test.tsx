import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enUS, ka } from 'react-day-picker/locale'
import { describe, expect, it, vi } from 'vitest'

import Calendar from './Calendar'

const october = new Date(2026, 9, 1)

const getDay = (isoDate: string) => {
  const button = document.querySelector<HTMLButtonElement>(`button[data-day="${isoDate}"]`)

  if (!button) throw new Error(`No day ${isoDate}`)

  return button
}

describe('Calendar', () => {
  it('starts the week on Monday in every language', () => {
    const { rerender } = render(<Calendar defaultMonth={october} locale={enUS} mode="single" />)
    const firstWeekday = () => document.querySelector('th[scope="col"]')

    expect(firstWeekday()).toHaveAttribute('aria-label', 'Monday')
    // 1 Oct 2026 is a Thursday: Mon–Wed of that week stay empty
    expect(getDay('2026-10-05').closest('td')).toBe(getDay('2026-10-05').closest('tr')?.firstChild)

    rerender(<Calendar defaultMonth={october} locale={ka} mode="single" />)
    expect(firstWeekday()).toHaveAttribute('aria-label', 'ორშაბათი')
  })

  it('names months and navigation in the given locale', () => {
    const { rerender } = render(<Calendar defaultMonth={october} locale={enUS} />)

    expect(screen.getByText('October 2026')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument()

    rerender(<Calendar defaultMonth={october} locale={ka} />)

    expect(screen.getByText(/ოქტომბერი/i)).toBeInTheDocument()
  })

  it('picks a single day and fills it', async () => {
    const onSelect = vi.fn()
    const { rerender } = render(
      <Calendar defaultMonth={october} locale={enUS} mode="single" onSelect={onSelect} />,
    )

    await userEvent.click(getDay('2026-10-12'))

    expect(onSelect.mock.calls[0][0]).toEqual(new Date(2026, 9, 12))

    rerender(
      <Calendar
        defaultMonth={october}
        locale={enUS}
        mode="single"
        onSelect={onSelect}
        selected={new Date(2026, 9, 12)}
      />,
    )

    expect(getDay('2026-10-12')).toHaveClass('bg-accent', 'text-white')
    expect(getDay('2026-10-13')).not.toHaveClass('bg-accent')
  })

  it('marks today from the `today` prop', () => {
    render(
      <Calendar defaultMonth={october} locale={enUS} mode="single" today={new Date(2026, 9, 20)} />,
    )

    expect(getDay('2026-10-20')).toHaveClass('text-accent', 'font-semibold')
    expect(getDay('2026-10-19')).not.toHaveClass('text-accent')
  })

  it('keeps disabled days unpickable', async () => {
    const onSelect = vi.fn()

    render(
      <Calendar
        defaultMonth={october}
        disabled={{ before: new Date(2026, 9, 10) }}
        locale={enUS}
        mode="single"
        onSelect={onSelect}
      />,
    )

    expect(getDay('2026-10-05')).toBeDisabled()
    expect(getDay('2026-10-05')).toHaveClass('text-disabled', 'cursor-not-allowed')

    await userEvent.click(getDay('2026-10-05'))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('shows a selected but disabled day in the soft accent, not filled', () => {
    render(
      <Calendar
        defaultMonth={october}
        disabled={{ before: new Date(2026, 9, 10) }}
        locale={enUS}
        mode="single"
        selected={new Date(2026, 9, 5)}
      />,
    )

    expect(getDay('2026-10-05')).toHaveClass('bg-accent-soft', 'text-accent')
    expect(getDay('2026-10-05')).not.toHaveClass('bg-accent')
  })

  it('fills range ends and lays a strip under the middle', () => {
    render(
      <Calendar
        defaultMonth={october}
        locale={enUS}
        mode="range"
        selected={{ from: new Date(2026, 9, 5), to: new Date(2026, 9, 8) }}
      />,
    )

    expect(getDay('2026-10-05')).toHaveClass('bg-accent')
    expect(getDay('2026-10-08')).toHaveClass('bg-accent')
    expect(getDay('2026-10-06')).not.toHaveClass('bg-accent')
    expect(getDay('2026-10-06').closest('td')).toHaveClass('bg-accent-soft')
    expect(getDay('2026-10-05').closest('td')).toHaveClass('rounded-l-control')
  })

  it('fills every day picked in multiple mode', () => {
    render(
      <Calendar
        defaultMonth={october}
        locale={enUS}
        mode="multiple"
        selected={[new Date(2026, 9, 2), new Date(2026, 9, 9)]}
      />,
    )

    expect(getDay('2026-10-02')).toHaveClass('bg-accent')
    expect(getDay('2026-10-09')).toHaveClass('bg-accent')
  })

  it('mutes days of the neighbouring months', () => {
    render(<Calendar defaultMonth={october} locale={enUS} mode="single" showOutsideDays />)

    expect(getDay('2026-09-30')).toHaveClass('text-muted')
    expect(getDay('2026-10-01')).not.toHaveClass('text-muted')
  })

  it('stops month navigation at the bounds', async () => {
    render(
      <Calendar
        defaultMonth={october}
        endMonth={new Date(2026, 10, 1)}
        locale={enUS}
        startMonth={october}
      />,
    )

    const previous = screen.getByRole('button', { name: /previous month/i })
    const next = screen.getByRole('button', { name: /next month/i })

    expect(previous).toHaveAttribute('aria-disabled', 'true')

    await userEvent.click(next)

    expect(screen.getByText('November 2026')).toBeInTheDocument()
    expect(next).toHaveAttribute('aria-disabled', 'true')
  })

  it('offers month and year selects limited to the bounds', async () => {
    render(
      <Calendar
        captionLayout="dropdown"
        defaultMonth={october}
        endMonth={new Date(2026, 11, 1)}
        locale={enUS}
        mode="single"
        startMonth={new Date(2024, 0, 1)}
      />,
    )

    const [monthSelect, yearSelect] = screen.getAllByRole('combobox')
    const years = [...yearSelect.querySelectorAll('option')].map((option) => option.textContent)

    expect(years).toEqual(['2024', '2025', '2026'])

    await userEvent.selectOptions(yearSelect, '2025')
    await userEvent.selectOptions(monthSelect, 'March')

    expect(getDay('2025-03-15')).toBeInTheDocument()
  })

  it('moves focus between days with the arrow keys', async () => {
    render(<Calendar defaultMonth={october} locale={enUS} mode="single" />)

    getDay('2026-10-12').focus()
    await userEvent.keyboard('{ArrowRight}')

    expect(getDay('2026-10-13')).toHaveFocus()

    await userEvent.keyboard('{ArrowDown}')

    expect(getDay('2026-10-20')).toHaveFocus()
  })

  it('shows week numbers when asked', () => {
    render(<Calendar defaultMonth={october} locale={enUS} showWeekNumber />)

    expect(screen.getAllByRole('rowheader').length).toBeGreaterThan(3)
  })
})
