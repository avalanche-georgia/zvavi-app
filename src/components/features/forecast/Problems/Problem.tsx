import { problemIcons } from '@components/constants'
import { Drawer, Icon } from '@components/shared'
import type { Problem as ProblemType } from '@domain/types'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { ProblemDetails } from './ProblemDetails'

const Problem = ({ problem }: { problem: ProblemType }) => {
  const t = useTranslations()
  const icon = problemIcons[problem.type]

  return (
    <Drawer
      content={<ProblemDetails problem={problem} />}
      title={t(`admin.forecast.form.problems.options.problemType.${problem.type}`)}
    >
      <button
        className="flex w-full items-center justify-between gap-2 rounded-2xl bg-gray-100 p-3 shadow-md"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="size-12">
            {icon && (
              <Image
                alt="Avalanche problem"
                className="rounded-xl"
                height={48}
                src={icon}
                width={48}
              />
            )}
          </div>
          <h3 className="font-semibold">
            {t(`admin.forecast.form.problems.options.problemType.${problem.type}`)}
          </h3>
        </div>

        <Icon icon="chevronRight" />
      </button>
    </Drawer>
  )
}

export default Problem
