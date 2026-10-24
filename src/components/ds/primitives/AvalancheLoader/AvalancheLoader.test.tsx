import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvalancheLoader from './AvalancheLoader'
import styles from './AvalancheLoader.module.css'

const animatedClasses = [
  styles.clump,
  styles.crack,
  styles.crackLine,
  styles.dust,
  styles.fill,
  styles.flake,
  styles.puff,
  styles.under,
]

describe('AvalancheLoader', () => {
  it.each(['sm', 'md', 'lg'] as const)('renders a named status at size %s', (size) => {
    render(<AvalancheLoader label="Loading…" size={size} />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })

  it('keeps the picture silent', () => {
    render(<AvalancheLoader label="Loading" />)

    document.querySelectorAll('svg').forEach((svg) => {
      expect(svg.closest('[aria-hidden]')).not.toBeNull()
    })
  })

  // Two loaders on one page must not share gradient / clip ids
  it('gives every instance its own SVG ids', () => {
    const { container } = render(
      <>
        <AvalancheLoader label="One" />
        <AvalancheLoader label="Two" />
      </>,
    )
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  // Chrome repaints an SVG whose contents animate on every frame, which makes hover
  // backgrounds elsewhere on the page blink
  it('animates HTML layers only, never anything inside an SVG', () => {
    render(<AvalancheLoader label="Loading" size="lg" />)

    animatedClasses.forEach((className) => {
      const animated = document.getElementsByClassName(className)

      expect(animated.length).toBeGreaterThan(0)
      Array.from(animated).forEach((element) => {
        expect(element.tagName).toBe('SPAN')
        expect(element.closest('svg')).toBeNull()
      })
    })
  })
})
