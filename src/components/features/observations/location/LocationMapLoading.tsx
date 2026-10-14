import { Spinner } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Stands in for the close-up map while Leaflet loads
const LocationMapLoading = () => {
  const t = useTranslations()

  return (
    <div className="bg-map flex size-full items-center justify-center">
      <Spinner label={t('common.messages.loading')} />
    </div>
  )
}

export default LocationMapLoading
