import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import SearchField from './SearchField'

const Harness = () => {
  const [value, setValue] = useState('')

  return (
    <SearchField aria-label="Search" clearLabel="Clear" onValueChange={setValue} value={value} />
  )
}

describe('SearchField', () => {
  it('shows a clear button once something is typed; clearing keeps focus in the field', async () => {
    render(<Harness />)
    const input = screen.getByRole('textbox', { name: 'Search' })

    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()

    await userEvent.type(input, 'Kazbegi')
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }))

    expect(input).toHaveValue('')
    expect(input).toHaveFocus()
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument()
  })

  it('has a toolbar size, keeping room for the icon', () => {
    render(
      <SearchField
        aria-label="Search"
        clearLabel="Clear"
        onValueChange={() => undefined}
        size="sm"
        value=""
      />,
    )

    expect(screen.getByRole('textbox')).toHaveClass('h-10', 'pl-9.5')
  })
})
