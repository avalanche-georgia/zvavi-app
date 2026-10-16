'use client'

import { useSignOut } from '@components/hooks'
import { Button } from '@ds/primitives'
import { ShieldX } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Shown instead of the admin shell to a signed-in account that isn't staff.
// UI layer only: RLS and the API routes are the real guard.
const NoAccess = () => {
  const t = useTranslations()
  const { signOut } = useSignOut()

  return (
    <main className="bg-canvas flex min-h-svh items-center justify-center px-4 py-10">
      <div className="rounded-card border-rule bg-surface flex max-w-md flex-col items-center gap-3 border px-6 py-10 text-center">
        <span className="bg-tile text-muted mb-1 flex size-16 items-center justify-center rounded-full">
          <ShieldX aria-hidden className="size-8" />
        </span>
        <h1 className="text-title text-ink font-bold">{t('admin.noAccess.title')}</h1>
        <p className="text-copy text-body text-pretty">{t('admin.noAccess.description')}</p>
        <Button className="mt-3" onClick={() => void signOut()} variant="secondary">
          {t('auth.logout.button')}
        </Button>
      </div>
    </main>
  )
}

export default NoAccess
