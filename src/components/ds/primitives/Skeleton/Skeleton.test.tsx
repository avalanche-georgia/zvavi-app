import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('is decorative', () => {
    const { container } = render(<Skeleton className="h-4 w-24" />)

    expect(container.firstChild).toHaveAttribute('aria-hidden')
  })
})
