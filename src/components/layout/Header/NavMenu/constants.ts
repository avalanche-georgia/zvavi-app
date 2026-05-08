import type { NavMenuItem } from './types'

import { routes } from '@/routes'

// Order is important
export const getNavMenuItems = (regionId: string | null): NavMenuItem[] => [
  {
    icon: 'mountainSnow',
    id: 'home',
    path: routes.home,
    titleId: 'navigation.home',
  },
  {
    children: [
      {
        icon: 'snowflake',
        id: 'currentForecast',
        path: routes.forecastsByRegion(regionId ?? '').current,
        titleId: 'navigation.currentForecast',
      },
      {
        icon: 'mapPinned',
        id: 'forecastArea',
        path: routes.forecastsByRegion(regionId ?? '').forecastArea,
        titleId: 'navigation.forecastArea',
      },
      {
        icon: 'cloudSnow',
        id: 'history',
        path: routes.forecastsByRegion(regionId ?? '').history,
        titleId: 'navigation.history',
      },
    ],
    icon: 'snowflake',
    id: 'forecasts',
    isHidden: !regionId,
    titleId: 'navigation.forecasts',
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
