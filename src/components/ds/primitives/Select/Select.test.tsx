import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Select from './Select'
import { Field } from '../Field'

const options = [
  { label: 'All regions', value: 'all' },
  { label: 'Gudauri', value: 'gudauri' },
  { label: 'Svaneti', value: 'svaneti' },
]

const Harness = ({ disabled = false }: { disabled?: boolean }) => {
  const [value, setValue] = useState('all')

  return (
    <Field label="Region">
      <Select disabled={disabled} onValueChange={setValue} options={options} value={value} />
    </Field>
  )
}

describe('Select', () => {
  it('is named by the Field label and shows the picked option', async () => {
    render(<Harness />)
    const trigger = screen.getByRole('combobox', { name: 'Region' })

    await userEvent.click(trigger)
    await userEvent.click(await screen.findByRole('option', { name: 'Svaneti' }))

    expect(trigger).toHaveTextContent('Svaneti')
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    render(<Harness />)
    const trigger = screen.getByRole('combobox', { name: 'Region' })

    await userEvent.click(trigger)
    // Esc only reaches the popup once focus has moved into it
    await waitFor(() => expect(document.activeElement).toHaveAttribute('role', 'option'))
    await userEvent.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('does not open when disabled', async () => {
    render(<Harness disabled />)

    await userEvent.click(screen.getByRole('combobox', { name: 'Region' }))

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // Hidden visually on phones only (sr-only), shown from sm
  it('can show just its icon on phones', () => {
    render(
      <Select
        ariaLabel="Sort"
        isValueHiddenOnPhone
        leading={<svg data-testid="sort-icon" />}
        onValueChange={() => undefined}
        options={options}
        value="gudauri"
      />,
    )

    expect(screen.getByTestId('sort-icon')).toBeInTheDocument()
    expect(screen.getByText('Gudauri')).toHaveClass('max-sm:sr-only')
  })

  it('keeps the value visible with a leading icon alone', () => {
    render(
      <Select
        ariaLabel="Region"
        leading={<svg />}
        onValueChange={() => undefined}
        options={options}
        value="gudauri"
      />,
    )

    expect(screen.getByText('Gudauri')).toHaveClass('flex-1')
    expect(screen.getByText('Gudauri')).not.toHaveClass('max-sm:sr-only')
  })
})
