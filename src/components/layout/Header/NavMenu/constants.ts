import type { Region } from '@domain/types'

import type { NavMenuItem } from './types'

import { routes } from '@/routes'

type NavMenuOptions = {
  // The remembered region, if any
  regionId: string | null
  regions: Region[]
}

// Order is important
export const getNavMenuItems = ({ regionId, regions }: NavMenuOptions): NavMenuItem[] => {
  // Region-wide pages open for the remembered region, else the first one
  const defaultRegionId = regionId ?? regions[0]?.id ?? null
  const hasRegions = Boolean(defaultRegionId)

  return [
    {
      activePaths: regions.map((region) => routes.forecastsByRegion(region.id).root),
      children: [
        ...regions.map((region) => ({
          icon: 'mountainSnow' as const,
          id: region.id,
          path: routes.forecastsByRegion(region.id).current,
          titleId: `regions.names.${region.id}`,
        })),
        {
          icon: 'cloudSnow',
          id: 'archive',
          path: routes.forecastsByRegion(defaultRegionId ?? '').history,
          titleId: 'navigation.archive',
        },
      ],
      icon: 'snowflake',
      id: 'forecasts',
      isHidden: !hasRegions,
      titleId: 'navigation.forecasts',
    },
    {
      activePaths: regions.map((region) => routes.observationsByRegion(region.id).root),
      icon: 'telescope',
      id: 'observations',
      isHidden: !hasRegions,
      path: routes.observationsByRegion(defaultRegionId ?? '').root,
      titleId: 'navigation.observations',
    },
    {
      icon: 'thermometerSnowflake',
      id: 'weatherStations',
      path: routes.weatherStations,
      titleId: 'navigation.weatherStations',
    },
    {
      icon: 'handshake',
      id: 'partners',
      path: routes.partners,
      titleId: 'navigation.partners',
    },
    {
      children: [
        {
          icon: 'users',
          id: 'aboutUs',
          path: routes.about.aboutUs,
          titleId: 'navigation.aboutUs',
        },
        {
          icon: 'userPlus',
          id: 'joinUs',
          path: routes.about.joinUs,
          titleId: 'navigation.joinUs',
        },
        {
          icon: 'mail',
          id: 'contact',
          path: routes.about.contact,
          titleId: 'navigation.contact',
        },
      ],
      icon: 'info',
      id: 'about',
      titleId: 'navigation.about',
    },
  ]
}

const isUnder = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`)

// Whether the item (or one of its pages) is the page being viewed
export const isNavItemActive = (item: NavMenuItem, pathname: string): boolean => {
  if (item.activePaths?.some((path) => isUnder(pathname, path))) return true
  if (item.children) return item.children.some((child) => isNavItemActive(child, pathname))

  return isUnder(pathname, item.path)
}
