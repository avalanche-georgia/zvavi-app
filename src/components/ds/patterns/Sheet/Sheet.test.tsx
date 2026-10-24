import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Sheet from './Sheet'
import SheetHeader from './SheetHeader'
import SheetStepButtons from './SheetStepButtons'

const renderSheet = (onOpenChange = vi.fn()) => {
  const steps = { hasNext: true, hasPrevious: false, onNext: vi.fn(), onPrevious: vi.fn() }

  render(
    <Sheet
      footer={<button type="button">Save</button>}
      header={
        <SheetHeader closeLabel="Close" title="Observation #12">
          <SheetStepButtons nextLabel="Next" previousLabel="Previous" steps={steps} />
        </SheetHeader>
      }
      isOpen
      onOpenChange={onOpenChange}
      steps={steps}
    >
      <p>Body</p>
    </Sheet>,
  )

  return { onOpenChange, steps }
}

describe('Sheet', () => {
  it('is a dialog named by its header title', () => {
    renderSheet()

    expect(screen.getByRole('dialog', { name: 'Observation #12' })).toBeInTheDocument()
  })

  it('asks to close on × and on Escape', async () => {
    const { onOpenChange } = renderSheet()

    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await userEvent.keyboard('{Escape}')

    expect(onOpenChange.mock.calls.map(([isOpen]) => isOpen)).toEqual([false, false])
  })

  // aria-disabled, not disabled: a disabled button would drop focus out of the sheet
  it('steps with the arrows and ← / →; the edge arrow is aria-disabled', async () => {
    const { steps } = renderSheet()

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveAttribute(
      'aria-disabled',
      'true',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    await userEvent.keyboard('{ArrowRight}')

    expect(steps.onNext).toHaveBeenCalledTimes(2)
  })
})
