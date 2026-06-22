'use client'

import { createColumnHelper } from '@components/ui'
import { dateFormat } from '@domain/constants'
import type { Member } from '@domain/types'
import { format, isAfter, parseISO, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'
import { cn } from 'src/lib/utils'

import MemberActionsCell from './MemberActionsCell'
import StatusBadge from './StatusBadge'

import { routes } from '@/routes'

const columnHelper = createColumnHelper<Member>()

export const useMemberColumns = () => {
  const t = useTranslations()

  return [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      cell: ({ row }) => (
        <Link
          className="hover:text-primary transition-colors hover:underline"
          href={routes.admin.members.view(row.original.id)}
        >
          {row.original.firstName} {row.original.lastName}
        </Link>
      ),
      header: t('admin.members.list.columns.name'),
      id: 'name',
      meta: { className: 'w-56 shrink-0' },
    }),
    columnHelper.accessor('memberId', {
      header: t('admin.members.list.columns.memberId'),
      meta: { className: 'w-44 shrink-0' },
    }),
    columnHelper.accessor('status', {
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      header: t('admin.members.list.columns.status'),
      meta: { className: 'w-28 shrink-0' },
    }),
    columnHelper.accessor('joinedAt', {
      cell: ({ getValue }) => format(getValue(), dateFormat),
      header: t('admin.members.list.columns.joinedAt'),
      meta: { className: 'w-32 shrink-0' },
    }),
    columnHelper.accessor('expiresAt', {
      cell: ({ getValue }) => {
        const value = getValue()
        const isExpired = value && isAfter(startOfDay(new Date()), startOfDay(parseISO(value)))

        return (
          <span className={cn(isExpired && 'font-medium text-red-600')}>
            {value ? format(value, dateFormat) : '-'}
          </span>
        )
      },
      header: t('admin.members.list.columns.expiresAt'),
      meta: { className: 'w-28 shrink-0 flex-1' },
    }),
    columnHelper.display({
      cell: ({ row }) => <MemberActionsCell member={row.original} />,
      header: t('admin.members.list.columns.actions'),
      id: 'actions',
    }),
  ]
}
