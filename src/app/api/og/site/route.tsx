import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getTranslations } from 'next-intl/server'

import BrandCard from '../BrandCard'
import { brandImageHeaders, imageSize, loadFonts, loadLogo, toImageLocale } from '../helpers'

import { isKnownRegion } from '@/lib/regionRouting'
import { siteName } from '@/lib/seo/getPageMetadata'

// The site's link preview, or a region's: /api/og/site?locale=ka(&region=gudauri)
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const locale = toImageLocale(searchParams.get('locale'))
  const region = searchParams.get('region')
  const t = await getTranslations({ locale })
  const isRegion = region !== null && isKnownRegion(region)

  return new ImageResponse(
    (
      <BrandCard
        brandName={isRegion ? siteName : undefined}
        logoUri={loadLogo()}
        subtitle={t(isRegion ? 'seo.images.regionSubtitle' : 'seo.images.siteSubtitle')}
        title={isRegion ? t(`regions.names.${region}`) : siteName}
      />
    ),
    { ...imageSize, fonts: loadFonts(), headers: brandImageHeaders },
  )
}
