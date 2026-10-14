import { Footer, Header } from '@components/layout'
import { DisclaimerGate } from '@components/shared/Disclaimer'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import { regionLocalStorageKey } from '@domain/constants'
import { RegionContextProvider } from '@domain/context/RegionContext'
import { Analytics } from '@vercel/analytics/next'
import { cookies } from 'next/headers'

type LayoutProps = {
  children: React.ReactNode
}

const PublicLayout = async ({ children }: LayoutProps) => {
  const regions = await fetchActiveRegions()
  const cookieStore = await cookies()
  const cookieRegionId = cookieStore.get(regionLocalStorageKey)?.value
  // The remembered region, else the only one there is
  const region =
    regions.find(({ id }) => id === cookieRegionId) ?? (regions.length === 1 ? regions[0] : null)

  return (
    <RegionContextProvider region={region} regions={regions}>
      <DisclaimerGate>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </DisclaimerGate>

      <Analytics />
    </RegionContextProvider>
  )
}

export default PublicLayout
