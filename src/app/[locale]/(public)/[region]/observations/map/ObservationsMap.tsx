'use client'

import { Loading } from '@components/shared'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import type { ObservationsMapClientProps } from './ObservationsMapClient'
import ObservationCard from '../list/ObservationCard'

const ObservationsMapClient = dynamic(() => import('./ObservationsMapClient'), {
  loading: () => <Loading className="bg-map size-full py-0" />,
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

      <div className="border-rule text-body rounded-control bg-surface text-caption shadow-overlay pointer-events-none absolute top-3 left-3 z-500 border px-2.5 py-1.5">
        {t('observations.map.onMap', { count: mapProps.points.length })}
      </div>

      {peekObservation && (
        <div className="absolute inset-x-3 bottom-3 z-600 lg:hidden">
          <ObservationCard
            // Floating over the map: the shadow sets it apart, no selection ring
            className="shadow-menu ring-0"
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
