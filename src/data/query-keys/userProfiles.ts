const userProfilesKeys = {
  all: ['userProfiles'] as const,
  current: () => [...userProfilesKeys.all, 'current'] as const,
  item: (id: string) => [...userProfilesKeys.all, 'item', id] as const,
}

export default userProfilesKeys
