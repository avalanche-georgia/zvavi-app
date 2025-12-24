import type { NavMenuItem } from './types'

import { routes } from '@/routes'

// Order is important
export const navMenuItems: NavMenuItem[] = [
  {
    icon: 'mountainSnow',
    id: 'home',
    path: '/',
    titleId: 'navigation.home',
  },
  {
    children: [
      {
        icon: 'snowflake',
        id: 'currentForecast',
        path: routes.currentForecast,
        titleId: 'navigation.currentForecast',
      },
      {
        icon: 'cloudSnow',
        id: 'history',
        path: routes.history,
        titleId: 'navigation.history',
      },
    ],
    icon: 'snowflake',
    id: 'forecasts',
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
    icon: 'userPlus',
    id: 'joinUs',
    path: routes.joinUs,
    titleId: 'navigation.joinUs',
  },
  {
    icon: 'users',
    id: 'about',
    path: routes.about,
    titleId: 'navigation.about',
  },
  {
    icon: 'mail',
    id: 'contact',
    path: routes.contact,
    titleId: 'navigation.contact',
  },
]
