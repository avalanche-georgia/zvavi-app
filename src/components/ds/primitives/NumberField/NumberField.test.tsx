import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import NumberField from './NumberField'

describe('NumberField', () => {
  it('reports the typed number, and null once emptied', async () => {
    const onValueChange = vi.fn()

    render(<NumberField onValueChange={onValueChange} unit="cm" value={12} />)
    const input = screen.getByRole('textbox')

    await userEvent.clear(input)
    expect(onValueChange).toHaveBeenLastCalledWith(null, expect.anything())

    await userEvent.type(input, '35')
    expect(onValueChange).toHaveBeenLastCalledWith(35, expect.anything())
    expect(screen.getByText('cm')).toBeInTheDocument()
  })
})
