'use client'

import { useToast } from '@components/hooks'
import { usePartnerUpdate } from '@data/hooks/partners'
import type { Partner } from '@domain/types'
import { Switch } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Shows / hides a partner on the public site right from its row
const ActiveSwitch = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { isPending, mutate: updatePartner, variables } = usePartnerUpdate()
  const { id, isActive, nameEn: name } = partner
  // Shows the new value at once, locked until the list has it
  const isChecked = isPending && variables?.isActive !== undefined ? variables.isActive : isActive

  const handleCheckedChange = (checked: boolean) => {
    updatePartner(
      { id, isActive: checked },
      {
        onError: (error) => toastError('ActiveSwitch | isActive', { error }),
        onSuccess: () =>
          toastSuccess(
            t(`admin.partners.messages.${checked ? 'activated' : 'deactivated'}`, { name }),
          ),
      },
    )
  }

  return (
    <Switch
      checked={isChecked}
      isBusy={isPending}
      isLabelHidden
      label={t('admin.partners.actions.activeFor', { name })}
      onCheckedChange={handleCheckedChange}
    />
  )
}

export default ActiveSwitch
