import { Tabs } from '@base-ui/react/tabs'
import { sortedElevationZones } from '@domain/constants'
import type { Aspects } from '@domain/types'
import { useTranslations } from 'next-intl'

import MiniCompass from '../MiniCompass'

// Zone switcher; each tab previews that zone's selection
const ZoneTabs = ({ value }: { value: Aspects }) => {
  const t = useTranslations()

  return (
    <Tabs.List
      activateOnFocus
      aria-label={t('common.aspectElevationPicker.zonesAria')}
      className="bg-tile rounded-media grid grid-cols-3 gap-1 p-1"
    >
      {sortedElevationZones.map((zone) => (
        <Tabs.Tab
          key={zone}
          className="text-body data-active:text-ink focus-visible:outline-accent rounded-control text-caption data-active:bg-surface data-active:shadow-raised sm:text-copy-sm flex min-h-11 flex-col items-center justify-center gap-1 px-1.5 py-1.5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-9 sm:flex-row sm:gap-2"
          value={zone}
        >
          <MiniCompass aspects={value[zone]} />
          {t(`common.elevationZones.${zone}`)}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  )
}

export default ZoneTabs
