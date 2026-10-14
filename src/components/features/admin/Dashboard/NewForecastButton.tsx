'use client'

import type { Region } from '@domain/types'
import { Menu, MenuItem } from '@ds/primitives'
import { ChevronDown, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from 'src/i18n/navigation'

import { primaryActionClasses } from './actionClasses'

import { routes } from '@/routes'

// A forecast belongs to a region: with several, a menu asks which one
const NewForecastButton = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()
  const router = useRouter()
  const label = t('admin.dashboard.actions.newForecast')

  if (regions.length === 1) {
    return (
      <Link
        className={primaryActionClasses}
        href={routes.admin.forecasts.newInRegion(regions[0].id)}
      >
        <Plus aria-hidden />
        {label}
      </Link>
    )
  }

  const trigger = (
    <button className={primaryActionClasses} type="button">
      <Plus aria-hidden />
      {label}
      <ChevronDown aria-hidden className="ml-auto" />
    </button>
  )

  return (
    <Menu trigger={trigger}>
      {regions.map(({ id }) => (
        <MenuItem key={id} onClick={() => router.push(routes.admin.forecasts.newInRegion(id))}>
          {t(`regions.names.${id}`)}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default NewForecastButton
