import { type StaticImageData } from 'next/image'

import adrenalineLogo from '@/assets/images/partnerLogos/adrenaline.png'
import buruSportsLogo from '@/assets/images/partnerLogos/burusports.svg'
import drunkCherryLogo from '@/assets/images/partnerLogos/drunkcherry.png'
import snowLabLogo from '@/assets/images/partnerLogos/snowlab.png'
import vagabondLogo from '@/assets/images/partnerLogos/vagabond.png'

export type Partner = {
  isHidden?: boolean
  infoKey?: string
  logo: StaticImageData
  name: string
  url: string
  id: string
}

export type PartnerLevel = 'peak' | 'ridge' | 'trail'

export const partners: Record<PartnerLevel, Partner[]> = {
  peak: [
    {
      id: 'vagabond',
      infoKey: 'partners.info.vagabond',
      logo: vagabondLogo,
      name: 'Vagabond Adventures',
      url: 'https://vagabondadventures.ge/',
    },
  ],
  ridge: [
    {
      id: 'snowlab',
      isHidden: true,
      logo: snowLabLogo,
      name: 'Snowlab',
      url: 'https://snow-lab.com',
    },
  ],
  trail: [
    {
      id: 'adrenaline',
      infoKey: 'partners.info.adrenaline',
      logo: adrenalineLogo,
      name: 'Adrenaline',
      url: 'https://www.adrenaline.ge/',
    },
    {
      id: 'drunk-cherry',
      isHidden: true,
      logo: drunkCherryLogo,
      name: 'Drunk Cherry',
      url: 'https://www.instagram.com/gudauri_drunkcherry/',
    },
    {
      id: 'buru-sports',
      infoKey: 'partners.info.buruSports',
      logo: buruSportsLogo,
      name: 'Buru Sports',
      url: 'https://burusports.ge/',
    },
  ],
}
