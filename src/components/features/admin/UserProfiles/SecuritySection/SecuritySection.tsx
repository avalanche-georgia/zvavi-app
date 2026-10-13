'use client'

import { useBoolean } from '@components/hooks'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import EmailUpdateForm from './EmailUpdateForm'
import PasswordUpdateForm from './PasswordUpdateForm'
import SecurityRow from './SecurityRow'

const maskedPassword = '••••••••'

// Sign-in email and password, each changed in place
const SecuritySection = ({ email }: { email: string }) => {
  const t = useTranslations()
  const [isEmailOpen, { setFalse: closeEmail, setTrue: openEmail }] = useBoolean(false)
  const [isPasswordOpen, { setFalse: closePassword, setTrue: openPassword }] = useBoolean(false)

  return (
    <FormCard className="@container" title={t('admin.profile.security.title')}>
      <div>
        <SecurityRow
          changeLabel={t('admin.profile.security.actions.changeEmail')}
          isOpen={isEmailOpen}
          label={t('admin.profile.security.labels.email')}
          onOpen={openEmail}
          value={email}
        >
          <EmailUpdateForm onClose={closeEmail} />
        </SecurityRow>
        <SecurityRow
          changeLabel={t('admin.profile.security.actions.changePassword')}
          isOpen={isPasswordOpen}
          label={t('common.labels.password')}
          onOpen={openPassword}
          value={maskedPassword}
        >
          <PasswordUpdateForm email={email} onClose={closePassword} />
        </SecurityRow>
      </div>
    </FormCard>
  )
}

export default SecuritySection
