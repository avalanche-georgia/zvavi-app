'use client'

import { useState } from 'react'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { Spinner } from '@components/ui'
import { usePublicObservationsQuery } from '@data/hooks/observations'
import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

import ObservationCard from './ObservationCard'
import ObservationsEmptyState from './ObservationsEmptyState'
import ObservationsFilters from './ObservationsFilters'

import { routes } from '@/routes'

const ObservationsContent = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)

  const { data: observations, isPending } = usePublicObservationsQuery({
    dateFrom: dateFrom?.toISOString(),
    dateTo: dateTo?.toISOString(),
    regionId: region!.id,
  })

  const handleFiltersReset = () => {
    setDateFrom(null)
    setDateTo(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <ButtonLink
        className="max-w-none justify-center py-3"
        href={routes.observationsByRegion(region!.id).submit}
      >
        <Icon icon="plus" size="sm" />
        {t('observations.submitCta')}
      </ButtonLink>

      <ObservationsFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onReset={handleFiltersReset}
      />

      {isPending ? (
        <Spinner label={t('common.labels.wait')} size="lg" />
      ) : !observations || observations.length === 0 ? (
        <ObservationsEmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {observations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ObservationsContent
