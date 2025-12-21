import cornice from '@assets/icons/avalancheProblems/cornice.png'
import deepSlab from '@assets/icons/avalancheProblems/deepSlab.png'
import glide from '@assets/icons/avalancheProblems/glide.png'
import looseDry from '@assets/icons/avalancheProblems/looseDry.png'
import looseWet from '@assets/icons/avalancheProblems/looseWet.png'
import persistentSlab from '@assets/icons/avalancheProblems/persistentSlab.png'
import stormSlab from '@assets/icons/avalancheProblems/stormSlab.png'
import wetSlab from '@assets/icons/avalancheProblems/wetSlab.png'
import windSlab from '@assets/icons/avalancheProblems/windSlab.png'
import considerable from '@assets/icons/hazardLevel/considerable.svg'
import high from '@assets/icons/hazardLevel/high.svg'
import low from '@assets/icons/hazardLevel/low.svg'
import moderate from '@assets/icons/hazardLevel/moderate.svg'
import type { AvalancheProblemTypes, HazardLevelScale } from '@domain/types'
import type { StaticImageData } from 'next/image'

type HazardIcons = Record<HazardLevelScale, StaticImageData>

export const hazardIcons: HazardIcons = {
  1: low,
  2: moderate,
  3: considerable,
  4: high,
  5: high,
}

export const problemIcons: Record<AvalancheProblemTypes, StaticImageData> = {
  cornice,
  deepSlab,
  glide,
  looseDry,
  looseWet,
  persistentSlab,
  stormSlab,
  wetSlab,
  windSlab,
}

export const backgroundColorByHazardLevel = {
  1: 'bg-hazard-1',
  2: 'bg-hazard-2',
  3: 'bg-hazard-3',
  4: 'bg-hazard-4',
  5: 'bg-hazard-5',
}

export const links = {
  courseForm: 'https://forms.gle/NGN3TP8uR3rWqHV97',
  email: 'zvavisaqartvelo@gmail.com',
  facebook: 'https://www.facebook.com/avalanche.ge',
  instagram: 'https://www.instagram.com/avalanche.ge',
  memberForm: 'https://forms.gle/3adsnWwxdvgtEhoJ6',
  patreon: 'https://www.patreon.com/AvalancheGeorgia',
  wise: 'https://wise.com/pay/business/avalanchegeorgia',
}

export const bankDetailsGEL = {
  account: 'GE39TB7640836020100012',
  code: 'TBCBGE 22',
  name: 'Avalanche Georgia',
}

export const bankDetailsUSDEUR = {
  account: 'GE78TB7640836120100005',
  address: '5 Luarsab Sharashidze Street, Tbilisi 0108, Georgia',
  code: 'TBCBGE 22',
}

export const feedbackFormURL = 'https://forms.gle/xAAdyPGbcaTwPR7K6'
