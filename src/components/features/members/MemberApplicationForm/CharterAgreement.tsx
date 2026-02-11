'use client'

import { Checkbox, Drawer } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { MemberApplicationFormData } from './schema'

const CharterDrawerButton = ({ chunks }: { chunks: React.ReactNode }) => {
  const t = useTranslations()

  return (
    <Drawer
      content={<p className="text-sm text-gray-700">{t('joinUs.apply.charter.content')}</p>}
      title={t('joinUs.apply.charter.drawerTitle')}
    >
      <button className="text-primary underline" type="button">
        {chunks}
      </button>
    </Drawer>
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
            // eslint-disable-next-line react/no-unstable-nested-components
            link: (chunks) => <CharterDrawerButton chunks={chunks} />,
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
