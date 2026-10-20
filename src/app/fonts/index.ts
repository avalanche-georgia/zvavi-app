import localFont from 'next/font/local'

// Self-hosted (not next/font/google): a build no longer depends on Google Fonts'
// responses. Inter's variable font, latin subset, from @fontsource-variable/inter
// 5.3.0 (the same file Google serves); licence in Inter-OFL.txt.
export const inter = localFont({
  src: './inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  weight: '400 700',
})
