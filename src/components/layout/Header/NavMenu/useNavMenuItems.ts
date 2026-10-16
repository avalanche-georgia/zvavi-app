'use client'

import { useRegionContext } from '@domain/context/RegionContext'

import { getNavMenuItems } from './constants'

const useNavMenuItems = () => {
  const { region } = useRegionContext()

  return getNavMenuItems(region?.id ?? null).filter((item) => !item.isHidden)
}

export default useNavMenuItems
