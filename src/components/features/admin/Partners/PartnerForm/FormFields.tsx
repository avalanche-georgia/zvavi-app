'use client'

import type { PartnerFormData } from '@domain/types'
import { FormCheckbox, FormTextarea, FormTextField, useFormFieldError } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import LogoUpload from './LogoUpload'
import TierField from './TierField'

const fieldGridClasses = 'grid gap-4 @sm:grid-cols-2'

const FormFields = () => {
  const t = useTranslations()
  const logoError = useFormFieldError<PartnerFormData>('logoUrl')
  const labelKey = 'admin.partners.form.labels'
  const optional = t('admin.partners.form.optional')

  return (
    <>
      <FormCard title={t('admin.partners.form.sections.partner')}>
        <div className={fieldGridClasses}>
          <FormTextField<PartnerFormData> label={t(`${labelKey}.nameEn`)} name="nameEn" required />
          <FormTextField<PartnerFormData>
            hint={optional}
            label={t(`${labelKey}.nameKa`)}
            name="nameKa"
          />
        </div>
        <FormTextField<PartnerFormData>
          label={t(`${labelKey}.websiteUrl`)}
          name="websiteUrl"
          placeholder={t('admin.partners.form.placeholders.websiteUrl')}
          required
        />
        <TierField />
        <FormCheckbox<PartnerFormData>
          description={t('admin.partners.form.hints.isActive')}
          label={t(`${labelKey}.isActive`)}
          name="isActive"
        />
      </FormCard>

      <FormCard
        error={logoError}
        required
        requiredText={t('common.validation.required')}
        title={t(`${labelKey}.logo`)}
      >
        <LogoUpload />
      </FormCard>

      <FormCard headerAside={optional} title={t('admin.partners.form.sections.benefit')}>
        <FormTextarea<PartnerFormData> label={t(`${labelKey}.benefitEn`)} name="benefitEn" />
        <FormTextarea<PartnerFormData> label={t(`${labelKey}.benefitKa`)} name="benefitKa" />
      </FormCard>

      <FormCard headerAside={optional} title={t('admin.partners.form.sections.description')}>
        <FormTextarea<PartnerFormData>
          label={t(`${labelKey}.descriptionEn`)}
          name="descriptionEn"
        />
        <FormTextarea<PartnerFormData>
          label={t(`${labelKey}.descriptionKa`)}
          name="descriptionKa"
        />
      </FormCard>
    </>
  )
}

export default FormFields
