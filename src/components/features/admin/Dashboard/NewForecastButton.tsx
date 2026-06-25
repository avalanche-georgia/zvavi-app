'use client'

import { Icon } from '@components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu/DropdownMenu'
import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { actionBaseClass } from './QuickActions'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

const NewForecastButton = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()

  const buttonClass = cn(
    actionBaseClass,
    'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100',
  )

  if (regions.length === 1) {
    return (
      <Link className={buttonClass} href={routes.admin.forecasts.newInRegion(regions[0].id)}>
        <Icon icon="plus" size="sm" />
        {t('admin.dashboard.actions.newForecast')}
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonClass}>
        <Icon icon="plus" size="sm" />
        {t('admin.dashboard.actions.newForecast')}
        <Icon icon="chevronDown" size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {regions.map((region) => (
          <DropdownMenuItem
            key={region.id}
            render={<Link href={routes.admin.forecasts.newInRegion(region.id)} />}
          >
            {t(`regions.names.${region.id}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NewForecastButton
