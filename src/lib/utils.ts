import { type ClassValue, clsx } from 'cnfast'
import { extendTailwindMerge } from 'tailwind-merge'

import {
  fontSizeTokens,
  leadingTokens,
  radiusTokens,
  shadowTokens,
  trackingTokens,
} from './designTokens'

const twMerge = extendTailwindMerge<'border-slot'>({
  extend: {
    // Custom utilities from globals.css; own groups, so they never drop a colour class
    classGroups: { 'border-slot': ['border-slot'] },
    theme: {
      leading: [...leadingTokens],
      radius: [...radiusTokens],
      shadow: [...shadowTokens],
      text: [...fontSizeTokens],
      tracking: [...trackingTokens],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
