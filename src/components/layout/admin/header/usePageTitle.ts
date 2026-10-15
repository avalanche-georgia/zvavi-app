import type { RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
  members: { main: 'admin.sidebar.members' },
  observations: { main: 'admin.sidebar.observations' },
  partners: { main: 'admin.sidebar.partners' },
  profile: { main: 'admin.profile.title' },
  'recent-avalanches': {
    create: 'admin.recentAvalanches.title.create',
    edit: 'admin.recentAvalanches.title.edit',
    main: 'admin.recentAvalanches.title.list',
  },
  team: { main: 'admin.sidebar.team' },
  'weather-stations': { main: 'admin.weatherStations.title' },
}

export const usePageTitle = (pathname: string): string => {
  const t = useTranslations()
  const segments = pathname.split('/').filter(Boolean)
  const config = sectionTitles[segments[1]]

  const searchParams = useSearchParams()
  const regionId = searchParams.get('regionId') as RegionId | null
  const regionSuffix = regionId ? `— ${t(`regions.names.${regionId}`)}` : ''

  // /admin itself is the overview
  if (!segments[1]) return t('admin.dashboard.title')
  if (!config) return t('admin.title')

  const last = segments.at(-1)

  if (last === 'new' && config.create) return `${t(config.create)} ${regionSuffix}`
  if (last === 'edit' && config.edit) return `${t(config.edit)} ${regionSuffix}`

  return t(config.main)
}
