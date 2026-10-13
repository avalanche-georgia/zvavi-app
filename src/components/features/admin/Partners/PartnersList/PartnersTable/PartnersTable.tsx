'use client'

import { ListEmptyState, useDataTableLabels } from '@components/features/admin/shared'
import type { Partner } from '@domain/types'
import { DataTable } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { partnerColumns } from './columns'
import PartnerCard from './PartnerCard'
import { PartnersTableContext } from './PartnersTableContext'
import type { PartnersListState } from '../hooks'

type PartnersTableProps = {
  hasPartners: boolean
  isLoading: boolean
  list: PartnersListState
  onPartnerOpen: (id: string) => void
  partners: Partner[]
}

const getRowId = ({ id }: Partner) => id
const renderCard = (partner: Partner) => <PartnerCard partner={partner} />

const PartnersTable = ({
  hasPartners,
  isLoading,
  list,
  onPartnerOpen,
  partners,
}: PartnersTableProps) => {
  const t = useTranslations()
  const labels = useDataTableLabels()

  // Filters hide every row vs. there are no partners at all
  const empty = hasPartners ? (
    <ListEmptyState
      hint={t('admin.partners.empty.noMatchesHint')}
      onFiltersClear={list.onFiltersClear}
      title={t('admin.partners.empty.noMatchesTitle')}
    />
  ) : (
    <ListEmptyState
      hint={t('admin.partners.empty.noPartnersHint')}
      title={t('admin.partners.empty.noPartnersTitle')}
    />
  )

  return (
    <PartnersTableContext value={{ onPartnerOpen }}>
      <DataTable
        ariaLabel={t('admin.partners.list.ariaLabel')}
        columns={partnerColumns}
        data={partners}
        empty={empty}
        getRowId={getRowId}
        isLoading={isLoading}
        labels={labels}
        onPageChange={list.onPageChange}
        onSortChange={list.onSortChange}
        pageIndex={list.pageIndex}
        renderCard={renderCard}
        sort={{ desc: list.desc, id: list.sortKey }}
      />
    </PartnersTableContext>
  )
}

export default PartnersTable
