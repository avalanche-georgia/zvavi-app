import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { usePartnerDelete } from '@data/hooks/partners'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'

import { routes } from '@/routes'

const PartnerItem = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { mutateAsync: deletePartner } = usePartnerDelete()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    try {
      await deletePartner(partner.id)
      toastSuccess(t('admin.partners.messages.deleted'))
    } catch (error) {
      toastError('PartnerItem | handleDelete', { error })
    }
  }

  const benefit = partner.benefitEn ?? '-'

  return (
    <>
      <div className="flex h-12 items-center gap-4 px-4">
        <div className="w-68 shrink-0">{partner.nameEn}</div>
        <div className="min-w-40 flex-1 truncate text-sm text-gray-600">{benefit}</div>
        <div className="shrink-0">
          <span
            className={
              partner.isActive
                ? 'rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700'
                : 'rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500'
            }
          >
            {partner.isActive
              ? t('admin.members.statuses.active')
              : t('admin.members.statuses.inactive')}
          </span>
        </div>
        <div className="w-24 shrink-0">
          <ActionButtons
            editHref={routes.admin.partners.edit(partner.id)}
            onDelete={openDeletionDialog}
          />
        </div>
      </div>

      <ConfirmationDialog
        description={t('admin.partners.deleteModal.description', { name: partner.nameEn })}
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.partners.deleteModal.title')}
        variant="delete"
      />
    </>
  )
}

export default PartnerItem
