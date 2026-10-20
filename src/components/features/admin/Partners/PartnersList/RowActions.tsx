'use client'

import { RecordMenu } from '@components/features/admin/shared'
import type { Partner } from '@domain/types'
import { MenuItem } from '@ds/primitives'
import { ExternalLink, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { usePartnerActions } from '../shared'

type RowActionsProps = {
  onOpen: (id: string) => void
  partner: Partner
}

const RowActions = ({ onOpen, partner }: RowActionsProps) => {
  const t = useTranslations()
  const actions = usePartnerActions(partner)
  const { id, nameEn: name } = partner

  return (
    <div className="flex items-center justify-end">
      <RecordMenu
        deleteMessage={t('admin.partners.deleteMessage', { name })}
        deleteTitle={t('admin.partners.deleteTitle', { name })}
        label={t('admin.partners.actions.moreForPartner', { name })}
        onDelete={actions.onDelete}
      >
        <MenuItem icon={<Pencil />} onClick={() => onOpen(id)}>
          {t('common.actions.edit')}
        </MenuItem>
        <MenuItem icon={<ExternalLink />} onClick={actions.onWebsiteOpen}>
          {t('admin.partners.actions.openWebsite')}
        </MenuItem>
      </RecordMenu>
    </div>
  )
}

export default RowActions
