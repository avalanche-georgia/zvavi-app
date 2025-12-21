import { links } from '@components/constants'
import { HTMLContainer } from '@components/shared'
import { useTranslations } from 'next-intl'

const EducateSection = () => {
  const t = useTranslations()

  return (
    <section className="space-y-3">
      <h3 className="text-xl font-semibold">{t('joinUs.page.educate.title')}</h3>
      <div>
        <p className="text-justify">{t('joinUs.page.educate.descriptionPre')}</p>
        <ul className="mt-2 list-disc pl-4">
          <li>{t('joinUs.page.educate.options.share')}</li>
          <HTMLContainer
            component="li"
            content={t.rich('joinUs.page.educate.options.courses', {
              a: (chunks) =>
                `<a class="text-primary underline" href="${links.courseForm}" rel="noreferrer" target="_blank">${chunks}</a>`,
            })}
          />

          <li>{t('joinUs.page.educate.options.events')}</li>
        </ul>
      </div>
      <p className="text-justify">{t('joinUs.page.educate.descriptionPost')}</p>
    </section>
  )
}

export default EducateSection
