import useMembersQuery from './useMembersQuery'

const usePendingMembersCount = () => {
  const { data: members } = useMembersQuery()

  return members?.filter((member) => member.status === 'pending').length ?? 0
}

export default usePendingMembersCount
