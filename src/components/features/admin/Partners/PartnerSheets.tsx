'use client'

import { useState } from 'react'
import { FormSheet } from '@components/features/admin/shared'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import { PartnerForm } from './PartnerForm'

type PartnerSheetsProps = {
  isCreateRequested: boolean
  onCreateClose: VoidFunction
  onEditClose: VoidFunction
  // The partner being edited, once found in the list
  partner: Partner | null
}

// Adding and editing a partner: the same form, each in its own sheet
const PartnerSheets = ({
  isCreateRequested,
  onCreateClose,
  onEditClose,
  partner,
}: PartnerSheetsProps) => {
  const t = useTranslations()
  // Keeps the form rendered while the edit sheet animates closed
  const [shownPartner, setShownPartner] = useState(partner)

  if (partner && partner !== shownPartner) setShownPartner(partner)

  return (
    <>
      <FormSheet
        isRequested={isCreateRequested}
        onClose={onCreateClose}
        title={t('admin.partners.title.create')}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {(form) => <PartnerForm {...form} />}
      </FormSheet>
      <FormSheet
        isRequested={partner !== null}
        onClose={onEditClose}
        title={shownPartner?.nameEn ?? ''}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {(form) => shownPartner && <PartnerForm {...form} partner={shownPartner} />}
      </FormSheet>
    </>
  )
}

export default PartnerSheets
