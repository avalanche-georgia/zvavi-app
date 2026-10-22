import { SegmentedControl, type ToggleOption } from '@ds/primitives'
import { List, Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export type ObservationsView = 'list' | 'map'

type ViewSwitchProps = {
  onViewChange: (view: ObservationsView) => void
  view: ObservationsView
}

// List / map on phones and tablets; desktop shows both side by side
const ViewSwitch = ({ onViewChange, view }: ViewSwitchProps) => {
  const t = useTranslations()

  const viewOptions: ToggleOption<ObservationsView>[] = [
    { ariaLabel: t('observations.view.list'), label: <List className="size-4.5" />, value: 'list' },
    {
      ariaLabel: t('observations.view.map'),
      label: <MapIcon className="size-4.5" />,
      value: 'map',
    },
  ]

  return (
    <SegmentedControl
      ariaLabel={t('observations.view.label')}
      className="shrink-0 lg:hidden [&>button]:px-2"
      onChange={onViewChange}
      options={viewOptions}
      size="sm"
      value={view}
    />
  )
}

export default ViewSwitch
