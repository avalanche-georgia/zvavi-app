'use client'

import { useState } from 'react'
import { AvalancheSheet } from '@components/features/admin/RecentAvalanches'
import { RecordEditNote, ViewAvalancheItem } from '@components/features/forecasts/LinkedAvalanches'
import { useLinkableAvalanchesQuery } from '@data/hooks/recentAvalanches'
import { forecastsKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import CardCount from './CardCount'

type AvalanchesCardProps = {
  avalancheIds: number[]
  regionId: RegionId
}

const AvalanchesCard = ({ avalancheIds, regionId }: AvalanchesCardProps) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const [openId, setOpenId] = useState<number | null>(null)
  const { data: avalanches = [], isPending } = useLinkableAvalanchesQuery({ regionId })

  const openRecord = avalanches.find((avalanche) => avalanche.id === openId)
  // Linked but still under review (hidden on the public forecast)
  const pendingCount = avalanches.filter(
    (avalanche) => avalanche.status === 'pending' && avalancheIds.includes(avalanche.id),
  ).length

  const handleSheetClose = () => setOpenId(null)
  const handleDeleted = () => void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })

  return (
    <FormCard
      title={t('admin.forecast.editor.avalanches.title')}
      titleTag={<CardCount count={avalancheIds.length} pendingCount={pendingCount} />}
    >
      {avalancheIds.length === 0 ? (
        <p className="text-copy text-placeholder italic">
          {t('admin.forecasts.view.noAvalanches')}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {avalancheIds.map((id) => (
            <li key={id}>
              <ViewAvalancheItem
                id={id}
                isListPending={isPending}
                listed={avalanches.find((avalanche) => avalanche.id === id)}
                onView={() => setOpenId(id)}
              />
            </li>
          ))}
        </ul>
      )}
      <AvalancheSheet
        editNote={openId !== null && <RecordEditNote id={openId} record={openRecord} />}
        editSaveLabel={t('admin.forecast.editor.avalanches.sheet.saveRecord')}
        id={openId}
        initialMode="view"
        onClose={handleSheetClose}
        onDeleted={handleDeleted}
        onReopen={setOpenId}
        regionId={regionId}
      />
    </FormCard>
  )
}

export default AvalanchesCard
