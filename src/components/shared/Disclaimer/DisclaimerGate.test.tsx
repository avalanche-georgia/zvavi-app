import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import DisclaimerGate from './DisclaimerGate'

const navigation = vi.hoisted(() => ({ pathname: '/gudauri' }))

vi.mock('src/i18n/navigation', () => ({ usePathname: () => navigation.pathname }))
vi.mock('@components/shared/AnalyticsConsent', () => ({
  AnalyticsConsentCard: () => <aside>Analytics consent</aside>,
}))
vi.mock('./DisclaimerModal', () => ({
  default: ({ isOpen, onAccept }: { isOpen: boolean; onAccept: VoidFunction }) =>
    isOpen && (
      <button onClick={onAccept} type="button">
        Accept disclaimer
      </button>
    ),
}))

const acceptButton = () => screen.queryByRole('button', { name: 'Accept disclaimer' })
const isPageInert = (text: string) => screen.getByText(text).closest('[inert]') !== null

describe('DisclaimerGate', () => {
  beforeEach(() => {
    navigation.pathname = '/gudauri'
    document.cookie = 'zvavi.disclaimer-accepted=; max-age=0; path=/'
  })

  it('renders the page inert under the disclaimer until it is accepted', async () => {
    render(<DisclaimerGate isAcceptedInitially={false}>Forecast</DisclaimerGate>)

    expect(isPageInert('Forecast')).toBe(true)
    expect(screen.queryByText('Analytics consent')).not.toBeInTheDocument()

    await userEvent.click(acceptButton()!)

    expect(acceptButton()).not.toBeInTheDocument()
    expect(isPageInert('Forecast')).toBe(false)
    expect(screen.getByText('Analytics consent')).toBeInTheDocument()
    expect(document.cookie).toContain('zvavi.disclaimer-accepted=true')
  })

  it('shows no disclaimer once accepted, and renews the cookie', () => {
    render(<DisclaimerGate isAcceptedInitially>Forecast</DisclaimerGate>)

    expect(isPageInert('Forecast')).toBe(false)
    expect(acceptButton()).not.toBeInTheDocument()
    expect(document.cookie).toContain('zvavi.disclaimer-accepted=true')
  })

  it('leaves the privacy policy readable without the disclaimer', () => {
    navigation.pathname = '/privacy-policy'

    render(<DisclaimerGate isAcceptedInitially={false}>Privacy</DisclaimerGate>)

    expect(isPageInert('Privacy')).toBe(false)
    expect(acceptButton()).not.toBeInTheDocument()
  })
})
