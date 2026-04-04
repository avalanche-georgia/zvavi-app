import { AboutUs, CurrentForecastContainer, JoinUs, Partners } from '@components/features/home'

const Home = () => (
  <div className="mx-auto max-w-(--breakpoint-md) space-y-8 px-4 pt-3 pb-6">
    <CurrentForecastContainer />
    <Partners />
    <AboutUs />
    <JoinUs />
  </div>
)

export default Home
