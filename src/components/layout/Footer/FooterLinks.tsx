'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

import FooterColumn, { type FooterLink } from './FooterColumn'

import { routes } from '@/routes'

// The active region's pages, as in the header · Resources ("All regions" first while
// there is a choice) · Organisation
const FooterLinks = () => {
  const t = useTranslations()
  const { region, regions } = useRegionContext()
  const regionId = region?.id
  const forecastRoutes = regionId ? routes.forecastsByRegion(regionId) : null
  const observationRoutes = regionId ? routes.observationsByRegion(regionId) : null

  const allRegionsLinks: FooterLink[] =
    regions.length > 1 ? [{ href: routes.regions, label: t('navigation.allRegions') }] : []
  const forecastLinks: FooterLink[] =
    regionId && forecastRoutes && observationRoutes
      ? [
          { href: routes.regionHome(regionId), label: t('navigation.overview') },
          { href: forecastRoutes.current, label: t('navigation.currentForecast') },
          { href: forecastRoutes.forecastArea, label: t('navigation.forecastArea') },
          { href: forecastRoutes.history, label: t('navigation.archive') },
          { href: observationRoutes.root, label: t('navigation.observations') },
        ]
      : []

  const resourceLinks: FooterLink[] = [
    ...allRegionsLinks,
    ...(observationRoutes
      ? [{ href: observationRoutes.submit, label: t('navigation.submitObservation') }]
      : []),
    { href: routes.weatherStations, label: t('navigation.weatherStations') },
  ]

  return (
    <>
      {regionId && <FooterColumn links={forecastLinks} title={t(`regions.names.${regionId}`)} />}
      <FooterColumn links={resourceLinks} title={t('footer.columns.resources')} />
      <FooterColumn
        links={[
          { href: routes.about.aboutUs, label: t('navigation.aboutUs') },
          { href: routes.about.team, label: t('navigation.team') },
          { href: routes.partners, label: t('navigation.partners') },
          { href: routes.about.joinUs, label: t('navigation.joinUs') },
          { href: routes.about.donate, label: t('navigation.donate') },
          { href: routes.about.contact, label: t('navigation.contact') },
        ]}
        title={t('footer.columns.organisation')}
      />
    </>
  )
}

export default FooterLinks
