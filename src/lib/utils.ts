import { type ClassValue, clsx } from 'cnfast'
import { extendTailwindMerge } from 'tailwind-merge'

import { fontSizeTokens, radiusTokens, shadowTokens } from './designTokens'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: [...radiusTokens],
      shadow: [...shadowTokens],
      text: [...fontSizeTokens],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
