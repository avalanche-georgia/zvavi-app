export const baseUrl = 'https://avalanche.ge'

export const routes = {
  about: {
    aboutUs: '/about/about-us',
    apply: '/about/join-us/apply',
    contact: '/about/contact',
    joinUs: '/about/join-us',
  },
  admin: {
    forecasts: {
      edit: (id: number) => `/admin/forecasts/${id}/edit`,
      listByRegion: (regionId: string) => `/admin/forecasts?regionId=${regionId}`,
      new: '/admin/forecasts/new',
      newInRegion: (regionId: string) => `/admin/forecasts/new?regionId=${regionId}`,
      root: '/admin/forecasts',
    },
    members: {
      edit: (id: string) => `/admin/members/${id}/edit`,
      new: '/admin/members/new',
      root: '/admin/members',
    },
    partners: {
      edit: (id: string) => `/admin/partners/${id}/edit`,
      new: '/admin/partners/new',
      root: '/admin/partners',
    },
    recentAvalanches: {
      edit: (id: number) => `/admin/recent-avalanches/${id}/edit`,
      editInRegion: (id: number, regionId: string) =>
        `/admin/recent-avalanches/${id}/edit?regionId=${regionId}`,
      listByRegion: (regionId: string) => `/admin/recent-avalanches?regionId=${regionId}`,
      new: '/admin/recent-avalanches/new',
      newInRegion: (regionId: string) => `/admin/recent-avalanches/new?regionId=${regionId}`,
      root: '/admin/recent-avalanches',
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
    view: (id: number) => `/forecasts/${id}`,
  },
  home: '/',
  partners: '/partners',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  verify: (code: string) => `/verify/${code}`,
  weatherStations: '/weather-stations',
} as const
