'use client'

import { useBoolean } from '@components/hooks'
import { Button } from '@components/ui'
import { useTranslations } from 'next-intl'

import EmailUpdateForm from './EmailUpdateForm'
import PasswordUpdateForm from './PasswordUpdateForm'

type SecuritySectionProps = {
  email: string
}

const SecuritySection = ({ email }: SecuritySectionProps) => {
  const t = useTranslations()
  const [emailOpen, { setFalse: closeEmail, setTrue: openEmail }] = useBoolean(false)
  const [passwordOpen, { setFalse: closePassword, setTrue: openPassword }] = useBoolean(false)

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="border-b px-4 py-3 md:px-6">
        <h2 className="text-xl font-semibold">{t('admin.profile.security.title')}</h2>
      </div>

      <div className="flex flex-col divide-y p-4 md:p-6">
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('admin.profile.security.labels.email')}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
            {!emailOpen && (
              <Button onClick={openEmail} variant="outline">
                {t('admin.profile.security.actions.changeEmail')}
              </Button>
            )}
          </div>
          {emailOpen && <EmailUpdateForm onClose={closeEmail} />}
        </div>

        <div className="flex flex-col gap-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('common.labels.password')}</p>
              <p className="text-sm text-gray-500">••••••••</p>
            </div>
            {!passwordOpen && (
              <Button onClick={openPassword} variant="outline">
                {t('admin.profile.security.actions.changePassword')}
              </Button>
            )}
          </div>
          {passwordOpen && <PasswordUpdateForm email={email} onCancel={closePassword} />}
        </div>
      </div>
    </div>
  )
}

export default SecuritySection
