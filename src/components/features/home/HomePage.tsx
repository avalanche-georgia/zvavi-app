import type { Partner, PublicObservation, RegionId } from '@domain/types'

import AboutJoin from './about/AboutJoin'
import HeroIntro from './hero/HeroIntro'
import HomeHero from './hero/HomeHero'
import SingleRegionCard from './hero/SingleRegionCard'
import LatestObservations from './observations/LatestObservations'
import MainPartners from './partners/MainPartners'
import toHeroRegion, { type HomeRegion } from './toHeroRegion'

type HomePageProps = {
  // null: no region is known, or the lookup failed — the section is left out
  latestObservations: { observations: PublicObservation[]; regionId: RegionId } | null
  now: string
  partners: Partner[]
  regions: HomeRegion[]
}

// Site home: today's danger per region and the map, the latest observations,
// main partners, and about / join
const HomePage = ({ latestObservations, now, partners, regions }: HomePageProps) => {
  const [onlyRegion] = regions

  return (
    <div className="bg-canvas text-ink">
      <section className="mx-auto max-w-310 px-4 pt-6 pb-8 md:px-5 lg:pt-9 lg:pb-10 xl:px-8">
        <HomeHero
          intro={<HeroIntro now={now} />}
          regions={regions.map(toHeroRegion)}
          singleRegionCard={
            regions.length === 1 && (
              <SingleRegionCard
                forecast={onlyRegion.forecast}
                regionId={onlyRegion.region.id}
                state={onlyRegion.state}
              />
            )
          }
        />
      </section>
      {latestObservations && (
        <LatestObservations
          observations={latestObservations.observations}
          regionId={latestObservations.regionId}
        />
      )}
      <MainPartners partners={partners} />
      <AboutJoin />
    </div>
  )
}

export default HomePage
