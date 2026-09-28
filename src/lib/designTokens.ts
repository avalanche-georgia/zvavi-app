// Names of the custom scales in the `@theme` block of `src/app/globals.css` — keep in sync.
// `cn()` needs them to tell a font size (`text-title`) from a colour (`text-ink`); the gallery
// uses them to list every token.
export const fontSizeTokens = [
  'title-lg',
  'title',
  'heading',
  'copy-lg',
  'copy',
  'copy-sm',
  'caption',
  'micro',
] as const

export const radiusTokens = ['card', 'media', 'field', 'control', 'badge'] as const

export const shadowTokens = ['raised', 'overlay', 'float', 'pin'] as const

export type FontSizeToken = (typeof fontSizeTokens)[number]
export type RadiusToken = (typeof radiusTokens)[number]
export type ShadowToken = (typeof shadowTokens)[number]
