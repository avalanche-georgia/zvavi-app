import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import ClampedText from './ClampedText'

// jsdom does no layout: fake a paragraph taller than its clamp, and a ResizeObserver
// that reports once
let scrollHeight = 0

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(private callback: VoidFunction) {}
      disconnect = () => undefined
      observe = () => this.callback()
    },
  )
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => scrollHeight)
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(40)
  vi.spyOn(window, 'scrollBy').mockImplementation(() => undefined)
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const renderText = () =>
  render(
    <ClampedText lessLabel="Show less" lines={2} moreLabel="Read more">
      A long description of the snowpack
    </ClampedText>,
  )

describe('ClampedText', () => {
  it('offers "Read more" only when the text is cut', () => {
    scrollHeight = 40
    renderText()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('expands and collapses in place', async () => {
    scrollHeight = 120
    renderText()
    const toggle = screen.getByRole('button', { name: 'Read more' })

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveTextContent('Show less')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
