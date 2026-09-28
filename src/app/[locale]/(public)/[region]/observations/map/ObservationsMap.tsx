'use client'

import { Spinner } from '@components/ui'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import type { ObservationsMapClientProps } from './ObservationsMapClient'
import ObservationCard from '../list/ObservationCard'

const ObservationsMapClient = dynamic(() => import('./ObservationsMapClient'), {
  loading: () => (
    <div className="bg-map flex size-full items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
})

type ObservationsMapProps = ObservationsMapClientProps & {
  dateBasis: ObservationDateBasis
  onOpen: (id: number) => void
  // Mobile: tapped marker shown as a card above the map's bottom edge
  peekObservation: PublicObservation | null
}

const ObservationsMap = ({
  dateBasis,
  onOpen,
  peekObservation,
  ...mapProps
}: ObservationsMapProps) => {
  const t = useTranslations()

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ObservationsMapClient {...mapProps} />

      <div className="border-rule text-body pointer-events-none absolute top-3 left-3 z-500 rounded-[9px] border bg-white px-2.5 py-1.5 text-[12.5px] shadow-[0_2px_8px_rgba(0,0,0,.06)]">
        {t('observations.map.onMap', { count: mapProps.points.length })}
      </div>

      {peekObservation && (
        <div className="absolute inset-x-3 bottom-3 z-600 lg:hidden">
          <ObservationCard
            className="shadow-[0_8px_28px_rgba(0,0,0,.18)]"
            dateBasis={dateBasis}
            isSelected
            observation={peekObservation}
            onOpen={onOpen}
          />
        </div>
      )}
    </>
  )
}

export default ObservationsMap
