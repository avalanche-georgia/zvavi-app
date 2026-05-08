import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import { RegionContextProvider } from '@domain/context/RegionContext'
import { notFound } from 'next/navigation'

type RegionLayoutProps = {
  children: React.ReactNode
  params: Promise<{ region: string }>
}

const RegionLayout = async ({ children, params }: RegionLayoutProps) => {
  const { region: regionId } = await params
  const regions = await fetchActiveRegions()
  const region = regions.find((r) => r.id === regionId)

  if (!region) notFound()

  return (
    <RegionContextProvider region={region} regions={regions}>
      {children}
    </RegionContextProvider>
  )
}

export default RegionLayout
