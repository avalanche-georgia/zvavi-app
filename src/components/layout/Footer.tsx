import { ContactLinkList } from '@components/features/contact'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className="mt-8 flex w-full flex-col items-center gap-2 border-t py-4">
      <ContactLinkList />
      <div className="mt-3 flex gap-4 text-xs">
        <Link
          className="text-gray-500 transition-colors hover:text-gray-700 hover:underline"
          href={routes.privacy}
        >
          {t('legal.privacy.title')}
        </Link>
        <Link
          className="text-gray-500 transition-colors hover:text-gray-700 hover:underline"
          href={routes.terms}
        >
          {t('legal.terms.title')}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
