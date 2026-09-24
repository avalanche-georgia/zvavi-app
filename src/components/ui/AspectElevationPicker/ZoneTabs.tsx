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
      className="bg-tile grid grid-cols-3 gap-1 rounded-xl p-1"
    >
      {sortedElevationZones.map((zone) => (
        <Tabs.Tab
          key={zone}
          className="text-body data-active:text-ink focus-visible:outline-accent flex min-h-11 flex-col items-center justify-center gap-1 rounded-[9px] px-1.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 data-active:bg-white data-active:shadow-[0_1px_2px_rgba(0,0,0,.08),0_0_0_1px_rgba(0,0,0,.04)] sm:min-h-9 sm:flex-row sm:gap-2 sm:text-[13px]"
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
