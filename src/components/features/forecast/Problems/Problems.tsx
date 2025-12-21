import type { Problem as ProblemType } from '@domain/types'
import { useTranslations } from 'next-intl'

import Problem from './Problem'

const Problems = ({ problems }: { problems: ProblemType[] }) => {
  const t = useTranslations()

  return (
    <section className="border-b py-4">
      <h2 className="mb-2 text-2xl font-semibold">{t('admin.forecast.form.problems.title')}</h2>
      <ul className="space-y-3">
        {problems.map((problem) => (
          <li key={problem.type}>
            <Problem problem={problem} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Problems
