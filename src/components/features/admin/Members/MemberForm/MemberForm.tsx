'use client'

import { Button } from '@components/ui'
import type { Member, MemberFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useMemberFormState, useMemberFormSubmit } from './hooks'

import FormFields from './FormFields'
import QRCodeSection from './QRCodeSection'

type MemberFormProps = {
  initialFormData: MemberFormData
  member?: Member
  onCancel: VoidFunction
  onSuccess: VoidFunction
}

const MemberForm = ({ initialFormData, member, onCancel, onSuccess }: MemberFormProps) => {
  const t = useTranslations()

  const { formData, handleFieldChange, handleTextFieldChange } = useMemberFormState(initialFormData)
  const { handleSubmit } = useMemberFormSubmit({ formData, memberId: member?.id, onSuccess })

  return (
    <div className="rounded-lg bg-white shadow">
      <section className="flex w-full flex-col gap-6 p-4 md:p-6">
        <h2 className="text-xl font-semibold">
          {member ? t('admin.members.title.edit') : t('admin.members.title.create')}
        </h2>

        <form className="flex w-full flex-col gap-6">
          <FormFields
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleTextFieldChange={handleTextFieldChange}
          />
          {member && <QRCodeSection member={member} />}
        </form>
      </section>

      <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
        <Button onClick={onCancel} variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button onClick={handleSubmit}>{t('common.actions.submit')}</Button>
      </footer>
    </div>
  )
}

export default MemberForm
