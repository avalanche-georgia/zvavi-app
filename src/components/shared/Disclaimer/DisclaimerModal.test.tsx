import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import DisclaimerModal from './DisclaimerModal'

const consent = vi.hoisted(() => ({
  setConsent: vi.fn(),
  status: null as 'denied' | 'granted' | null,
}))

// The barrels pull in Supabase hooks and routing; the modal needs none of it
vi.mock('@components/hooks', () => ({ useAnalyticsConsent: () => consent }))
vi.mock('@components/shared', () => ({ LanguageToggle: () => null }))
vi.mock('@components/shared/AnalyticsConsent', () => ({
  AnalyticsConsentField: ({ onChange }: { onChange: (isAllowed: boolean) => void }) => (
    <button onClick={() => onChange(true)} type="button">
      Allow analytics
    </button>
  ),
}))
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }))

const continueButton = () => screen.getByRole('button', { name: 'common.actions.continue' })

describe('DisclaimerModal', () => {
  beforeEach(() => {
    consent.setConsent.mockClear()
    consent.status = null
  })

  it('keeps Continue disabled until the box is ticked', async () => {
    const onAccept = vi.fn()

    render(<DisclaimerModal isOpen onAccept={onAccept} />)

    expect(continueButton()).toBeDisabled()

    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(continueButton())

    expect(onAccept).toHaveBeenCalledOnce()
  })

  it('has no × and ignores Esc and the backdrop', async () => {
    const onAccept = vi.fn()

    render(<DisclaimerModal isOpen onAccept={onAccept} />)
    await userEvent.keyboard('{Escape}')
    await userEvent.click(document.querySelector('.bg-scrim')!)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common.actions.close' })).not.toBeInTheDocument()
    expect(onAccept).not.toHaveBeenCalled()
  })

  it('saves the analytics choice only when one is asked for', async () => {
    const { unmount } = render(<DisclaimerModal isOpen onAccept={vi.fn()} />)

    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(continueButton())

    expect(consent.setConsent).not.toHaveBeenCalled()
    unmount()

    consent.status = 'denied'
    render(<DisclaimerModal isOpen onAccept={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Allow analytics' }))
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(continueButton())

    expect(consent.setConsent).toHaveBeenCalledWith(true)
  })
})
