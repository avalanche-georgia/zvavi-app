'use client'

import { useState } from 'react'
import { ObservationDetailSheet } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'

import RecentAvalancheRow from './RecentAvalancheRow'

// The rows, and the sheet a row opens — stepping through these few records
const RecentAvalanchesList = ({ avalanches }: { avalanches: PublicObservation[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleNavigate = (offset: number) => {
    setOpenIndex((index) => (index === null ? index : index + offset))
  }

  return (
    <>
      <ul className="divide-rule -mt-2.5 flex flex-col divide-y">
        {avalanches.map((avalanche, index) => (
          <li key={avalanche.id}>
            <RecentAvalancheRow avalanche={avalanche} onOpen={() => setOpenIndex(index)} />
          </li>
        ))}
      </ul>
      <ObservationDetailSheet
        contextPoints={[]}
        index={openIndex}
        observation={openIndex === null ? null : (avalanches[openIndex] ?? null)}
        onClose={() => setOpenIndex(null)}
        onNavigate={handleNavigate}
        total={avalanches.length}
      />
    </>
  )
}

export default RecentAvalanchesList
