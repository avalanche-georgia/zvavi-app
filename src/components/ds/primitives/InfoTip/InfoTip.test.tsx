import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import InfoTip from './InfoTip'

describe('InfoTip', () => {
  // A popover, not a tooltip: it must open on a tap (phones have no hover)
  it('opens on click and closes on Escape', async () => {
    render(<InfoTip ariaLabel="About elevation zones">Above 2400 m</InfoTip>)
    const trigger = screen.getByRole('button', { name: 'About elevation zones' })

    await userEvent.click(trigger)
    expect(await screen.findByText('Above 2400 m')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText('Above 2400 m')).not.toBeInTheDocument()
  })
})
