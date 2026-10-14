'use client'

import { useAspectSummary } from '@components/hooks'
import type { ObservationPoint, PublicObservation } from '@domain/types'
import { Sheet, SheetHeader } from '@ds/patterns'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import CoordinatesRow from './CoordinatesRow'
import getMapsLink from './getMapsLink'
import LocationMapLoading from './LocationMapLoading'
import hasCoordinates from '../hasCoordinates'
import useFormatDay from '../useFormatDay'

const LocationMapClient = dynamic(() => import('./LocationMapClient'), {
  loading: LocationMapLoading,
  ssr: false,
})

// Just what the close-up needs — public observations and admin records both fit
export type LocationSheetRecord = Pick<
  PublicObservation,
  'aspects' | 'date' | 'id' | 'isDateUnknown' | 'latitude' | 'longitude' | 'size' | 'type'
>

type LocationSheetProps = {
  isOpen: boolean
  // Other observations, shown as context dots
  contextPoints: ObservationPoint[]
  observation: LocationSheetRecord
  onClose: VoidFunction
}

// Stacks above the detail sheet: a close-up map of one observation
const LocationSheet = ({ contextPoints, isOpen, observation, onClose }: LocationSheetProps) => {
  const t = useTranslations()
  const { getSummary: getAspectSummary } = useAspectSummary()
  const formatDay = useFormatDay()

  if (!hasCoordinates(observation)) return null

  const { date, id, isDateUnknown, latitude, longitude, size, type } = observation
  const mapsLink = getMapsLink(latitude, longitude)
  const meta = [getAspectSummary(observation.aspects), !isDateUnknown && date && formatDay(date)]
    .filter(Boolean)
    .join(' · ')

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Sheet
      footer={
        <a
          className="focus-ring bg-primary hover:bg-primary-hover rounded-field text-copy-lg flex h-12 flex-1 items-center justify-center font-semibold text-white transition-colors"
          href={mapsLink.href}
          rel={mapsLink.isExternalPage ? 'noopener noreferrer' : undefined}
          target={mapsLink.isExternalPage ? '_blank' : undefined}
        >
          {t('observations.location.openInMaps')}
        </a>
      }
      header={
        <SheetHeader
          closeLabel={t('common.actions.close')}
          title={t('observations.labels.typeAndSize', {
            size,
            type: t(`common.avalancheTypes.${type}`),
          })}
        />
      }
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      {/* Desktop panel is full height — the map takes whatever the text leaves */}
      <div className="flex flex-col lg:h-full">
        <div className="isolate h-[52dvh] min-h-75 lg:h-auto lg:flex-1">
          <LocationMapClient
            center={[latitude, longitude]}
            points={contextPoints}
            selectedId={id}
            size={size}
          />
        </div>
        <CoordinatesRow latitude={latitude} longitude={longitude} />
        {meta && <p className="text-muted text-copy-sm px-4 pt-1.5 pb-4">{meta}</p>}
      </div>
    </Sheet>
  )
}

export default LocationSheet
