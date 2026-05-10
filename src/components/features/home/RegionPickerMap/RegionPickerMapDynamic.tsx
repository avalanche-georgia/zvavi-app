'use client'

import { Spinner } from '@components/ui'
import type { RegionWithHazard } from '@data/queries/fetchRegionsWithHazard'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./RegionPickerMapClient'), {
  loading: () => (
    <div className="relative flex h-115 items-center justify-center rounded-xl bg-gray-100 md:h-150">
      <Spinner />
    </div>
  ),
  ssr: false,
})

type RegionPickerMapDynamicProps = {
  regions: RegionWithHazard[]
}

const RegionPickerMapDynamic = ({ regions }: RegionPickerMapDynamicProps) => (
  <LeafletMap regions={regions} />
)

export default RegionPickerMapDynamic
