export const baseUrl = 'https://avalanche.ge'

export const routes = {
  about: {
    aboutUs: '/about/about-us',
    contact: '/about/contact',
    joinUs: '/about/join-us',
  },
  admin: {
    forecasts: {
      edit: (id: number) => `/admin/forecasts/${id}/edit`,
      new: '/admin/forecasts/new',
      root: '/admin/forecasts',
    },
    members: {
      edit: (id: string) => `/admin/members/${id}/edit`,
      new: '/admin/members/new',
      root: '/admin/members',
    },
    root: '/admin',
  },
  auth: {
    forgotPassword: '/auth/forgot-password',
    login: '/auth/login',
    setNewPassword: '/auth/set-new-password',
  },
  forecasts: {
    current: '/forecasts/current',
    forecastArea: '/forecasts/forecast-area',
    history: '/forecasts/history',
    root: '/forecasts',
  },
  home: '/',
  partners: '/partners',
  verify: (code: string) => `/verify/${code}`,
  weatherStations: '/weather-stations',
} as const
