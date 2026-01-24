'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import type { Member, MemberFormData } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { useMemberFormSubmit } from './hooks'

import FormFields from './FormFields'
import QRCodeSection from './QRCodeSection'
import { memberFormSchema } from './schema'

type MemberFormProps = {
  initialFormData: MemberFormData
  member?: Member
  onCancel: VoidFunction
  onSuccess: (createdMember?: Member) => void
}

const MemberForm = ({ initialFormData, member, onCancel, onSuccess }: MemberFormProps) => {
  const t = useTranslations()

  const form = useForm<MemberFormData>({
    defaultValues: initialFormData,
    resolver: zodResolver(memberFormSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = useMemberFormSubmit({ memberId: member?.id, onSuccess })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow">
        <section className="flex w-full flex-col gap-6 p-4 md:p-6">
          <h2 className="text-xl font-semibold">
            {member ? t('admin.members.title.edit') : t('admin.members.title.create')}
          </h2>

          <form className="flex w-full flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormFields />
            {member && <QRCodeSection member={member} />}
          </form>
        </section>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>{t('common.actions.submit')}</Button>
        </footer>
      </div>
    </FormProvider>
  )
}

export default MemberForm
