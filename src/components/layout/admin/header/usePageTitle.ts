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

export const usePageTitle = (pathname: string): string => {
  const t = useTranslations()
  const segments = pathname.split('/').filter(Boolean)
  const config = sectionTitles[segments[1]]

  const searchParams = useSearchParams()
  const regionId = searchParams.get('regionId') as RegionId | null
  const regionSuffix = regionId ? `— ${t(`regions.names.${regionId}`)}` : ''

  if (!config) return t('admin.title')

  const last = segments.at(-1)

  if (last === 'new' && config.create) return `${t(config.create)} ${regionSuffix}`
  if (last === 'edit' && config.edit) return `${t(config.edit)} ${regionSuffix}`

  return t(config.main)
}
