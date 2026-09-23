'use client'

import { links } from '@components/constants'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { Drawer } from '@components/ui'
import { useTranslations } from 'next-intl'

const AvalancheDetailsInfo = () => {
  const t = useTranslations()

  return (
    <Drawer
      content={
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            {t('observations.submit.avalancheDetailsInfo.description')}
          </p>
          <ButtonLink
            className="ml-auto"
            href={links.avalancheEncyclopedia}
            isExternal
            rel="noreferrer"
            target="_blank"
          >
            {t('observations.submit.avalancheDetailsInfo.linkLabel')}
          </ButtonLink>
        </div>
      }
      title={t('observations.submit.avalancheDetailsInfo.title')}
    >
      <button className="cursor-pointer text-gray-400 hover:text-gray-600" type="button">
        <Icon icon="info" size="sm" />
      </button>
    </Drawer>
  )
}

export default AvalancheDetailsInfo
