import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Tooltip from './Tooltip'

describe('Tooltip', () => {
  it('shows its label on hover and on keyboard focus', async () => {
    render(
      <Tooltip label="Edit">
        <button type="button">✎</button>
      </Tooltip>,
    )

    expect(screen.queryByText('Edit')).not.toBeInTheDocument()

    await userEvent.hover(screen.getByRole('button'))
    expect(await screen.findByText('Edit')).toBeInTheDocument()

    await userEvent.unhover(screen.getByRole('button'))
    await userEvent.tab()
    expect(await screen.findByText('Edit')).toBeInTheDocument()
  })

  it('stays shown after a press while isOpen', async () => {
    const CopyButton = () => {
      const [isCopied, setIsCopied] = useState(false)

      return (
        <Tooltip isOpen={isCopied} label={isCopied ? 'Copied' : 'Copy'}>
          <button onClick={() => setIsCopied(true)} type="button">
            ⧉
          </button>
        </Tooltip>
      )
    }

    render(<CopyButton />)

    await userEvent.click(screen.getByRole('button'))
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })
})
