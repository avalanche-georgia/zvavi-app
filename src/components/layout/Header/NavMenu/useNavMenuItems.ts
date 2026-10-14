'use client'

import { useRegionContext } from '@domain/context/RegionContext'

import { getNavMenuItems } from './constants'

const useNavMenuItems = () => {
  const { region, regions } = useRegionContext()

  return getNavMenuItems({ regionId: region?.id ?? null, regions }).filter((item) => !item.isHidden)
}

export default useNavMenuItems
