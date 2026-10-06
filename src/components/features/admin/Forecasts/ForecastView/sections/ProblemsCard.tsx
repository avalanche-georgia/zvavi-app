import { type ProblemValues, ProblemViewCard } from '@components/features/forecasts/Problems'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import CardCount from './CardCount'

const ProblemsCard = ({ problems }: { problems: ProblemValues[] }) => {
  const t = useTranslations()

  return (
    <FormCard
      title={t('admin.forecast.editor.problems.title')}
      titleTag={<CardCount count={problems.length} />}
    >
      {problems.length === 0 ? (
        <p className="text-copy text-placeholder italic">{t('admin.forecasts.view.noProblems')}</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {problems.map((problem, index) => (
            <li key={problem.id ?? index}>
              <ProblemViewCard number={index + 1} problem={problem} />
            </li>
          ))}
        </ol>
      )}
    </FormCard>
  )
}

export default ProblemsCard
