import { type StaticImageData } from 'next/image'

import adrenalineLogo from '@/assets/images/partnerLogos/adrenaline.png'
import buruSportsLogo from '@/assets/images/partnerLogos/burusports.svg'
import drunkCherryLogo from '@/assets/images/partnerLogos/drunkcherry.png'
import ozonLogo from '@/assets/images/partnerLogos/ozon.png'
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

export type PartnerTier = 1 | 2 | 3

export const partners: Record<PartnerTier, Partner[]> = {
  1: [],
  2: [
    {
      id: 'vagabond',
      infoKey: 'partners.info.vagabond',
      logo: vagabondLogo,
      name: 'Vagabond Adventures',
      url: 'https://vagabondadventures.ge/',
    },
    {
      id: 'snowlab',
      isHidden: true,
      logo: snowLabLogo,
      name: 'Snowlab',
      url: 'https://snow-lab.com',
    },
  ],
  3: [
    {
      id: 'ozon',
      infoKey: 'partners.info.ozon',
      logo: ozonLogo,
      name: 'Ozon Gudauri',
      url: 'https://www.ozongudauri.com/',
    },
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
