import { links } from '@components/constants'
import { HTMLContainer } from '@components/shared'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const FinancialSection = () => {
  const t = useTranslations()

  return (
    <section className="space-y-3">
      <h3 className="text-xl font-semibold">{t('joinUs.page.financialSupport.title')}</h3>
      <div>
        <p className="text-justify">{t('joinUs.page.financialSupport.description')}</p>
        <ul className="mt-2 list-disc pl-4">
          <HTMLContainer
            component="li"
            content={t.rich('joinUs.page.financialSupport.options.patreon', {
              a: (chunks) =>
                `<a class="text-primary underline" href="${links.patreon}" rel="noreferrer" target="_blank">${chunks}</a>`,
            })}
          />
          <HTMLContainer
            component="li"
            content={t.rich('joinUs.page.financialSupport.options.wise', {
              a: (chunks) =>
                `<a class="text-primary underline" href="${links.wise}" rel="noreferrer" target="_blank">${chunks}</a>`,
            })}
          />
          <li>
            <span>{t('joinUs.page.financialSupport.options.bank')}</span>
            <Link className="text-primary underline" href={routes.contact}>
              {t('common.actions.seeContactPage')}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default FinancialSection
