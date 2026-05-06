'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import type { Avalanche, RegionId } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import useRecentAvalancheCreateFormSubmit from './hooks/useRecentAvalancheCreateFormSubmit'
import useRecentAvalancheFormSubmit from './hooks/useRecentAvalancheFormSubmit'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { type AvalancheFormSchema, avalancheFormSchema } from './schema'

type EditProps = {
  avalanche: Avalanche & { id: number }
  mode: 'edit'
}

type CreateProps = {
  avalanche?: never
  mode: 'create'
}

type RecentAvalancheFormProps = (EditProps | CreateProps) & {
  onCancel: VoidFunction
  onSuccess: VoidFunction
  regionId: RegionId
}

const RecentAvalancheForm = ({
  avalanche,
  mode,
  onCancel,
  onSuccess,
  regionId,
}: RecentAvalancheFormProps) => {
  const t = useTranslations()

  const form = useForm<AvalancheFormSchema>({
    defaultValues: getInitialFormData(avalanche ?? {}),
    resolver: zodResolver(avalancheFormSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit: handleEditSubmit } = useRecentAvalancheFormSubmit({
    avalancheId: avalanche?.id ?? 0,
    onSuccess,
    regionId,
  })

  const { handleSubmit: handleCreateSubmit } = useRecentAvalancheCreateFormSubmit({
    onSuccess,
    regionId,
  })

  const handleSubmit = mode === 'edit' ? handleEditSubmit : handleCreateSubmit

  const titleKey =
    mode === 'edit' ? 'admin.recentAvalanches.title.edit' : 'admin.recentAvalanches.title.create'

  const regionName = t(`regions.names.${regionId}`)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow-sm">
        <section className="flex w-full flex-col gap-6 p-4 md:p-6">
          <h2 className="text-xl font-semibold">
            {t(titleKey)} — {regionName}
          </h2>

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
