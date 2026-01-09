import { AboutUs, CurrentForecastContainer, JoinUs, Partners } from '@components/features/home'

const Home = () => (
  <div className="mx-auto max-w-screen-md space-y-8 px-4 pb-6 pt-3">
    <CurrentForecastContainer />
    <Partners />
    <AboutUs />
    <JoinUs />
  </div>
)

export default Home
