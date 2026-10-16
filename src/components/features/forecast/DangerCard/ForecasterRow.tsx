'use client'

import { useState } from 'react'
import { TeamMemberPhoto, TeamMemberSheet } from '@components/features/team'
import type { TeamMember } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type ForecasterRowProps = {
  name: string
  // Their public Team profile: the row opens it. null: just the name.
  profile: TeamMember | null
}

const personClasses = 'mt-1.5 flex w-full items-center gap-2.5'

// Full-width fact: avatar + the forecaster's name
const ForecasterRow = ({ name, profile }: ForecasterRowProps) => {
  const t = useTranslations()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const person = (
    <>
      <TeamMemberPhoto
        avatarUrl={profile?.avatarUrl ?? null}
        className="size-8 rounded-full"
        initialsClassName="text-xs"
        name={name}
      />
      <span className="text-copy text-ink min-w-0 font-semibold wrap-anywhere">{name}</span>
    </>
  )

  return (
    <div className="bg-surface col-span-full px-4 py-2.5">
      <dt className="text-muted text-xs">{t('common.labels.forecaster')}</dt>
      <dd>
        {profile ? (
          <button
            aria-haspopup="dialog"
            aria-label={t('forecast.forecasterProfile', { name })}
            className={cn(personClasses, 'focus-ring group rounded-control text-left')}
            onClick={() => setIsSheetOpen(true)}
            type="button"
          >
            {person}
            <ChevronRight
              aria-hidden
              className="text-muted group-hover:text-ink ml-auto size-4.5 shrink-0 transition-colors"
            />
          </button>
        ) : (
          <div className={personClasses}>{person}</div>
        )}
      </dd>
      <TeamMemberSheet isOpen={isSheetOpen} member={profile} onOpenChange={setIsSheetOpen} />
    </div>
  )
}

export default ForecasterRow
