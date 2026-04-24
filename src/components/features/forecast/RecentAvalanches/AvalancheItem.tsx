import MarkdownContent from '@components/shared/MarkdownContent'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheAspects from './AvalancheAspects'
import AvalancheHero from './AvalancheHero'

const AvalancheItem = ({ avalanche }: { avalanche: Avalanche }) => {
  const t = useTranslations()
  const { aspects, description, trigger } = avalanche

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
      <AvalancheHero avalanche={avalanche} />

      <div className="flex items-start gap-3 sm:gap-4">
        <AvalancheAspects aspects={aspects} trigger={trigger} />

        {trigger && (
          <div>
            <p className="text-[10px] tracking-wider text-gray-400 uppercase">
              {t('forecast.sections.recentAvalanches.labels.trigger')}
            </p>
            <p className="text-base font-semibold">{t(`common.avalancheTriggers.${trigger}`)}</p>
          </div>
        )}
      </div>

      {description && (
        <div className="border-t border-dashed border-gray-200 pt-3 text-sm text-gray-600">
          <MarkdownContent content={description} />
        </div>
      )}
    </div>
  )
}

export default AvalancheItem
