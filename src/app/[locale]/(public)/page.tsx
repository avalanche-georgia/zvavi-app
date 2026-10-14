import { HomePage } from '@components/features/home'
import { regionLocalStorageKey } from '@domain/constants'
import { cookies } from 'next/headers'

import fetchHomeData from './fetchHomeData'

const Home = async () => {
  const cookieStore = await cookies()
  const data = await fetchHomeData(cookieStore.get(regionLocalStorageKey)?.value ?? null)

  return (
    <HomePage
      latestObservations={data.latestObservations}
      now={data.now}
      partners={data.partners}
      regions={data.regions}
    />
  )
}

export default Home
