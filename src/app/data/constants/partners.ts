import { type StaticImageData } from 'next/image'

import adrenalineLogo from '@/assets/images/partnerLogos/adrenaline.png'
import bsaLogo from '@/assets/images/partnerLogos/bsa.png'
import buruSportsLogo from '@/assets/images/partnerLogos/burusports.png'
import drunkCherryLogo from '@/assets/images/partnerLogos/drunkcherry.png'
import MtaLogo from '@/assets/images/partnerLogos/mta.svg?component'
import ozonLogo from '@/assets/images/partnerLogos/ozon.png'
import snowLabLogo from '@/assets/images/partnerLogos/snowlab.png'
import vagabondLogo from '@/assets/images/partnerLogos/vagabond.png'

export type PartnerLogo = StaticImageData | React.ComponentType<React.SVGProps<SVGSVGElement>>

export type Partner = {
  id: string
  infoKey?: string
  isHidden?: boolean
  isRounded?: boolean
  logo: PartnerLogo
  name: string
  url: string
}

export type PartnerTier = 1 | 2 | 3

export const partners: Record<PartnerTier, Partner[]> = {
  1: [
    {
      id: 'MTA',
      infoKey: 'partners.info.mta',
      logo: MtaLogo,
      name: 'Mountain Trails Agency',
      url: 'https://mta.ski/',
    },
  ],
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
    {
      id: 'bsa',
      infoKey: 'partners.info.bsa',
      logo: bsaLogo,
      name: 'Bakuriani Ski Academy',
      url: 'https://datosskola.com/',
    },
  ],
  3: [
    {
      id: 'ozon',
      infoKey: 'partners.info.ozon',
      isRounded: true,
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
