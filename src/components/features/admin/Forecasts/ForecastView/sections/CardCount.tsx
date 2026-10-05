import { useTranslations } from 'next-intl'

type CardCountProps = {
  count: number
  pendingCount?: number
}

// Muted item count for a card title; flags linked records still under review
const CardCount = ({ count, pendingCount = 0 }: CardCountProps) => {
  const t = useTranslations()

  if (count === 0) return null

  return (
    <>
      <span className="text-muted text-copy-sm font-medium">{count}</span>
      {pendingCount > 0 && (
        <span className="text-warning text-copy-sm font-medium">
          {' · '}
          {t('admin.forecasts.view.pendingCount', { count: pendingCount })}
        </span>
      )}
    </>
  )
}

export default CardCount
