'use client'

import { ListMapSwitch, type ListMapView } from '@components/shared'
import { useTranslations } from 'next-intl'

type StationsHeaderProps = {
  onViewChange: (view: ListMapView) => void
  ref?: React.Ref<HTMLDivElement>
  view: ListMapView
}

// Title, description and — on mobile, where list and map don't fit side by
// side — the List/Map switch
const StationsHeader = ({ onViewChange, ref, view }: StationsHeaderProps) => {
  const t = useTranslations()

  return (
    <div ref={ref} className="flex items-start justify-between gap-3 px-4 pt-4.5 pb-3">
      <div className="min-w-0">
        <h1 className="text-title m-0 font-bold">{t('navigation.weatherStations')}</h1>
        <p className="text-copy-sm text-muted mt-1">{t('weatherStations.description')}</p>
      </div>
      <ListMapSwitch onViewChange={onViewChange} view={view} />
    </div>
  )
}

export default StationsHeader
