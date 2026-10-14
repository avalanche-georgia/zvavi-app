'use client'

import { Loading } from '@components/shared'
import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./RegionPickerMapClient'), {
  loading: () => <Loading className="h-115 rounded-xl bg-gray-100 py-0 md:h-150" />,
  ssr: false,
})

type RegionPickerMapDynamicProps = {
  regions: RegionWithHazard[]
}

const RegionPickerMapDynamic = ({ regions }: RegionPickerMapDynamicProps) => (
  <LeafletMap regions={regions} />
)

export default RegionPickerMapDynamic
