import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import ChipGroup from './ChipGroup'
import MultiChipGroup from './MultiChipGroup'

const options = [
  { label: 'Wind', value: 'wind' },
  { label: 'Sun', value: 'sun' },
  { disabled: true, label: 'Rain', value: 'rain' },
]

const SingleHarness = ({ isDeselectable = false }: { isDeselectable?: boolean }) => {
  const [value, setValue] = useState<string | null>(null)

  return (
    <ChipGroup
      isDeselectable={isDeselectable}
      onChange={setValue}
      options={options}
      value={value}
    />
  )
}

const MultiHarness = () => {
  const [value, setValue] = useState<string[]>([])

  return <MultiChipGroup onChange={setValue} options={options} value={value} />
}

const chip = (name: string) => screen.getByRole('button', { name })

describe('ChipGroup', () => {
  it('keeps one chip pressed; pressing it again keeps it unless deselectable', async () => {
    const { unmount } = render(<SingleHarness />)

    await userEvent.click(chip('Wind'))
    await userEvent.click(chip('Sun'))
    await userEvent.click(chip('Sun'))
    expect(chip('Wind')).toHaveAttribute('aria-pressed', 'false')
    expect(chip('Sun')).toHaveAttribute('aria-pressed', 'true')
    unmount()

    render(<SingleHarness isDeselectable />)
    await userEvent.click(chip('Sun'))
    await userEvent.click(chip('Sun'))
    expect(chip('Sun')).toHaveAttribute('aria-pressed', 'false')
  })

  it('ignores disabled chips', async () => {
    render(<SingleHarness />)

    await userEvent.click(chip('Rain'))

    expect(chip('Rain')).toHaveAttribute('aria-pressed', 'false')
  })

  // sm only shrinks the text, not the chip
  it('keeps the height at size sm', () => {
    render(<ChipGroup onChange={() => undefined} options={options} size="sm" value={null} />)

    expect(chip('Wind')).toHaveClass('text-copy-sm', 'min-h-10')
  })
})

describe('MultiChipGroup', () => {
  it('toggles each chip on its own', async () => {
    render(<MultiHarness />)

    await userEvent.click(chip('Wind'))
    await userEvent.click(chip('Sun'))
    await userEvent.click(chip('Wind'))

    expect(chip('Wind')).toHaveAttribute('aria-pressed', 'false')
    expect(chip('Sun')).toHaveAttribute('aria-pressed', 'true')
  })
})
