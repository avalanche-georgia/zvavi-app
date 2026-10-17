'use client'

import type { ToggleOption } from '@ds/primitives'
import { SegmentedControl } from '@ds/primitives'
import { List, Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export type StationsViewMode = 'list' | 'map'

type StationsHeaderProps = {
  onViewChange: (view: StationsViewMode) => void
  ref?: React.Ref<HTMLDivElement>
  view: StationsViewMode
}

// Title, description and — on mobile, where list and map don't fit side by
// side — the List/Map switch
const StationsHeader = ({ onViewChange, ref, view }: StationsHeaderProps) => {
  const t = useTranslations()

  const viewOptions: ToggleOption<StationsViewMode>[] = [
    {
      ariaLabel: t('weatherStations.view.list'),
      label: <List aria-hidden className="size-4.5" />,
      value: 'list',
    },
    {
      ariaLabel: t('weatherStations.view.map'),
      label: <MapIcon aria-hidden className="size-4.5" />,
      value: 'map',
    },
  ]

  return (
    <div ref={ref} className="flex items-start justify-between gap-3 px-4 pt-4.5 pb-3">
      <div className="min-w-0">
        <h1 className="text-title m-0 font-bold">{t('navigation.weatherStations')}</h1>
        <p className="text-copy-sm text-muted mt-1">{t('weatherStations.description')}</p>
      </div>
      <SegmentedControl
        ariaLabel={t('weatherStations.view.label')}
        className="shrink-0 lg:hidden [&>button]:px-2.25"
        onChange={onViewChange}
        options={viewOptions}
        size="sm"
        value={view}
      />
    </div>
  )
}

export default StationsHeader
