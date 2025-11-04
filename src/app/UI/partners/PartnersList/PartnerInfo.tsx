import { useTranslations } from 'next-intl'

import type { Partner } from '@/data/constants/partners'

import { ButtonLink } from '@/UI/components'

const PartnerInfo = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()

  const { infoKey, url } = partner

  return (
    <div className="flex flex-col gap-4">
      {infoKey && <p className="text-justify">{t(infoKey)}</p>}
      <ButtonLink className="ml-auto" href={url} isExternal rel="noreferrer" target="_blank">
        {t('common.actions.visitWebsite')}
      </ButtonLink>
    </div>
  )
}

export default PartnerInfo
