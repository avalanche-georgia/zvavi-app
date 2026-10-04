'use client'

import { AspectMiniGrid } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import { Icon } from '@components/icons'
import { IconButton } from '@ds/primitives'
import { Pencil, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import ProblemFacts from './ProblemFacts'
import ProblemNumber from './ProblemNumber'
import type { ProblemValues } from './problemSchema'

type ProblemCardProps = {
  // Drag grip — attached by the sortable list; null while dragging is off
  dragHandleRef: ((element: Element | null) => void) | null
  // Saved without aspects (allowed before they were required): blocks saving
  hasAspectsError: boolean
  number: number
  onDelete: VoidFunction
  onEdit: VoidFunction
  problem: ProblemValues
}

const ProblemCard = ({
  dragHandleRef,
  hasAspectsError,
  number,
  onDelete,
  onEdit,
  problem,
}: ProblemCardProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { aspects, avalancheSize, description, type } = problem

  return (
    <div className="border-rule hover:border-rule-strong @container flex flex-col gap-2 rounded-[14px] border px-3.5 pt-3 pb-3.5 transition-colors">
      <div className="flex items-center gap-2.5">
        <button
          ref={dragHandleRef}
          aria-label={t('admin.forecast.editor.problems.reorder')}
          className="text-muted cursor-grab touch-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!dragHandleRef}
          type="button"
        >
          <Icon icon="grip" size="sm" />
        </button>
        <ProblemNumber number={number} />
        {/* Narrow cards: the size badge wraps below the type instead of squeezing it */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="text-ink text-base font-semibold">{t(`common.avalancheTypes.${type}`)}</h3>
          <span className="bg-tile text-ink rounded-badge px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap">
            {t('admin.forecast.editor.problems.size', { size: avalancheSize })}
          </span>
        </div>
        <div className="ml-auto flex gap-1">
          <IconButton aria-label={t('common.actions.edit')} onClick={onEdit}>
            <Pencil className="size-4" />
          </IconButton>
          <IconButton aria-label={t('common.actions.delete')} onClick={onDelete} tone="danger">
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col gap-3 pl-14.5 @max-[480px]:pl-0">
        <div className="flex gap-6 @max-[700px]:flex-col">
          <div className="flex-1">
            <ProblemFacts problem={problem} />
          </div>
          <div className="flex max-w-60 flex-col gap-1.5">
            <AspectMiniGrid aspects={aspects} />
            {hasAspectsError ? (
              <p className="text-caption text-danger" data-field-error>
                {t('admin.forecast.editor.problems.errors.aspects')}
              </p>
            ) : (
              <p className="text-caption text-body">
                {getSummary(aspects) ?? t('admin.forecast.editor.problems.noAspects')}
              </p>
            )}
          </div>
        </div>
        {description && <p className="text-copy-sm text-body whitespace-pre-line">{description}</p>}
      </div>
    </div>
  )
}

export default ProblemCard
