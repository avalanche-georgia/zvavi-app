'use client'

/* eslint-disable react/jsx-props-no-spreading */

import { InputBlock, Textarea, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import type { MemberApplicationFormData } from './schema'

const FormFields = () => {
  const t = useTranslations()
  const {
    formState: { errors },
    register,
  } = useFormContext<MemberApplicationFormData>()

  const getError = (field: keyof MemberApplicationFormData) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <InputBlock error={getError('fullName')} label={t('joinUs.apply.labels.fullName')} required>
          <TextInput {...register('fullName')} />
        </InputBlock>
        <InputBlock error={getError('email')} label={t('joinUs.apply.labels.email')} required>
          <TextInput {...register('email')} type="email" />
        </InputBlock>
        <InputBlock error={getError('phone')} label={t('joinUs.apply.labels.phone')} required>
          <TextInput {...register('phone')} />
        </InputBlock>
        <InputBlock error={getError('address')} label={t('joinUs.apply.labels.address')}>
          <TextInput
            {...register('address')}
            placeholder={t('joinUs.apply.placeholders.address')}
          />
        </InputBlock>
      </div>
      <InputBlock
        error={getError('occupation')}
        label={t('joinUs.apply.labels.occupation')}
        required
      >
        <TextInput {...register('occupation')} />
      </InputBlock>
      <InputBlock
        error={getError('motivation')}
        label={t('joinUs.apply.labels.motivation')}
        required
      >
        <Textarea
          {...register('motivation')}
          placeholder={t('joinUs.apply.placeholders.motivation')}
          rows={4}
        />
      </InputBlock>
    </>
  )
}

export default FormFields
