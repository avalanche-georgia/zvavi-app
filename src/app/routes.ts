export const baseUrl = 'https://avalanche.ge'

export const routes = {
  about: {
    aboutUs: '/about/about-us',
    contact: '/about/contact',
    joinUs: '/about/join-us',
  },
  admin: {
    forecasts: '/admin/forecasts',
    root: '/admin',
  },
  auth: {
    forgotPassword: '/auth/forgot-password',
    login: '/auth/login',
    setNewPassword: '/auth/set-new-password',
  },
  forecasts: {
    current: '/forecasts/current',
    history: '/forecasts/history',
    root: '/forecasts',
  },
  home: '/',
  partners: '/partners',
  weatherStations: '/weather-stations',
} as const
