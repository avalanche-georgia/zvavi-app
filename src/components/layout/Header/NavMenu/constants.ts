import type { NavMenuItem } from './types'

import { routes } from '@/routes'

// Order is important. regionId: the region the page is about (URL, remembered, or the
// only one) — its pages form the first group; without one the group is left out
// (region choice lives in the region switcher).
export const getNavMenuItems = (regionId: string | null): NavMenuItem[] => {
  const forecastRoutes = routes.forecastsByRegion(regionId ?? '')

  return [
    {
      activePaths: regionId ? [routes.regionHome(regionId)] : [],
      children: [
        {
          icon: 'mountainSnow',
          id: 'overview',
          isExact: true,
          path: routes.regionHome(regionId ?? ''),
          titleId: 'navigation.overview',
        },
        {
          icon: 'snowflake',
          id: 'currentForecast',
          path: forecastRoutes.current,
          titleId: 'navigation.currentForecast',
        },
        {
          icon: 'mapPinned',
          id: 'forecastArea',
          path: forecastRoutes.forecastArea,
          titleId: 'navigation.forecastArea',
        },
        {
          icon: 'cloudSnow',
          id: 'history',
          path: forecastRoutes.history,
          titleId: 'navigation.archive',
        },
        {
          icon: 'telescope',
          id: 'observations',
          path: routes.observationsByRegion(regionId ?? '').root,
          titleId: 'navigation.observations',
        },
      ],
      icon: 'snowflake',
      id: 'forecasts',
      isHidden: !regionId,
      // The group is the region: labelled with its name
      titleId: regionId ? `regions.names.${regionId}` : 'navigation.forecasts',
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
  if (item.isExact) return pathname === item.path

  return isUnder(pathname, item.path)
}
