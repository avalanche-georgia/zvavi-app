'use client'

import { SegmentedControl, type ToggleOption } from '@ds/primitives'
import { List, Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export type ListMapView = 'list' | 'map'

type ListMapSwitchProps = {
  onViewChange: (view: ListMapView) => void
  view: ListMapView
}

// List / map on phones and tablets, where they don't fit side by side; desktop shows both
const ListMapSwitch = ({ onViewChange, view }: ListMapSwitchProps) => {
  const t = useTranslations()

  const options: ToggleOption<ListMapView>[] = [
    {
      ariaLabel: t('common.listMapSwitch.list'),
      label: <List aria-hidden className="size-4.5" />,
      value: 'list',
    },
    {
      ariaLabel: t('common.listMapSwitch.map'),
      label: <MapIcon aria-hidden className="size-4.5" />,
      value: 'map',
    },
  ]

  return (
    <SegmentedControl
      ariaLabel={t('common.listMapSwitch.label')}
      className="shrink-0 lg:hidden [&>button]:px-2"
      onChange={onViewChange}
      options={options}
      size="sm"
      value={view}
    />
  )
}

export default ListMapSwitch
