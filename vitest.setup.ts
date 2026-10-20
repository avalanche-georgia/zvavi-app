import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom/vitest'

// jsdom has no matchMedia; every media query reads as not matching (a phone).
// A test that needs a wide screen overrides window.matchMedia itself.
window.matchMedia ??= (query: string) =>
  ({
    addEventListener: () => undefined,
    addListener: () => undefined,
    dispatchEvent: () => false,
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: () => undefined,
    removeListener: () => undefined,
  }) as MediaQueryList

afterEach(() => cleanup())
