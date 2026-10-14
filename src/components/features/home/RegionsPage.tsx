import type { Partner } from '@domain/types'

import AboutJoin from './about/AboutJoin'
import HeroIntro from './hero/HeroIntro'
import HomeHero from './hero/HomeHero'
import MainPartners from './partners/MainPartners'
import toHeroRegion, { type RegionsPageRegion } from './toHeroRegion'

type RegionsPageProps = {
  now: string
  partners: Partner[]
  regions: RegionsPageRegion[]
}

// The region chooser: today's danger per region and the map, main partners,
// and about / join
const RegionsPage = ({ now, partners, regions }: RegionsPageProps) => (
  <div className="bg-canvas text-ink">
    <section className="mx-auto max-w-310 px-4 pt-6 pb-8 md:px-5 lg:pt-9 lg:pb-10 xl:px-8">
      <HomeHero intro={<HeroIntro now={now} />} regions={regions.map(toHeroRegion)} />
    </section>
    <MainPartners partners={partners} />
    <AboutJoin />
  </div>
)

export default RegionsPage
