import { useMemo } from 'react'
import { openPeeps } from '@dicebear/collection'
import { createAvatar, type Style, type StyleOptions } from '@dicebear/core'

type OpenPeepsOptions = typeof openPeeps extends Style<infer O> ? StyleOptions<O> : never

const avatarConfig: OpenPeepsOptions = {
  accessories: [
    'glasses',
    'sunglasses',
    'sunglasses2',
    'eyepatch',
    'glasses5',
    'glasses4',
    'glasses3',
    'glasses2',
  ],
  backgroundColor: ['b6e3f4', 'ffdfbf', 'c0aede', 'd1d4f9', 'ffd5dc'],
  backgroundRotation: [40],
  backgroundType: ['solid', 'gradientLinear'],
  face: [
    'explaining',
    'lovingGrin1',
    'lovingGrin2',
    'smile',
    'smileBig',
    'smileLOL',
    'smileTeethGap',
    'calm',
    'cute',
    'hectic',
    'rage',
  ],
  mask: [],
  maskProbability: 0,
  randomizeIds: true,
  skinColor: ['d08b5b', 'edb98a'],
}

const useDiceBearAvatar = (seed: string): string =>
  useMemo(() => createAvatar(openPeeps, { ...avatarConfig, seed }).toDataUri(), [seed])

export default useDiceBearAvatar
