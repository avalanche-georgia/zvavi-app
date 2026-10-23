import avalancheGIF from '@assets/images/avalanche.gif'
import { PageWrapper } from '@components/layout'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import { regionLocalStorageKey } from '@domain/constants'
// The Button module directly, not the barrel: this is a server component
import { getButtonClasses } from '@ds/primitives/Button'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = async () => {
  const t = await getTranslations()
  const [cookieStore, regions] = await Promise.all([cookies(), fetchActiveRegions()])
  const cookieRegionId = cookieStore.get(regionLocalStorageKey)?.value
  // The remembered region if still active, else the only one — never a redirecting URL
  const region =
    regions.find(({ id }) => id === cookieRegionId) ?? (regions.length === 1 ? regions[0] : null)
  const href = region ? routes.regionHome(region.id) : routes.regions

  return (
    <PageWrapper>
      <div className="flex max-w-full flex-col items-center justify-center gap-6 py-6 text-center lg:py-20">
        {/* The 404 is a decorative watermark over the picture, far above the type scale */}
        <div className="relative">
          <p className="absolute size-full pt-2 text-7xl opacity-15 lg:pt-3 lg:text-8xl">404</p>

          <Image
            alt="404 Not Found"
            className="rounded-media"
            height={270}
            src={avalancheGIF}
            width={480}
          />
        </div>

        <h1 className="text-title text-ink font-semibold">{t('common.notFound.title')}</h1>
        <p className="text-body max-w-lg whitespace-pre-line">{t('common.notFound.message')}</p>

        <Link className={getButtonClasses()} href={href}>
          {t('common.notFound.linkText')}
        </Link>
      </div>
    </PageWrapper>
  )
}

export default NotFound
