'use client'

import { ListEmptyState, useDataTableLabels } from '@components/features/admin/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { DataTable } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import AvalancheCard from './AvalancheCard'
import { AvalanchesTableContext } from './AvalanchesTableContext'
import { avalancheColumns } from './columns'
import { type AvalanchesListPage, pageSize } from '../hooks/useAvalanchesListPage'
import type { AvalanchesListVariant, OnAvalancheOpen } from '../types'

type AvalanchesTableProps = {
  onAvalancheOpen: OnAvalancheOpen
  page: AvalanchesListPage
  regionId: RegionId
  variant: AvalanchesListVariant
}

const getRowId = ({ id }: AvalancheListItem) => String(id)

const AvalanchesTable = ({ onAvalancheOpen, page, regionId, variant }: AvalanchesTableProps) => {
  const t = useTranslations()
  const labels = useDataTableLabels()
  const regionName = t(`regions.names.${regionId}`)
  const emptyKey = variant === 'queue' ? 'admin.observations.queue' : 'admin.recentAvalanches.empty'

  const renderCard = (avalanche: AvalancheListItem) => (
    <AvalancheCard avalanche={avalanche} variant={variant} />
  )

  // Filters hide every row vs. nothing to show at all
  const empty = page.hasFilters ? (
    <ListEmptyState
      hint={t('admin.recentAvalanches.empty.noMatchesHint')}
      onFiltersClear={page.onFiltersClear}
      title={t('admin.recentAvalanches.empty.noMatchesTitle')}
    />
  ) : (
    <ListEmptyState
      hint={t(`${emptyKey}.emptyHint`)}
      title={t(`${emptyKey}.emptyTitle`, { region: regionName })}
    />
  )

  return (
    <AvalanchesTableContext value={{ onAvalancheOpen, regionId }}>
      <DataTable
        ariaLabel={t(`admin.recentAvalanches.list.ariaLabel.${variant}`, { region: regionName })}
        columns={avalancheColumns[variant]}
        data={page.avalanches}
        empty={empty}
        getRowId={getRowId}
        isLoading={page.query.isPending}
        labels={labels}
        onPageChange={page.onPageChange}
        pageIndex={page.pageIndex}
        pageSize={pageSize}
        renderCard={renderCard}
        rowCount={page.totalCount}
      />
    </AvalanchesTableContext>
  )
}

export default AvalanchesTable
