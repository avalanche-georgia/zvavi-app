import type { PublicObservation } from '@domain/types'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import SizeTile from '../SizeTile'

// Size + type, then the place name. Dates live in the facts grid right below.
const DetailTitle = ({
  observation,
}: {
  observation: Pick<PublicObservation, 'location' | 'size' | 'type'>
}) => {
  const t = useTranslations()
  const { location, size, type } = observation

  return (
    <>
      <div className="flex items-center gap-3 px-4 pt-4 pb-1">
        <SizeTile className="size-14" size={size} />
        <h2 className="text-title-sm m-0 font-bold">{t(`common.avalancheTypes.${type}`)}</h2>
      </div>
      {location && (
        <p className="text-body text-copy-sm flex items-center gap-1.5 px-4 pt-1.5">
          <MapPin aria-hidden className="size-4 shrink-0" />
          {location}
        </p>
      )}
    </>
  )
}

export default DetailTitle
