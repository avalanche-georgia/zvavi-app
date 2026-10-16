'use client'

import { useEffect } from 'react'
import { memberStatuses, serverDateFormat } from '@domain/constants'
import type { MemberFormData } from '@domain/types'
import { FormDateField, FormSelect, FormTextarea, FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { fieldGridClasses } from './constants'

import PersonSection from './PersonSection'

const FormFields = () => {
  const t = useTranslations()
  const { control, formState, trigger } = useFormContext<MemberFormData>()
  const [joinedAt, expiresAt] = useWatch({ control, name: ['joinedAt', 'expiresAt'] })
  const isExpiryEdited = !!formState.dirtyFields.expiresAt

  const statusOptions = Object.values(memberStatuses).map((status) => ({
    label: t(`admin.members.statuses.${status}`),
    value: status,
  }))

  // An active member can't have a past expiry — the rule sits on the status field,
  // so re-check it when the date changes
  useEffect(() => {
    if (isExpiryEdited) void trigger(['expiresAt', 'status'])
  }, [expiresAt, isExpiryEdited, trigger])

  return (
    <>
      <PersonSection />

      <FormCard title={t('admin.members.form.sections.membership')}>
        <div className={fieldGridClasses}>
          <FormTextField<MemberFormData>
            autoComplete="off"
            label={t('admin.members.form.labels.memberId')}
            name="memberId"
            placeholder={t('admin.members.form.placeholders.memberId')}
          />
          <FormSelect<MemberFormData, MemberFormData['status']>
            label={t('admin.members.form.labels.status')}
            name="status"
            options={statusOptions}
          />
          <FormDateField<MemberFormData>
            label={t('admin.members.form.labels.joinedAt')}
            max={format(new Date(), serverDateFormat)}
            name="joinedAt"
            required
          />
          <FormDateField<MemberFormData>
            description={t('admin.members.form.hints.expiresAt')}
            label={t('admin.members.form.labels.expiresAt')}
            min={joinedAt ? format(joinedAt, serverDateFormat) : undefined}
            name="expiresAt"
          />
        </div>
      </FormCard>

      <FormCard
        headerAside={t('admin.members.form.hints.notes')}
        title={t('admin.members.form.labels.notes')}
      >
        <FormTextarea<MemberFormData>
          isLabelHidden
          label={t('admin.members.form.labels.notes')}
          name="notes"
          placeholder={t('admin.members.form.placeholders.notes')}
        />
      </FormCard>
    </>
  )
}

export default FormFields
