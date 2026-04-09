import { useMemo, useState } from 'react'
import type { Partner } from '@domain/types'

const useFilteredPartners = (partners: Partner[]) => {
  const [search, setSearch] = useState('')

  const filteredPartners = useMemo(() => {
    const lower = search.toLowerCase()

    const result = search
      ? partners.filter(
          (partner) =>
            partner.nameEn.toLowerCase().includes(lower) ||
            partner.nameKa?.toLowerCase().includes(lower),
        )
      : partners

    return [...result].sort((partnerA, partnerB) => {
      const statusDiff = Number(partnerB.isActive) - Number(partnerA.isActive)

      if (statusDiff !== 0) return statusDiff

      return partnerA.nameEn.localeCompare(partnerB.nameEn)
    })
  }, [partners, search])

  return { filteredPartners, search, setSearch }
}

export default useFilteredPartners
