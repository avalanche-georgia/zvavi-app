import { useTranslations } from 'next-intl'

import StationsList from './StationsList'

const PageContent = () => {
  const t = useTranslations()

  return (
    <>
      <p className="mb-4">{t('weatherStations.description')}</p>
      <StationsList />
    </>
  )
}

export default PageContent
