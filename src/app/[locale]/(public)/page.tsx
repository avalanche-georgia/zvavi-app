import { AboutUs, JoinUs, Partners, RegionPickerMap } from '@components/features/home'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'

const Home = async () => {
  const partners = await fetchTier1Partners()

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-8 px-4 pt-3 pb-6">
      <RegionPickerMap />
      <Partners partners={partners} />
      <AboutUs />
      <JoinUs />
    </div>
  )
}

export default Home
