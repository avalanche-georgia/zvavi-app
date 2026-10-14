import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// In display order
const skills = ['forecasting', 'development', 'outreach', 'translation'] as const

// The dark "Join us" block: ways to contribute, Donate and How to help
const JoinBlock = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card bg-ink flex flex-col items-start gap-3 p-5 text-white md:p-7">
      <p className="text-caption tracking-eyebrow font-semibold text-white/60 uppercase">
        {t('home.join.eyebrow')}
      </p>
      <h2 className="text-title-sm font-bold">{t('home.join.title')}</h2>
      <p className="max-w-[46ch] leading-[1.55] text-pretty text-white/80">
        {t('home.join.message')}
      </p>
      <ul aria-label={t('home.join.skillsLabel')} className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li
            key={skill}
            className="text-caption rounded-full bg-white/10 px-2.5 py-1.25 text-white/90"
          >
            {t(`home.join.skills.${skill}`)}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <Link className={getButtonClasses()} href={routes.about.donate}>
          {t('home.join.donate')}
        </Link>
        <Link className={getButtonClasses({ variant: 'inverse' })} href={routes.about.joinUs}>
          {t('home.join.howToHelp')}
        </Link>
      </div>
    </div>
  )
}

export default JoinBlock
