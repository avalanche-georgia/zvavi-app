'use client'

import { Checkbox } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'
import { Link } from 'src/i18n/navigation'

import type { MemberApplicationFormData } from './schema'

import { routes } from '@/routes'

const PrivacyConsent = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
  } = useFormContext<MemberApplicationFormData>()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <Controller
          control={control}
          name="privacyAgreed"
          render={({ field }) => (
            <Checkbox
              isChecked={field.value === true}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
        <span className="text-sm">
          {t.rich('legal.consent.checkbox', {
            link: (chunks) => (
              <Link className="text-primary underline" href={routes.privacy} target="_blank">
                {chunks}
              </Link>
            ),
            link2: (chunks) => (
              <Link className="text-primary underline" href={routes.terms} target="_blank">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </div>
      {errors.privacyAgreed && (
        <span className="text-xs text-red-500">
          {t(`common.validation.${errors.privacyAgreed.message}`)}
        </span>
      )}
    </div>
  )
}

export default PrivacyConsent
