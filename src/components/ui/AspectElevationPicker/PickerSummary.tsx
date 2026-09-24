import { useAspectSummary } from '@components/hooks'
import type { Aspects } from '@domain/types'
import { useTranslations } from 'next-intl'

type PickerSummaryProps = {
  onClear: VoidFunction
  value: Aspects
}

// Human-readable selection, one line per group of zones with identical aspects
const PickerSummary = ({ onClear, value }: PickerSummaryProps) => {
  const t = useTranslations()
  const { getLines } = useAspectSummary()
  const lines = getLines(value)

  return (
    <div className="border-rule flex items-start justify-between gap-3 border-t pt-2.5 text-[13px] leading-normal">
      <div aria-live="polite" className="text-body min-w-0 flex-1">
        {lines.length === 0 ? (
          <span className="text-muted">{t('common.aspectElevationPicker.emptyHint')}</span>
        ) : (
          lines.map(({ runs, zonesLabel }) => (
            <div key={zonesLabel}>
              <span className="text-ink font-semibold">{zonesLabel}</span> · {runs}
            </div>
          ))
        )}
      </div>
      <button
        className="text-accent hover:text-accent-hover focus-visible:outline-accent shrink-0 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-[#b8b8bd]"
        disabled={lines.length === 0}
        onClick={onClear}
        type="button"
      >
        {t('common.actions.clear')}
      </button>
    </div>
  )
}

export default PickerSummary
