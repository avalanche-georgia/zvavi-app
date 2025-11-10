import { AboutUs, CurrentForecastContainer, JoinUs, Partners } from '@/UI/home'

const Home = () => (
  <main className="mx-auto max-w-screen-md space-y-8 px-4 pb-6 pt-3">
    <CurrentForecastContainer />
    <Partners />
    <AboutUs />
    <JoinUs />
  </main>
)

export default Home
