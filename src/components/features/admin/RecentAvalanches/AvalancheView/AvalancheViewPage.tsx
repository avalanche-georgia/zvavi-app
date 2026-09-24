'use client'

import { ButtonLink } from '@components/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import AvalancheView from './AvalancheView'
import ViewActions from './ViewActions'
import { useAvalancheDeleteDialog } from '../hooks'
import RowDeleteDialog from '../RecentAvalanchesTable/RowDeleteDialog'

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

  const deleteDialog = useAvalancheDeleteDialog({
    id: avalanche.id,
    onSuccess: () => router.push(listHref),
    regionId: avalanche.regionId,
  })

  const handleEdit = () => router.push(routes.admin.recentAvalanches.edit(avalanche.id))

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <ButtonLink href={listHref} variant="outline">
        {t('common.actions.backToList')}
      </ButtonLink>

      <div className="rounded-lg bg-white shadow-sm">
        <AvalancheView avalanche={avalanche} />
        <footer className="border-t px-4 py-3">
          <ViewActions
            avalanche={avalanche}
            onDelete={deleteDialog.openDialog}
            onEdit={handleEdit}
          />
        </footer>
      </div>

      <RowDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDialog}
        onConfirm={deleteDialog.handleDelete}
      />
    </div>
  )
}

export default AvalancheViewPage
