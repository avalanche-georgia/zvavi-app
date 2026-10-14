export const baseUrl = 'https://avalanche.ge'

export const routes = {
  about: {
    aboutUs: '/about/about-us',
    apply: '/about/join-us/apply',
    contact: '/about/contact',
    joinUs: '/about/join-us',
  },
  admin: {
    designSystem: '/admin/ds',
    forecasts: {
      duplicateInRegion: (id: number, regionId: string) =>
        `/admin/forecasts/new?regionId=${regionId}&duplicateId=${id}`,
      edit: (id: number) => `/admin/forecasts/${id}/edit`,
      // from=view: Cancel / Save & close return to the forecast's view page
      editInRegion: (id: number, regionId: string, from?: 'view') =>
        `/admin/forecasts/${id}/edit?regionId=${regionId}${from ? `&from=${from}` : ''}`,
      listByRegion: (regionId: string) => `/admin/forecasts?regionId=${regionId}`,
      new: '/admin/forecasts/new',
      newInRegion: (regionId: string) => `/admin/forecasts/new?regionId=${regionId}`,
      root: '/admin/forecasts',
      view: (id: number) => `/admin/forecasts/${id}`,
    },
    members: {
      // The list with its create sheet open
      create: '/admin/members?create=1',
      // Applications waiting for approval
      pending: '/admin/members?status=pending',
      root: '/admin/members',
      // The list with the member's sheet open
      view: (id: string) => `/admin/members?member=${id}`,
    },
    observations: {
      root: '/admin/observations',
    },
    partners: {
      // The list with its create sheet open
      create: '/admin/partners?create=1',
      // The list with the partner's edit sheet open
      edit: (id: string) => `/admin/partners?partner=${id}`,
      root: '/admin/partners',
    },
    profile: '/admin/profile',
    recentAvalanches: {
      // The list with its create panel open
      create: '/admin/recent-avalanches?create=1',
      listByRegion: (regionId: string) => `/admin/recent-avalanches?regionId=${regionId}`,
      // Full-page create — kept for direct links; the list uses its panel
      newInRegion: (regionId: string) => `/admin/recent-avalanches/new?regionId=${regionId}`,
      root: '/admin/recent-avalanches',
      view: (id: number) => `/admin/recent-avalanches/${id}`,
    },
    root: '/admin',
    weatherStations: {
      root: '/admin/weather-stations',
    },
  },
  auth: {
    forgotPassword: '/auth/forgot-password',
    login: '/auth/login',
    setNewPassword: '/auth/set-new-password',
  },
  forecastsByRegion: (regionId: string) => ({
    current: `/${regionId}/forecasts/current`,
    forecastArea: `/${regionId}/forecast-area`,
    history: `/${regionId}/forecasts/history`,
    root: `/${regionId}/forecasts`,
    view: (id: number) => `/${regionId}/forecasts/${id}`,
  }),
  home: '/',
  observationsByRegion: (regionId: string) => ({
    root: `/${regionId}/observations`,
    submit: `/${regionId}/observations/submit`,
  }),
  partners: '/partners',
  privacy: '/privacy-policy',
  regionHome: (regionId: string) => `/${regionId}`,
  terms: '/terms-of-service',
  verify: (code: string) => `/verify/${code}`,
  weatherStations: '/weather-stations',
} as const
