import type { NavMenuItem } from './types'

export const routes = {
  about: '/about',
  admin: '/admin',
  adminForecasts: '/admin/forecasts',
  contact: '/contact',
  currentForecast: '/forecasts/current',
  forecasts: '/forecasts',
  forgotPassword: '/auth/forgot-password',
  joinUs: '/join-us',
  login: '/auth/login',
  partners: '/partners',
  setNewPassword: '/auth/set-new-password',
}

export const navMenuItems: NavMenuItem[] = [
  {
    icon: 'mountainSnow',
    id: 'home',
    path: '/',
    titleId: 'navigation.home',
  },
  {
    icon: 'snowflake',
    id: 'currentForecast',
    path: routes.currentForecast,
    titleId: 'navigation.currentForecast',
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
