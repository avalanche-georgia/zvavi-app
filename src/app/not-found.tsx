import avalancheGIF from '@assets/images/avalanche.gif'
import { PageWrapper } from '@components/layout'
import { ButtonLink } from '@components/shared'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { routes } from '@/routes'

const NotFound = async () => {
  const t = await getTranslations()

  return (
    <PageWrapper>
      <div className="flex max-w-full flex-col items-center justify-center gap-6 py-6 text-center lg:py-20">
        <div className="relative">
          <p className="absolute size-full pt-2 text-7xl opacity-15 lg:pt-3 lg:text-8xl">404</p>

          <Image
            alt="404 Not Found"
            className="rounded-lg"
            height={270}
            src={avalancheGIF}
            width={480}
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">{t('common.notFound.title')}</h1>
        <p className="max-w-lg whitespace-pre-line text-gray-600">{t('common.notFound.message')}</p>

        <ButtonLink href={routes.forecasts.current}>{t('common.notFound.linkText')}</ButtonLink>
      </div>
    </PageWrapper>
  )
}

export default NotFound
