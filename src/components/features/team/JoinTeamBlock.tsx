import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Dark call to action under the team: ways to contribute, or get in touch
const JoinTeamBlock = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card bg-ink mt-2 grid gap-5 p-5.5 text-white md:grid-cols-[1fr_auto] md:items-center md:p-7">
      <div className="flex flex-col gap-2">
        <p className="text-caption tracking-eyebrow font-semibold text-white/60 uppercase">
          {t('team.join.eyebrow')}
        </p>
        <h2 className="text-title-sm font-bold">{t('team.join.title')}</h2>
        <p className="text-copy-lg text-pretty text-white/80">{t('team.join.message')}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link className={getButtonClasses()} href={routes.about.joinUs}>
          {t('team.join.howToHelp')}
        </Link>
        <Link className={getButtonClasses({ variant: 'inverse' })} href={routes.about.contact}>
          {t('navigation.contact')}
        </Link>
      </div>
    </div>
  )
}

export default JoinTeamBlock
