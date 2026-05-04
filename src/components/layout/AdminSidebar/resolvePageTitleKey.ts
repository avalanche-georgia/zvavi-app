type SectionTitles = {
  create?: string
  edit?: string
  main: string
}

const sectionTitles: Record<string, SectionTitles> = {
  forecasts: {
    create: 'admin.forecast.title.create',
    edit: 'admin.forecast.title.edit',
    main: 'admin.forecasts.title',
  },
  members: {
    create: 'admin.members.title.create',
    edit: 'admin.members.title.edit',
    main: 'admin.sidebar.members',
  },
  partners: {
    create: 'admin.partners.title.create',
    edit: 'admin.partners.title.edit',
    main: 'admin.sidebar.partners',
  },
  'recent-avalanches': {
    create: 'admin.recentAvalanches.title.create',
    edit: 'admin.recentAvalanches.title.edit',
    main: 'admin.recentAvalanches.title.list',
  },
}

export const resolvePageTitleKey = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean)
  const config = sectionTitles[segments[1]]

  if (!config) return 'admin.title'

  const last = segments.at(-1)

  if (last === 'new' && config.create) return config.create
  if (last === 'edit' && config.edit) return config.edit

  return config.main
}
