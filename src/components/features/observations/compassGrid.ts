import type { Aspect } from '@domain/types'

// Aspects laid out as a 3×3 compass, read row by row; null is the centre cell
export const compassGrid: (Aspect | null)[] = ['nw', 'n', 'ne', 'w', null, 'e', 'sw', 's', 'se']
