'use client'

import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import Column from './Column'
import MemberItem from './MemberItem'

type MembersListProps = {
  members: Member[]
}

const MembersList = ({ members }: MembersListProps) => {
  const t = useTranslations()

  return (
    <div className="w-full rounded-sm border bg-white p-4 shadow-sm">
      <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
        <Column className="w-56 font-semibold">{t('admin.members.list.columns.name')}</Column>
        <Column className="font-semibold">{t('admin.members.list.columns.memberId')}</Column>
        <Column className="font-semibold">{t('admin.members.list.columns.status')}</Column>
        <Column className="font-semibold">{t('admin.members.list.columns.joinedAt')}</Column>
        <Column className="font-semibold">{t('admin.members.list.columns.expiresAt')}</Column>
        <Column className="flex-1 pr-4 text-right font-semibold">
          {t('admin.members.list.columns.actions')}
        </Column>
      </div>

      {members.length === 0 ? (
        <div className="py-8 text-center text-gray-500">{t('admin.members.list.noMembers')}</div>
      ) : (
        <ul className="flex flex-col">
          {members.map((member) => (
            <li key={member.id} className="border-b last:border-0">
              <MemberItem member={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MembersList
