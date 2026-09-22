const userProfilesKeys = {
  all: ['userProfiles'] as const,
  current: () => [...userProfilesKeys.all, 'current'] as const,
}

export default userProfilesKeys
