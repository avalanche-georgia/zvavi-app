'use client'

import { useState } from 'react'
import { ObservationDetailSheet } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'

import RecentAvalancheRow from './RecentAvalancheRow'

// The rows, and the sheet a row opens — stepping through these few records
const RecentAvalanchesList = ({ avalanches }: { avalanches: PublicObservation[] }) => {
  // By id, so a refreshed list can't swap the open record for its neighbour
  const [openId, setOpenId] = useState<number | null>(null)
  const foundIndex = avalanches.findIndex(({ id }) => id === openId)
  const openIndex = foundIndex === -1 ? null : foundIndex

  const handleNavigate = (offset: number) => {
    if (openIndex === null) return

    setOpenId(avalanches[openIndex + offset]?.id ?? openId)
  }

  return (
    <>
      <ul className="divide-rule -mt-2.5 flex flex-col divide-y">
        {avalanches.map((avalanche) => (
          <li key={avalanche.id}>
            <RecentAvalancheRow avalanche={avalanche} onOpen={() => setOpenId(avalanche.id)} />
          </li>
        ))}
      </ul>
      <ObservationDetailSheet
        contextPoints={[]}
        index={openIndex}
        observation={openIndex === null ? null : avalanches[openIndex]}
        onClose={() => setOpenId(null)}
        onNavigate={handleNavigate}
        total={avalanches.length}
      />
    </>
  )
}

export default RecentAvalanchesList
