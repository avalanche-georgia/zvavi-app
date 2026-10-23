import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ShareButton from './ShareButton'

// The barrel pulls in Supabase hooks; the button needs only the copy hook
vi.mock('@components/hooks', async () => ({
  useCopyWithFeedback: (await import('@components/hooks/useCopyWithFeedback')).default,
}))
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }))

const forecast = { id: 42, regionId: 'gudauri' as const }
const forecastUrl = `${window.location.origin}/gudauri/forecasts/42`
const originalMatchMedia = window.matchMedia

// A phone: a share sheet and a touch screen
const mockPhone = (share: ReturnType<typeof vi.fn>) => {
  Object.defineProperty(navigator, 'share', { configurable: true, value: share })
  window.matchMedia = (query: string) =>
    ({ ...originalMatchMedia(query), matches: query === '(pointer: coarse)' }) as MediaQueryList
}

const shareButton = () => screen.getByRole('button', { name: 'forecast.page.share' })

describe('ShareButton', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'share')
    window.matchMedia = originalMatchMedia
  })

  it('copies the forecast link where there is no share sheet', async () => {
    const user = userEvent.setup()

    render(<ShareButton forecast={forecast} />)
    await user.click(shareButton())

    expect(await navigator.clipboard.readText()).toBe(forecastUrl)
    expect(
      await screen.findByRole('button', { name: 'forecast.page.linkCopied' }),
    ).toBeInTheDocument()
  })

  it('opens the share sheet with the forecast link on a phone', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockResolvedValue(undefined)

    mockPhone(share)
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')

    render(<ShareButton forecast={forecast} />)
    await user.click(shareButton())

    expect(share).toHaveBeenCalledWith({ title: document.title, url: forecastUrl })
    expect(writeText).not.toHaveBeenCalled()
  })

  it('does nothing when the share sheet is closed', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError'))

    mockPhone(share)
    const writeText = vi.spyOn(navigator.clipboard, 'writeText')

    render(<ShareButton forecast={forecast} />)
    await user.click(shareButton())

    expect(share).toHaveBeenCalledOnce()
    expect(writeText).not.toHaveBeenCalled()
    expect(shareButton()).toBeInTheDocument()
  })

  it('copies the link when the share sheet is refused', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockRejectedValue(new DOMException('Denied', 'NotAllowedError'))

    mockPhone(share)
    render(<ShareButton forecast={forecast} />)
    await user.click(shareButton())

    expect(await navigator.clipboard.readText()).toBe(forecastUrl)
    expect(
      await screen.findByRole('button', { name: 'forecast.page.linkCopied' }),
    ).toBeInTheDocument()
  })
})
