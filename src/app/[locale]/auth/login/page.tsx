'use client'

import { useCallback, useState } from 'react'
import { Field, Fieldset, Label, Legend } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { handleSupabaseError } from '@/data/helpers'
import { routes } from '@/UI/header/NavMenu/constants'
import { useToast } from '@/UI/hooks'

import { Button, TextInput } from '@/UI/components/inputs'

import { supabase } from '@/data'

// TODO: Add placeholders
// TODO: Human-clear error messages by code
const LoginPage = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleSignIn = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!email || !password) return

      setIsPending(true)

      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        setPassword('')
        handleSupabaseError(error)
        router.push(routes.admin)
      } catch (error) {
        toastError('LoginPage | handleSignIn', { error })
      } finally {
        setIsPending(false)
      }
    },
    [email, password, router, toastError],
  )

  const handleEmailChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmail(target.value),
    [setEmail],
  )

  const handlePasswordChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value),
    [setPassword],
  )

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form className="w-full max-w-sm px-4" onSubmit={handleSignIn}>
        <Fieldset className="space-y-6 rounded p-6 dark:text-white sm:p-10">
          <Legend className="text-center text-2xl font-semibold ">{t('auth.login.title')}</Legend>

          <Field>
            <Label className="text-sm/6">{t('common.labels.email')}</Label>
            <TextInput className="w-full" onChange={handleEmailChange} required type="email" />
          </Field>

          <Field>
            <Label className="flex justify-between text-sm/6">
              {t('auth.labels.password')}
              <Link
                className="self-center text-xs text-primary hover:underline"
                href={routes.forgotPassword}
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </Label>

            <TextInput
              className="w-full"
              onChange={handlePasswordChange}
              required
              type="password"
            />
          </Field>

          {/* TODO: Add loader */}
          <Button className="w-full text-center" disabled={isPending} type="submit">
            <span className="w-full">{t('auth.login.signIn')}</span>
          </Button>
        </Fieldset>
      </form>
    </div>
  )
}

export default LoginPage
