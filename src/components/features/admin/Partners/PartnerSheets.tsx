'use client'

import { CreateEditSheets, type FormSheetFormProps } from '@components/features/admin/shared'
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

const getEditTitle = ({ nameEn }: Partner) => nameEn

const renderForm = (form: FormSheetFormProps, partner?: Partner) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PartnerForm {...form} partner={partner} />
)

const PartnerSheets = ({
  isCreateRequested,
  onCreateClose,
  onEditClose,
  partner,
}: PartnerSheetsProps) => {
  const t = useTranslations()

  return (
    <CreateEditSheets
      createTitle={t('admin.partners.title.create')}
      getEditTitle={getEditTitle}
      isCreateRequested={isCreateRequested}
      onCreateClose={onCreateClose}
      onEditClose={onEditClose}
      record={partner}
      renderForm={renderForm}
    />
  )
}

export default PartnerSheets
