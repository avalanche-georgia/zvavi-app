'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import type { Avalanche } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import useRecentAvalancheFormSubmit from './hooks/useRecentAvalancheFormSubmit'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { type AvalancheFormSchema, avalancheFormSchema } from './schema'

type RecentAvalancheFormProps = {
  avalanche: Avalanche & { id: number }
  onCancel: VoidFunction
  onSuccess: VoidFunction
}

const RecentAvalancheForm = ({ avalanche, onCancel, onSuccess }: RecentAvalancheFormProps) => {
  const t = useTranslations()

  const form = useForm<AvalancheFormSchema>({
    defaultValues: getInitialFormData(avalanche),
    resolver: zodResolver(avalancheFormSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = useRecentAvalancheFormSubmit({
    avalancheId: avalanche.id,
    onSuccess,
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow-sm">
        <section className="flex w-full flex-col gap-6 p-4 md:p-6">
          <h2 className="text-xl font-semibold">{t('admin.recentAvalanches.title.edit')}</h2>

          <form className="flex w-full flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormFields />
          </form>
        </section>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>{t('common.actions.save')}</Button>
        </footer>
      </div>
    </FormProvider>
  )
}

export default RecentAvalancheForm
