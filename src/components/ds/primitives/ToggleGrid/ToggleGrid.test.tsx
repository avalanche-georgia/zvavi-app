import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import ToggleGrid from './ToggleGrid'

const options = ['1', '2', '3'].map((value) => ({ label: value, value }))

const Harness = () => {
  const [value, setValue] = useState<string | null>(null)

  return <ToggleGrid ariaLabel="Size" onChange={setValue} options={options} value={value} />
}

describe('ToggleGrid', () => {
  // One tab stop for the group; arrows move between tiles, Enter presses
  it('presses one tile at a time, by click or arrow + Enter', async () => {
    render(<Harness />)

    await userEvent.click(screen.getByRole('button', { name: '1' }))
    await userEvent.keyboard('{ArrowRight}{Enter}')

    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-pressed', 'true')
  })
})
