'use client'

import { useAspectSummary } from '@components/features/observations'
import { Sheet, SheetClose, SheetIconButton, SheetTitle, Spinner } from '@components/ui'
import type { ObservationPoint, PublicObservation } from '@domain/types'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import CoordinatesRow from './CoordinatesRow'
import getMapsLink from './getMapsLink'
import useFormatDay from '../detail/useFormatDay'
import hasCoordinates from '../helpers/hasCoordinates'

const LocationMapClient = dynamic(() => import('./LocationMapClient'), {
  loading: () => (
    <div className="bg-map flex size-full items-center justify-center">
      <Spinner />
    </div>
  ),
  ssr: false,
})

type LocationSheetProps = {
  isOpen: boolean
  // Other observations, shown as context dots
  contextPoints: ObservationPoint[]
  observation: PublicObservation
  onClose: VoidFunction
}

// Stacks above the detail sheet: a close-up map of one observation
const LocationSheet = ({ contextPoints, isOpen, observation, onClose }: LocationSheetProps) => {
  const t = useTranslations()
  const getAspectSummary = useAspectSummary()
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
          className="bg-primary hover:bg-primary-hover flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-semibold text-white transition-colors"
          href={mapsLink.href}
          rel={mapsLink.isExternalPage ? 'noopener noreferrer' : undefined}
          target={mapsLink.isExternalPage ? '_blank' : undefined}
        >
          {t('observations.location.openInMaps')}
        </a>
      }
      header={
        <>
          <SheetTitle className="m-0 flex-1 text-[17px] font-bold tracking-[-.01em]">
            {t('observations.labels.typeAndSize', {
              size,
              type: t(`common.avalancheTypes.${type}`),
            })}
          </SheetTitle>
          <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
            <X className="size-4.5" />
          </SheetClose>
        </>
      }
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <div className="isolate h-[52dvh] min-h-75">
        <LocationMapClient
          center={[latitude, longitude]}
          points={contextPoints}
          selectedId={id}
          size={size}
        />
      </div>
      <CoordinatesRow latitude={latitude} longitude={longitude} />
      {meta && <p className="text-muted px-4 pt-1.5 pb-4 text-[13px]">{meta}</p>}
    </Sheet>
  )
}

export default LocationSheet
