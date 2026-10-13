'use client'

import { useToast } from '@components/hooks'
import { usePartnerDelete } from '@data/hooks/partners'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

// What can be done with a partner from its row menu
const usePartnerActions = ({ id, websiteUrl }: Pick<Partner, 'id' | 'websiteUrl'>) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: deletePartner } = usePartnerDelete()

  const handleDelete = async () => {
    try {
      await deletePartner(id)
      toastSuccess(t('admin.partners.messages.deleted'))
    } catch (error) {
      toastError('usePartnerActions | handleDelete', { error })
    }
  }

  return {
    onDelete: handleDelete,
    onWebsiteOpen: () => void window.open(websiteUrl, '_blank', 'noopener'),
  }
}

export default usePartnerActions
