import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import TimeField from './TimeField'
import { getTimeOptions, matchesTime } from './timeOptions'
import { Field } from '../Field'

type HarnessProps = Partial<React.ComponentProps<typeof TimeField>> & {
  initialValue?: string | null
  onChange?: (time: string | null) => void
}

// Controlled and labelled, like every caller
const Harness = ({ initialValue = '18:00', onChange, ...props }: HarnessProps) => {
  const [value, setValue] = useState<string | null>(initialValue)

  const handleValueChange = (time: string | null) => {
    setValue(time)
    onChange?.(time)
  }

  return (
    <Field label="Starts at">
      <TimeField onValueChange={handleValueChange} value={value} {...props} />
    </Field>
  )
}

const getInput = () => screen.getByLabelText('Starts at')
const getOptions = () => screen.queryAllByRole('option').map((option) => option.textContent)

describe('timeOptions', () => {
  it('lists the day in steps', () => {
    expect(getTimeOptions(30)).toHaveLength(48)
    expect(getTimeOptions(30).slice(0, 3)).toEqual(['00:00', '00:30', '01:00'])
    expect(getTimeOptions(60).at(-1)).toBe('23:00')
  })

  it.each([
    ['18', '18:30', true],
    ['18:3', '18:30', true],
    ['1830', '18:30', true],
    ['930', '09:30', true],
    ['9', '09:00', true],
    ['', '09:00', true],
    ['19', '18:30', false],
  ])('matches %j against %s: %s', (query, time, isMatch) => {
    expect(matchesTime(time, query)).toBe(isMatch)
  })
})

describe('TimeField', () => {
  it('shows the time, or HH:mm when empty, and is named by its Field label', () => {
    const { unmount } = render(<Harness />)

    expect(getInput()).toHaveValue('18:00')
    unmount()

    render(<Harness initialValue={null} />)
    expect(getInput()).toHaveValue('')
    expect(getInput()).toHaveAttribute('placeholder', 'HH:mm')
  })

  it('lists the times on click and applies a picked one at once', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.click(getInput())

    expect(getOptions()).toHaveLength(48)

    await userEvent.click(screen.getByRole('option', { name: '09:30' }))

    expect(onChange).toHaveBeenLastCalledWith('09:30')
    expect(getInput()).toHaveValue('09:30')
  })

  it('narrows the list to what is typed', async () => {
    render(<Harness />)
    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '18')

    expect(getOptions()).toEqual(['18:00', '18:30'])
  })

  it('applies any typed time on Enter without submitting the form', async () => {
    const onChange = vi.fn()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())

    render(
      <form onSubmit={onSubmit}>
        <Harness onChange={onChange} />
        <button type="submit">Save</button>
      </form>,
    )
    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '1745{Enter}')

    expect(onChange).toHaveBeenLastCalledWith('17:45')
    expect(getInput()).toHaveValue('17:45')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('applies typed text on leaving the field, not on every key', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '9')

    expect(onChange).not.toHaveBeenCalled()

    await userEvent.tab()

    expect(onChange).toHaveBeenLastCalledWith('09:00')
  })

  it('picks the highlighted time with the arrow keys and Enter', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '18')
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')

    expect(onChange).toHaveBeenLastCalledWith('18:30')
  })

  it('marks text that is not a time, then puts the last time back', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '25:00')

    expect(getInput()).toHaveAttribute('aria-invalid', 'true')

    await userEvent.tab()

    expect(getInput()).toHaveValue('18:00')
    expect(onChange).not.toHaveBeenCalled()

    await userEvent.clear(getInput())
    await userEvent.type(getInput(), '07{Escape}')

    expect(getInput()).toHaveValue('18:00')
  })

  it('clears when emptied', async () => {
    const onChange = vi.fn()

    render(<Harness onChange={onChange} />)
    await userEvent.clear(getInput())
    await userEvent.tab()

    expect(onChange).toHaveBeenLastCalledWith(null)
  })

  it('is disabled', () => {
    render(<Harness disabled />)

    expect(getInput()).toBeDisabled()
  })
})
