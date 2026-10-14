'use client'

import { useState } from 'react'
import { BackLink, FooterConfirm } from '@components/features/admin/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import AvalancheView from './AvalancheView'
import ViewActions from './ViewActions'
import { useAvalancheDelete } from '../hooks'

import { routes } from '@/routes'

// The list this record belongs to: pending submissions live in the queue
const getListHref = ({ regionId, status }: AvalancheListItem) =>
  status === 'pending'
    ? `${routes.admin.observations.root}?regionId=${regionId}`
    : routes.admin.recentAvalanches.listByRegion(regionId)

// Full-page fallback for direct links (notifications, bookmarks) — the lists
// open records in the side panel instead
const AvalancheViewPage = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const router = useRouter()
  const listHref = getListHref(avalanche)

  // Asked in the footer, like in the side panel
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const { handleDelete, isDeleting } = useAvalancheDelete({
    id: avalanche.id,
    onSuccess: () => router.push(listHref),
    regionId: avalanche.regionId,
  })

  const handleDeleteRequest = () => setIsConfirmingDelete(true)
  const handleDeleteCancel = () => setIsConfirmingDelete(false)

  // Editing happens in the list's side panel
  const handleEdit = () => router.push(`${listHref}&selectedId=${avalanche.id}&mode=edit`)

  return (
    <>
      <BackLink href={listHref}>{t('common.actions.backToList')}</BackLink>

      <div className="rounded-card border-rule bg-surface overflow-hidden border">
        <AvalancheView avalanche={avalanche} />
        <footer className="border-rule border-t px-4 py-3">
          {isConfirmingDelete ? (
            <FooterConfirm
              cancelLabel={t('common.actions.cancel')}
              confirmLabel={t('common.actions.delete')}
              isBusy={isDeleting}
              message={t('admin.recentAvalanches.sheet.deleteConfirm')}
              onCancel={handleDeleteCancel}
              onConfirm={handleDelete}
            />
          ) : (
            <ViewActions avalanche={avalanche} onDelete={handleDeleteRequest} onEdit={handleEdit} />
          )}
        </footer>
      </div>
    </>
  )
}

export default AvalancheViewPage
