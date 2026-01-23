'use client'

/* eslint-disable react/jsx-props-no-spreading, max-lines */

import { DatePicker, InputBlock, Select, Textarea, TextInput, toOptions } from '@components/ui'
import { memberStatuses } from '@domain/constants'
import type { MemberFormData, MemberStatus } from '@domain/types'
import { startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

const FormFields = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<MemberFormData>()
  const joinedAt = useWatch({ control, name: 'joinedAt' })
  const statusOptions = toOptions(memberStatuses, (key) => t(`admin.members.statuses.${key}`))
  const getError = (field: keyof MemberFormData) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined
  const today = startOfDay(new Date())

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <InputBlock
          error={getError('firstName')}
          label={t('admin.members.form.labels.firstName')}
          required
        >
          <TextInput {...register('firstName')} />
        </InputBlock>
        <InputBlock
          error={getError('lastName')}
          label={t('admin.members.form.labels.lastName')}
          required
        >
          <TextInput {...register('lastName')} />
        </InputBlock>
        <InputBlock error={getError('email')} label={t('admin.members.form.labels.email')}>
          <TextInput {...register('email')} type="email" />
        </InputBlock>
        <InputBlock error={getError('phone')} label={t('admin.members.form.labels.phone')}>
          <TextInput {...register('phone')} />
        </InputBlock>
        <InputBlock error={getError('memberId')} label={t('admin.members.form.labels.memberId')}>
          <TextInput
            {...register('memberId')}
            placeholder={t('admin.members.form.placeholders.memberId')}
          />
        </InputBlock>
        <InputBlock error={getError('status')} label={t('admin.members.form.labels.status')}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                onChange={(value) => field.onChange(value as MemberStatus)}
                options={statusOptions}
                value={field.value}
              />
            )}
          />
        </InputBlock>
        <InputBlock
          error={getError('joinedAt')}
          label={t('admin.members.form.labels.joinedAt')}
          required
        >
          <Controller
            control={control}
            name="joinedAt"
            render={({ field }) => (
              <DatePicker
                maxDate={today}
                onChange={(date) => field.onChange(date)}
                value={field.value}
              />
            )}
          />
        </InputBlock>
        <InputBlock error={getError('expiresAt')} label={t('admin.members.form.labels.expiresAt')}>
          <Controller
            control={control}
            name="expiresAt"
            render={({ field }) => (
              <DatePicker
                isClearable
                minDate={joinedAt ? startOfDay(joinedAt) : undefined}
                onChange={(date) => field.onChange(date)}
                placeholder={t('admin.members.form.placeholders.expiresAt')}
                value={field.value}
              />
            )}
          />
        </InputBlock>
      </div>
      <InputBlock error={getError('notes')} label={t('admin.members.form.labels.notes')}>
        <Textarea
          {...register('notes')}
          placeholder={t('admin.members.form.placeholders.notes')}
          rows={3}
        />
      </InputBlock>
    </>
  )
}

export default FormFields
