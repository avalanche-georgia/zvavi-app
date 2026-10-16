import { LoginForm } from '@components/features/auth'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

// Team-only sign-in: keep it out of search results (robots.ts also disallows /auth/)
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    robots: { follow: false, index: false },
    title: t('auth.login.title'),
  }
}

const LoginPage = () => <LoginForm />

export default LoginPage
