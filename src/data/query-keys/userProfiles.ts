const userProfilesKeys = {
  all: ['userProfiles'] as const,
  current: () => [...userProfilesKeys.all, 'current'] as const,
  name: (id: string) => [...userProfilesKeys.all, 'name', id] as const,
  team: () => [...userProfilesKeys.all, 'team'] as const,
}

export default userProfilesKeys
