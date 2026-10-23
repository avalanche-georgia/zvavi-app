import { AdminShell } from '@components/layout/admin'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

// The root layout gives client components the public messages only; the admin area
// gets the full set
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AdminShell>{children}</AdminShell>
    </NextIntlClientProvider>
  )
}

export default AdminLayout
