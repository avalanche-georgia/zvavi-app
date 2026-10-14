import { RegionTabs } from '@components/shared'
import type { Region, RegionId } from '@domain/types'

type RegionTabBarProps = {
  // The page's main action (e.g. "Create forecast"), on the right
  children?: React.ReactNode
  // Optional badge per tab (e.g. items awaiting review)
  counts?: Partial<Record<RegionId, number>>
  initialRegions?: Region[]
  regionId: RegionId
}

// Top bar of a per-region admin list: region tabs + the page's main action
const RegionTabBar = ({ children, counts, initialRegions, regionId }: RegionTabBarProps) => (
  // Tabs sit on the bottom rule; the action gets its own vertical breathing room
  <div className="border-rule bg-surface flex items-end justify-between gap-4 border-b px-4 md:px-6">
    <RegionTabs counts={counts} currentRegionId={regionId} initialRegions={initialRegions} />
    {children && <div className="my-2 shrink-0 self-center">{children}</div>}
  </div>
)

export default RegionTabBar
