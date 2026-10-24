import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import RatingScale from './RatingScale'

const options = [
  { label: 'None', value: '0' },
  { label: 'Low', value: '1' },
  { label: 'High', value: '2' },
]

const Harness = () => {
  const [value, setValue] = useState('0')

  return (
    <>
      <span id="label">Danger</span>
      <RatingScale ariaLabelledBy="label" onChange={setValue} options={options} value={value} />
    </>
  )
}

const radio = (name: string) => screen.getByRole('radio', { name })

describe('RatingScale', () => {
  it('is one tab stop; arrows, Home / End and digit keys select and focus', async () => {
    render(<Harness />)

    await userEvent.tab()
    expect(radio('0 · None')).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    expect(radio('1 · Low')).toBeChecked()
    expect(radio('1 · Low')).toHaveFocus()

    await userEvent.keyboard('{End}')
    expect(radio('2 · High')).toBeChecked()

    await userEvent.keyboard('0')
    expect(radio('0 · None')).toBeChecked()
  })

  it('selects on click', async () => {
    render(<Harness />)

    await userEvent.click(radio('2 · High'))

    expect(radio('2 · High')).toBeChecked()
    expect(screen.getByRole('radiogroup', { name: 'Danger' })).toBeInTheDocument()
  })
})
