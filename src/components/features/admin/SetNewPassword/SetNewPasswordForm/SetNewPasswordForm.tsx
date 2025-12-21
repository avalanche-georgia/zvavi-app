'use client'

import { Button, TextInput } from '@components/ui'
import { Field, Fieldset, Label, Legend } from '@headlessui/react'
import { useTranslations } from 'next-intl'

import useSetNewPassword from './useSetNewPassword'

const SetNewPasswordPageForm = () => {
  const t = useTranslations()
  const {
    errorMessage,
    handleNewPasswordSubmit,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleValidatePasswords,
    isPending,
  } = useSetNewPassword()

  return (
    <form
      className="mx-auto flex max-w-sm flex-col items-center justify-center px-4"
      onSubmit={handleNewPasswordSubmit}
    >
      <Fieldset className="space-y-6 rounded p-6 dark:text-white sm:p-10">
        <Legend className="text-center text-2xl font-semibold">
          {t('auth.setNewPassword.title')}
        </Legend>

        <Field>
          <Label className="text-sm/6">{t('auth.labels.password')}</Label>
          <TextInput
            className="w-full"
            onBlur={handleValidatePasswords}
            onChange={handlePasswordChange}
            required
            type="password"
          />
        </Field>

        <Field>
          <Label className="text-sm/6">{t('auth.labels.confirmPassword')}</Label>
          <TextInput
            className="w-full"
            onBlur={handleValidatePasswords}
            onChange={handlePasswordConfirmChange}
            required
            type="password"
          />
          {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
        </Field>

        <Button className="w-full text-center" disabled={isPending} type="submit">
          <span className="w-full">{t('common.actions.save')}</span>
        </Button>
      </Fieldset>
    </form>
  )
}

export default SetNewPasswordPageForm
