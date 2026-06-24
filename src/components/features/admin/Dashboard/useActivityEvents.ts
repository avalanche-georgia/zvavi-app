import type { IconName } from '@components/icons/types'
import { useCurrentForecastsPerRegion } from '@data/hooks/forecasts'
import { useMembersQuery } from '@data/hooks/members'
import { useAvalanchesPerRegion } from '@data/hooks/recentAvalanches'
import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'

export type ActivityItem = {
  at: Date
  icon: IconName
  label: string
}

type ActivityEventsResult = {
  events: ActivityItem[]
  isPending: boolean
}

const useActivityEvents = (regions: Region[]): ActivityEventsResult => {
  const t = useTranslations()
  const { data: members, isPending: isMembersPending } = useMembersQuery()
  const forecastQueries = useCurrentForecastsPerRegion(regions)
  const avalancheQueries = useAvalanchesPerRegion(regions)

  const isPending =
    isMembersPending ||
    forecastQueries.some((query) => query.isPending) ||
    avalancheQueries.some((query) => query.isPending)

  const events: ActivityItem[] = []

  forecastQueries.forEach((query, index) => {
    const forecast = query.data

    if (!forecast?.publishedAt) return

    const region = regions[index]

    events.push({
      at: new Date(forecast.publishedAt),
      icon: 'circleCheck',
      label: t('admin.dashboard.activity.forecastPublished', {
        region: t(`regions.names.${region.id}`),
      }),
    })
  })

  avalancheQueries.forEach((query, index) => {
    const createdAt = query.data?.avalanches[0]?.createdAt

    if (!createdAt) return

    const region = regions[index]

    events.push({
      at: new Date(createdAt),
      icon: 'triangleAlert',
      label: t('admin.dashboard.activity.avalancheLogged', {
        region: t(`regions.names.${region.id}`),
      }),
    })
  })

  const latestPending = members?.find((member) => member.status === 'pending')

  if (latestPending) {
    events.push({
      at: new Date(latestPending.createdAt),
      icon: 'userPlus',
      label: t('admin.dashboard.activity.newMemberRequest', {
        name: `${latestPending.firstName} ${latestPending.lastName}`,
      }),
    })
  }

  return {
    events: events.sort((eventA, eventB) => eventB.at.getTime() - eventA.at.getTime()).slice(0, 4),
    isPending,
  }
}

export default useActivityEvents
