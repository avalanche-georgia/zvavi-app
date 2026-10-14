'use client'

import { DetailsSheet } from '@components/shared'
import { Checkbox } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { MemberApplicationFormData } from './schema'

const CharterSheetButton = ({ chunks }: { chunks: React.ReactNode }) => {
  const t = useTranslations()

  return (
    <DetailsSheet
      title={t('joinUs.apply.charter.drawerTitle')}
      trigger={
        <button className="text-primary underline" type="button">
          {chunks}
        </button>
      }
    >
      <p className="text-sm text-gray-700">{t('joinUs.apply.charter.content')}</p>
    </DetailsSheet>
  )
}

const CharterAgreement = () => {
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
          name="charterAgreed"
          render={({ field }) => (
            <Checkbox
              isChecked={field.value === true}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
        <span className="text-sm">
          {t.rich('joinUs.apply.charter.checkbox', {
            link: (chunks) => <CharterSheetButton chunks={chunks} />,
          })}
        </span>
      </div>
      {errors.charterAgreed && (
        <span className="text-xs text-red-500">
          {t(`common.validation.${errors.charterAgreed.message}`)}
        </span>
      )}
    </div>
  )
}

export default CharterAgreement
