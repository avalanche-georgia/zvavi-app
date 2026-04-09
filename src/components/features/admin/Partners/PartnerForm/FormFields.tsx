'use client'

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines*/
import { InputBlock, Select, Switch, Textarea, TextInput } from '@components/ui'
import type { PartnerFormData, PartnerTier } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import LogoUpload from './LogoUpload'

const getTierOptions = (t: ReturnType<typeof useTranslations>) =>
  ([1, 2, 3] as PartnerTier[]).map((tier) => ({
    label: `${tier} - ${t(`partners.levels.${tier}`)}`,
    value: String(tier),
  }))

const FormFields = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<PartnerFormData>()
  const getError = (field: keyof PartnerFormData) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <InputBlock
          error={getError('nameEn')}
          label={t('admin.partners.form.labels.nameEn')}
          required
        >
          <TextInput {...register('nameEn')} />
        </InputBlock>
        <InputBlock error={getError('nameKa')} label={t('admin.partners.form.labels.nameKa')}>
          <TextInput
            {...register('nameKa')}
            placeholder={t('admin.partners.form.placeholders.nameKa')}
          />
        </InputBlock>
        <InputBlock error={getError('benefitEn')} label={t('admin.partners.form.labels.benefitEn')}>
          <Textarea
            {...register('benefitEn')}
            placeholder={t('admin.partners.form.placeholders.benefitEn')}
            rows={3}
          />
        </InputBlock>
        <InputBlock error={getError('benefitKa')} label={t('admin.partners.form.labels.benefitKa')}>
          <Textarea
            {...register('benefitKa')}
            placeholder={t('admin.partners.form.placeholders.benefitKa')}
            rows={3}
          />
        </InputBlock>
        <div className="flex gap-4">
          <InputBlock
            className="flex-1"
            error={getError('logoUrl')}
            hint={t('admin.partners.form.hints.logo')}
            label={t('admin.partners.form.labels.logo')}
            required
          >
            <LogoUpload />
          </InputBlock>

          <InputBlock
            className="flex-1"
            error={getError('tier')}
            label={t('admin.partners.form.labels.tier')}
            required
          >
            <Controller
              control={control}
              name="tier"
              render={({ field }) => (
                <Select
                  hasError={!!errors.tier}
                  onChange={(value) => field.onChange(Number(value) as PartnerTier)}
                  options={getTierOptions(t)}
                  placeholder={t('admin.partners.form.placeholders.tier')}
                  value={field.value ? String(field.value) : undefined}
                />
              )}
            />
          </InputBlock>
        </div>

        <div className="space-y-4">
          <InputBlock
            error={getError('websiteUrl')}
            label={t('admin.partners.form.labels.websiteUrl')}
          >
            <TextInput
              {...register('websiteUrl')}
              placeholder={t('admin.partners.form.placeholders.websiteUrl')}
            />
          </InputBlock>

          <InputBlock error={getError('isActive')} label={t('admin.partners.form.labels.isActive')}>
            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </InputBlock>
        </div>
      </div>
    </>
  )
}

export default FormFields
