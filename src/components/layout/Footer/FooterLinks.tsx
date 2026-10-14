'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

import FooterColumn from './FooterColumn'

import { routes } from '@/routes'

// Forecasts · Resources · Organisation. Region pages open for the remembered
// region, else the first one.
const FooterLinks = () => {
  const t = useTranslations()
  const { region, regions } = useRegionContext()
  const defaultRegionId = region?.id ?? regions[0]?.id
  const regionLinks = defaultRegionId
    ? {
        archive: routes.forecastsByRegion(defaultRegionId).history,
        observations: routes.observationsByRegion(defaultRegionId),
      }
    : null

  const forecastLinks = regions.map(({ id }) => ({
    href: routes.forecastsByRegion(id).current,
    label: t(`regions.names.${id}`),
  }))

  return (
    <>
      <FooterColumn
        links={
          regionLinks
            ? [...forecastLinks, { href: regionLinks.archive, label: t('footer.links.archive') }]
            : forecastLinks
        }
        title={t('footer.columns.forecasts')}
      />
      <FooterColumn
        links={[
          ...(regionLinks
            ? [
                { href: regionLinks.observations.root, label: t('navigation.observations') },
                {
                  href: regionLinks.observations.submit,
                  label: t('footer.links.submitObservation'),
                },
              ]
            : []),
          { href: routes.weatherStations, label: t('navigation.weatherStations') },
        ]}
        title={t('footer.columns.resources')}
      />
      <FooterColumn
        links={[
          { href: routes.about.aboutUs, label: t('navigation.aboutUs') },
          { href: routes.partners, label: t('navigation.partners') },
          { href: routes.about.joinUs, label: t('navigation.joinUs') },
          { href: routes.about.donate, label: t('footer.links.donate') },
          { href: routes.about.contact, label: t('navigation.contact') },
        ]}
        title={t('footer.columns.organisation')}
      />
    </>
  )
}

export default FooterLinks
