import { HazardLevelBanner } from '@components/shared'
import type { Forecast } from '@domain/types'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const CurrentForecast = ({ forecast }: { forecast: Forecast }) => {
  const t = useTranslations()

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={forecast.id}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-3"
        exit={{ opacity: 0, scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <Link href={routes.forecasts.current}>
          <HazardLevelBanner forecast={forecast} />
        </Link>
        <p className="text-center text-sm text-gray-500">{t('forecast.previewNote')}</p>
      </motion.section>
    </AnimatePresence>
  )
}

export default CurrentForecast
