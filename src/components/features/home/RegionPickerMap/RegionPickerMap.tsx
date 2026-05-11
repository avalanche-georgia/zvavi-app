import fetchRegionsWithHazard from '@data/queries/fetchRegionsWithHazard'

import RegionPickerMapDynamic from './RegionPickerMapDynamic'

const RegionPickerMap = async () => {
  const regions = await fetchRegionsWithHazard()

  return <RegionPickerMapDynamic regions={regions} />
}

export default RegionPickerMap
